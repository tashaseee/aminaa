import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [avatar, setAvatar] = useState(null);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postal_code: '',
    bio: '',
  });
  const [errors, setErrors] = useState({});
  const [saveSuccess, setSaveSuccess] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
      return;
    }

    const userObj = JSON.parse(storedUser);
    setUser(userObj);

    setFormData({
      name: userObj.username || '',
      surname: userObj.surname || '',
      email: userObj.email || '',
      phone: userObj.phone || '',
      address: userObj.address || '',
      city: userObj.city || '',
      postal_code: userObj.postal_code || '',
      bio: userObj.bio || '',
    });
    setAvatar(userObj.avatar_url || '/assets/default-avatar.png');

    const fetchUserAndOrders = async () => {
      try {
        const userResponse = await fetch('/api/user', {
          method: 'GET',
          credentials: 'include',
        });

        if (!userResponse.ok) {
          throw new Error('Session invalid or expired');
        }

        const userData = await userResponse.json();
        setUser(userData.user);
        localStorage.setItem('user', JSON.stringify(userData.user));

        const ordersResponse = await fetch('/api/orders', {
          method: 'GET',
          credentials: 'include',
        });

        if (!ordersResponse.ok) {
          const errorData = await ordersResponse.json();
          throw new Error(errorData.error || `HTTP error! Status: ${ordersResponse.status}`);
        }

        const ordersData = await ordersResponse.json();
        setOrders(ordersData.orders || []);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Ошибка загрузки данных профиля или истории заказов');
        navigate('/login');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserAndOrders();
  }, [navigate]);

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setErrors({ ...errors, avatar: 'Размер файла не должен превышать 2 МБ' });
        return;
      }
      const formData = new FormData();
      formData.append('avatar', file);

      try {
        const response = await fetch('/api/upload-avatar', {
          method: 'POST',
          credentials: 'include',
          body: formData,
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || `HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setAvatar(data.avatar_url);

        const updatedUser = { ...user, avatar_url: data.avatar_url };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);

        setErrors({ ...errors, avatar: '' });
      } catch (err) {
        setErrors({ ...errors, avatar: err.message || 'Ошибка загрузки аватара' });
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
    setSaveSuccess(false);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Имя обязательно';
    if (!formData.surname) newErrors.surname = 'Фамилия обязательна';
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = 'Введите корректный email';
    if (formData.phone && !/^\+?\d{10,15}$/.test(formData.phone.replace(/\s/g, '')))
      newErrors.phone = 'Введите корректный телефон';
    if (!formData.address) newErrors.address = 'Адрес обязателен';
    if (!formData.city) newErrors.city = 'Город обязателен';
    if (formData.postal_code && !/^\d{5,6}$/.test(formData.postal_code))
      newErrors.postal_code = 'Введите корректный индекс';
    return newErrors;
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/update-profile', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          surname: formData.surname,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          postal_code: formData.postal_code,
          bio: formData.bio,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      const updatedUser = {
        ...user,
        username: formData.name,
        surname: formData.surname,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        postal_code: formData.postal_code,
        bio: formData.bio,
      };

      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      setSaveSuccess(true);
    } catch (err) {
      setErrors({ ...errors, form: err.message || 'Ошибка сохранения данных' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Logout failed: ${response.status}`);
      }

      localStorage.removeItem('user');
      setUser(null);
      navigate('/');
    } catch (err) {
      console.error('Logout error:', err);
      localStorage.removeItem('user');
      setUser(null);
      navigate('/');
    }
  };

  const handleReorder = async (order) => {
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          total_amount: order.total_amount,
          payment_method: order.payment_method,
          status: 'В обработке',
          items: order.items,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setOrders([...orders, data.order]);
      alert(`Заказ #${data.order.id} успешно повторён!`);
    } catch (err) {
      alert('Ошибка при повторении заказа');
    }
  };

  if (isLoading) {
    return (
      <div className="profile-loading">
        <div className="spinner"></div>
        <p>Загружаем ваш профиль...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-container">
        <div className="profile-content">
          <p className="error-message">{error}</p>
          <button className="update-button" onClick={() => navigate('/login')}>
            Войти снова
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="side-panel side-panel-left"></div>
      <div className="side-panel side-panel-right"></div>
      <div className="profile-content">
        <h2 className="profile-title">Ваш Профиль</h2>
        <p className="profile-subtitle">Добавьте сладости в свой стиль!</p>

        <div className="profile-grid">
          <div className="profile-card avatar-section">
            <div className="avatar-container">
              <img src={avatar} alt="Аватар" className="user-avatar" />
              <button
                type="button"
                className="change-avatar-button"
                onClick={() => fileInputRef.current.click()}
              >
                <span role="img" aria-label="камера">📸</span> Изменить фото
              </button>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleAvatarChange}
              />
              {errors.avatar && <p className="error-message">{errors.avatar}</p>}
            </div>
            <button className="logout-button" onClick={handleLogout}>
              Выйти из аккаунта
            </button>
          </div>

          <div className="profile-card user-info-section">
            <form onSubmit={handleUpdateProfile} className="user-form">
              <div className="form-row">
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Имя"
                  />
                  {errors.name && <p className="error-message">{errors.name}</p>}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="surname"
                    value={formData.surname}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Фамилия"
                  />
                  {errors.surname && <p className="error-message">{errors.surname}</p>}
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Email"
                  />
                  {errors.email && <p className="error-message">{errors.email}</p>}
                </div>
                <div className="form-group">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Телефон"
                  />
                  {errors.phone && <p className="error-message">{errors.phone}</p>}
                </div>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Адрес доставки"
                />
                {errors.address && <p className="error-message">{errors.address}</p>}
              </div>
              <div className="form-row">
                <div className="form-group">
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Город"
                  />
                  {errors.city && <p className="error-message">{errors.city}</p>}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="postal_code"
                    value={formData.postal_code}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Индекс"
                  />
                  {errors.postal_code && <p className="error-message">{errors.postal_code}</p>}
                </div>
              </div>
              <div className="form-group">
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="О себе"
                  rows="3"
                />
              </div>
              <div className="map-container">
                <div className="map-placeholder">
                  <span role="img" aria-label="карта">🗺️</span>
                  <p>Ваш адрес доставки</p>
                </div>
              </div>
              <button type="submit" className="update-button">
                {isLoading ? 'Сохраняем...' : 'Сохранить данные'}
              </button>
              {saveSuccess && (
                <p className="success-message">Данные успешно сохранены!</p>
              )}
              {errors.form && <p className="error-message">{errors.form}</p>}
            </form>
          </div>

          <div className="profile-card order-history-section">
            {orders.length > 0 ? (
              <div className="orders-list">
                {orders.map((order) => (
                  <div key={order.id} className="order-card">
                    <div className="order-header">
                      <span>Заказ #{order.id}</span>
                      <span>{new Date(order.order_date).toLocaleDateString('ru-RU')}</span>
                    </div>
                    <div className="order-items">
                      {Array.isArray(order.items) ? (
                        order.items.map((item, index) => (
                          <span key={index} className="order-item">{item}</span>
                        ))
                      ) : (
                        <span className="order-item">Информация о товарах недоступна</span>
                      )}
                    </div>
                    <div className="order-status">
                      Статус: <strong>{order.status}</strong>
                    </div>
                    <div className="order-footer">
                      <span className="order-total">${order.total_amount.toFixed(2)}</span>
                      <button
                        className="reorder-button"
                        onClick={() => handleReorder(order)}
                      >
                        Повторить заказ
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-orders">
                <span role="img" aria-label="конфета">🍭</span>
                <p>У вас пока нет заказов</p>
                <button
                  className="update-button"
                  onClick={() => navigate('/catalog')}
                >
                  Начать покупки
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;