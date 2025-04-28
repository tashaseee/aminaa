import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setIsLoading(true);

    try {
      console.log('Sending login request:', { username });
      const response = await fetch('/api/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Login response:', data, 'Cookies:', document.cookie);
      setSuccessMessage('Вход выполнен успешно!');
      localStorage.setItem('user', JSON.stringify(data.user));

      const userResponse = await fetch('/api/user', {
        method: 'GET',
        credentials: 'include',
      });

      if (!userResponse.ok) {
        const errorData = await userResponse.json();
        throw new Error(errorData.error || `HTTP error! Status: ${userResponse.status}`);
      }

      const userData = await userResponse.json();
      console.log('Session check:', userData);

      navigate('/profile');
    } catch (err) {
      console.error('Login error:', err);
      if (err.message.includes('401')) {
        setError('Ошибка аутентификации. Проверьте имя пользователя и пароль.');
      } else if (err.message.includes('403')) {
        setError('Доступ запрещён. Проверьте настройки сервера.');
      } else {
        setError(err.message || 'Ошибка при входе');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <h2 className="login-title">Вход в NOTO</h2>
        <p className="login-subtitle">Погрузитесь в мир сладостей!</p>

        {error && (
          <div className="message error-message">
            <i className="fas fa-exclamation-circle"></i> {error}
          </div>
        )}

        {successMessage && (
          <div className="message success-message">
            <i className="fas fa-check-circle"></i> {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="form-input"
              placeholder="Имя пользователя"
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-input"
              placeholder="Пароль"
            />
          </div>

          <button
            type="submit"
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? 'Загрузка...' : 'Войти'}
          </button>
        </form>

        <p className="form-link">
          Нет аккаунта? <Link to="/register">Зарегистрируйтесь</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;