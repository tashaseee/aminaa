import React, { useState } from 'react';
import { FaUser, FaLock, FaChevronRight, FaMedal, FaLightbulb, FaChartLine, FaSmile } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './EmployeeExperience.css';

const EmployeeExperience = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [employeeImg, setEmployeeImg] = useState('/aspan2.png');
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          username,
          password
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Ошибка входа');
      }

      if (data.user && data.user.role === 'admin') {
        navigate('/admin');
      } else {
        alert('Успешный вход в систему сотрудника');
      }
    } catch (err) {
      setError(err.message || 'Произошла ошибка при входе');
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageHover = () => {
    setEmployeeImg('/aspan1.png');
  };

  const handleImageLeave = () => {
    setEmployeeImg('/aspan2.png');
  };

  return (
    <div className="employee-portal">
      <div className="portal-background">
        <div className="shape-circle pink"></div>
        <div className="shape-circle purple"></div>
        <div className="shape-wave"></div>
      </div>
      
      <div className="portal-container">
        <header className="portal-header">
          <h1>Добро пожаловать в <span>NOTO</span> Portal</h1>
          <p>Доступ к инструментам и ресурсам для сотрудников</p>
        </header>
        
        <div className="portal-grid">
          <div className="login-card">
            <div className="card-header">
              <div className="header-icon">
                <FaUser />
              </div>
              <h2>Авторизация</h2>
            </div>
            
            {error && <div className="error-message">{error}</div>}
            
            <form onSubmit={handleSubmit} className="login-form">
              <div className="input-group">
                <label>Логин</label>
                <div className="input-field">
                  <FaUser className="input-icon" />
                  <input
                    type="text"
                    placeholder="Введите ваш логин"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="input-group">
                <label>Пароль</label>
                <div className="input-field">
                  <FaLock className="input-icon" />
                  <input
                    type="password"
                    placeholder="Введите ваш пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="form-options">
                <label className="remember-me">
                  <input type="checkbox" />
                  <span>Запомнить меня</span>
                </label>
                <a href="#" className="forgot-password">Забыли пароль?</a>
              </div>
              
              <button type="submit" className="login-button" disabled={isLoading}>
                {isLoading ? 'Вход...' : 'Войти в систему'}
                {!isLoading && <FaChevronRight className="btn-icon" />}
              </button>
            </form>
          </div>
          
          <div className="spotlight-card">
            <div className="card-header">
              <div className="header-icon">
                <FaMedal />
              </div>
              <h2>Сотрудник месяца</h2>
              <span className="badge">Апрель 2025</span>
            </div>
            
            <div className="achievements-top">
              <div className="achievement">
                <FaLightbulb className="achievement-icon" />
                <span className="count">12</span>
                <span className="label">Новых рецептов</span>
              </div>
              <div className="achievement">
                <FaChartLine className="achievement-icon" />
                <span className="count">25%</span>
                <span className="label">Рост продаж</span>
              </div>
              <div className="achievement">
                <FaSmile className="achievement-icon" />
                <span className="count">98%</span>
                <span className="label">Положительных отзывов</span>
              </div>
            </div>
            
            <div className="employee-profile">
              <div 
                className="profile-image"
                onMouseEnter={handleImageHover}
                onMouseLeave={handleImageLeave}
              >
                <img src={employeeImg} alt="Сотрудник месяца" />
              </div>
              
              <div className="profile-info">
                <h3>Таукен Аспандияр</h3>
                <p className="position">Старший технолог</p>
                
                <p className="description">
                  Разработал новую линейку низкокалорийного мороженого, которая увеличила продажи на 25% и получила 98% положительных отзывов.
                </p>
              </div>
            </div>
          </div>
          
          <div className="team-news-card">
            <div className="team-photo-container">
              <img src="/team1.png" alt="Наша команда NOTO" className="team-photo" />
            </div>
            <div className="news-container">
              <h3>Корпоративные новости</h3>
              <div className="news-list">
                <div className="news-item">
                  <div className="news-date">15 апр</div>
                  <div className="news-content">
                    <h4>Новая система премирования</h4>
                    <p>С 1 мая вводится обновленная система мотивации сотрудников.</p>
                  </div>
                </div>
                <div className="news-item">
                  <div className="news-date">10 апр</div>
                  <div className="news-content">
                    <h4>Корпоративное мероприятие</h4>
                    <p>20 мая состоится ежегодный летний пикник для всех сотрудников.</p>
                  </div>
                </div>
                <div className="news-item">
                  <div className="news-date">5 апр</div>
                  <div className="news-content">
                    <h4>Новые вкусы мороженого</h4>
                    <p>Представляем 5 новых вкусов в нашем весеннем ассортименте.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeExperience;