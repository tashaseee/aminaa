from flask import Flask, request, jsonify, session
from flask_cors import CORS
from flask_login import LoginManager, login_user, logout_user, login_required, current_user
from werkzeug.security import generate_password_hash
import os
from datetime import timedelta, datetime
from db import db, User, Order
import json
from sqlalchemy import inspect

app = Flask(__name__)

# Настройка CORS
CORS(app, supports_credentials=True, origins=["http://localhost:5181"])

# Конфигурация Flask
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:112233@localhost:5432/icecream'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = os.urandom(24)
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(days=7)
app.config['WTF_CSRF_ENABLED'] = False
app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'  # Изменено с 'None' на 'Lax' для локальной разработки
app.config['SESSION_COOKIE_HTTPONLY'] = True
app.config['SESSION_COOKIE_SECURE'] = False  # False для localhost (без HTTPS)
app.config['SESSION_COOKIE_DOMAIN'] = None

# Инициализация базы данных и Flask-Login
db.init_app(app)
login_manager = LoginManager()
alliance = LoginManager()
login_manager.init_app(app)

@login_manager.user_loader
def load_user(user_id):
    print(f"Loading user {user_id}")
    return User.query.get(int(user_id))

# Обработка OPTIONS-запросов для CORS
@app.before_request
def handle_options():
    if request.method == 'OPTIONS':
        response = jsonify({'status': 'ok'})
        response.headers.add('Access-Control-Allow-Origin', 'http://localhost:5181')
        response.headers.add('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        response.headers.add('Access-Control-Allow-Credentials', 'true')
        return response

# Инициализация таблиц в базе данных
with app.app_context():
    inspector = inspect(db.engine)
    if not inspector.has_table('users') or not inspector.has_table('orders'):
        db.create_all()
    if inspector.has_table('users'):
        columns = {col['name'] for col in inspector.get_columns('users')}
        if 'phone' not in columns:
            db.engine.execute('ALTER TABLE users ADD COLUMN phone VARCHAR(20)')
        if 'city' not in columns:
            db.engine.execute('ALTER TABLE users ADD COLUMN city VARCHAR(100)')
        if 'postal_code' not in columns:
            db.engine.execute('ALTER TABLE users ADD COLUMN postal_code VARCHAR(10)')
    if inspector.has_table('orders'):
        columns = {col['name'] for col in inspector.get_columns('orders')}
        if 'items' not in columns:
            db.engine.execute('ALTER TABLE orders ADD COLUMN items TEXT')

# Эндпоинт для регистрации
@app.route('/api/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        required_fields = ['username', 'email', 'password']
        optional_fields = ['surname', 'bio', 'address', 'phone', 'city', 'postal_code']
        
        print(f"Register attempt: {data}")
        if not all(key in data for key in required_fields):
            return jsonify({'error': 'Missing required fields'}), 400
        
        if User.query.filter_by(username=data['username']).first():
            return jsonify({'error': 'Username already exists'}), 409
        
        if User.query.filter_by(email=data['email']).first():
            return jsonify({'error': 'Email already exists'}), 409
        
        user = User(
            username=data['username'],
            email=data['email'],
            surname=data.get('surname', ''),
            bio=data.get('bio', ''),
            address=data.get('address', ''),
            phone=data.get('phone', ''),
            city=data.get('city', ''),
            postal_code=data.get('postal_code', '')
        )
        user.set_password(data['password'])
        
        db.session.add(user)
        db.session.commit()
        
        login_user(user)
        session.permanent = True
        print(f"User {user.username} registered and logged in, session: {session.get('_user_id')}")
        
        response = jsonify({
            'message': 'User registered successfully',
            'user': user.to_dict()
        })
        response.headers.add('Access-Control-Allow-Credentials', 'true')
        response.headers.add('Access-Control-Allow-Origin', 'http://localhost:5181')
        return response, 201
    except Exception as e:
        print(f"Error in registration: {str(e)}")
        return jsonify({'error': str(e)}), 500

# Эндпоинт для логина
@app.route('/api/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        print(f"Login attempt: {data}")
        
        if not all(key in data for key in ['username', 'password']):
            return jsonify({'error': 'Missing username or password'}), 400
        
        user = User.query.filter_by(username=data['username']).first()
        print(f"Found user: {user}")
        
        if not user or not user.check_password(data['password']):
            print("Invalid credentials")
            return jsonify({'error': 'Invalid username or password'}), 401
        
        if not user.is_active:
            return jsonify({'error': 'Account is disabled'}), 403
        
        login_user(user, remember=data.get('remember', False))
        session.permanent = True
        print(f"User {user.username} logged in, session: {session.get('_user_id')}")
        
        response = jsonify({
            'message': 'Login successful',
            'user': user.to_dict()
        })
        response.headers.add('Access-Control-Allow-Credentials', 'true')
        response.headers.add('Access-Control-Allow-Origin', 'http://localhost:5181')
        return response, 200
    except Exception as e:
        print(f"Error in login: {str(e)}")
        return jsonify({'error': str(e)}), 500

# Эндпоинт для выхода
@app.route('/api/logout', methods=['POST'])
@login_required
def logout():
    logout_user()
    session.clear()
    print("User logged out, session cleared")
    response = jsonify({'message': 'Logout successful'})
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:5181')
    return response, 200

# Эндпоинт для получения данных пользователя
@app.route('/api/user', methods=['GET'])
@login_required
def get_user():
    print(f"Accessing /api/user, current_user: {current_user.is_authenticated}, user_id: {current_user.id}, session: {session.get('_user_id')}")
    response = jsonify({
        'user': current_user.to_dict()
    })
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:5181')
    return response, 200

# Эндпоинт для обновления профиля
@app.route('/api/update-profile', methods=['POST'])
@login_required
def update_profile():
    try:
        data = request.get_json()
        fields = ['name', 'surname', 'email', 'phone', 'address', 'city', 'postal_code', 'bio']
        
        print(f"Updating profile: {data}")
        for field in fields:
            if field in data:
                setattr(current_user, field, data[field])
        
        db.session.commit()
        
        response = jsonify({
            'message': 'Profile updated successfully',
            'user': current_user.to_dict()
        })
        response.headers.add('Access-Control-Allow-Credentials', 'true')
        response.headers.add('Access-Control-Allow-Origin', 'http://localhost:5181')
        return response, 200
    except Exception as e:
        print(f"Error updating profile: {str(e)}")
        return jsonify({'error': str(e)}), 500

# Эндпоинт для загрузки аватара
@app.route('/api/upload-avatar', methods=['POST'])
@login_required
def upload_avatar():
    try:
        if 'avatar' not in request.files:
            return jsonify({'error': 'No avatar file provided'}), 400
        
        file = request.files['avatar']
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
            
        if file and allowed_file(file.filename):
            filename = f"avatar_{current_user.id}_{datetime.now().strftime('%Y%m%d%H%M%S')}.png"
            file_path = os.path.join('static/avatars', filename)
            os.makedirs(os.path.dirname(file_path), exist_ok=True)
            file.save(file_path)
            
            current_user.avatar_url = f"/static/avatars/{filename}"
            db.session.commit()
            
            response = jsonify({
                'message': 'Avatar uploaded successfully',
                'avatar_url': current_user.avatar_url
            })
            response.headers.add('Access-Control-Allow-Credentials', 'true')
            response.headers.add('Access-Control-Allow-Origin', 'http://localhost:5181')
            return response, 200
            
        return jsonify({'error': 'Invalid file type'}), 400
    except Exception as e:
        print(f"Error uploading avatar: {str(e)}")
        return jsonify({'error': str(e)}), 500

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in {'png', 'jpg', 'jpeg'}

# Эндпоинт для получения заказов
@app.route('/api/orders', methods=['GET'])
@login_required
def get_orders():
    try:
        orders = Order.query.filter_by(user_id=current_user.id).all()
        response = jsonify({
            'orders': [order.to_dict() for order in orders]
        })
        response.headers.add('Access-Control-Allow-Credentials', 'true')
        response.headers.add('Access-Control-Allow-Origin', 'http://localhost:5181')
        return response, 200
    except Exception as e:
        print(f"Error fetching orders: {str(e)}")
        return jsonify({'error': str(e)}), 500

# Эндпоинт для создания заказа
@app.route('/api/orders', methods=['POST'])
@login_required
def create_order():
    try:
        data = request.get_json()
        required_fields = ['total_amount', 'payment_method', 'status', 'items']
        
        print(f"Creating order: {data}")
        if not all(key in data for key in required_fields):
            return jsonify({'error': 'Missing required fields'}), 400
        
        order = Order(
            user_id=current_user.id,
            total_amount=data['total_amount'],
            payment_method=data['payment_method'],
            status=data['status'],
            items=json.dumps(data['items'])
        )
        
        db.session.add(order)
        db.session.commit()
        
        response = jsonify({
            'message': 'Order created successfully',
            'order': order.to_dict()
        })
        response.headers.add('Access-Control-Allow-Credentials', 'true')
        response.headers.add('Access-Control-Allow-Origin', 'http://localhost:5181')
        return response, 201
    except Exception as e:
        print(f"Error creating order: {str(e)}")
        return jsonify({'error': str(e)}), 500

# Обработка неавторизованных запросов
@login_manager.unauthorized_handler
def unauthorized():
    print(f"Unauthorized access attempted, session: {session.get('_user_id')}")
    response = jsonify({'error': 'Authentication required'})
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:5181')
    return response, 401

if __name__ == '__main__':
    app.run(debug=True, port=5000)