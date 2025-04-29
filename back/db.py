from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
import json

db = SQLAlchemy()

class User(db.Model, UserMixin):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    is_active = db.Column(db.Boolean, default=True)
    surname = db.Column(db.String(80))
    bio = db.Column(db.Text)
    address = db.Column(db.String(255))
    avatar_url = db.Column(db.String(255))
    phone = db.Column(db.String(20))
    city = db.Column(db.String(100))
    postal_code = db.Column(db.String(10))
    role = db.Column(db.String(20), default='user')  # Новое поле role
    
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
        
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
    
    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'surname': self.surname,
            'bio': self.bio,
            'address': self.address,
            'avatar_url': self.avatar_url,
            'phone': self.phone,
            'city': self.city,
            'postal_code': self.postal_code,
            'created_at': self.created_at.isoformat(),
            'is_active': self.is_active,
            'role': self.role  # Добавляем role в ответ
        }

class Order(db.Model):
    __tablename__ = 'orders'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    order_date = db.Column(db.DateTime, default=datetime.utcnow)
    total_amount = db.Column(db.Float, nullable=False)
    payment_method = db.Column(db.String(50), nullable=False)
    status = db.Column(db.String(50), nullable=False)
    items = db.Column(db.Text)
    
    user = db.relationship('User', backref=db.backref('orders', lazy=True))
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'order_date': self.order_date.isoformat(),
            'total_amount': self.total_amount,
            'payment_method': self.payment_method,
            'status': self.status,
            'items': json.loads(self.items) if self.items else []
        }