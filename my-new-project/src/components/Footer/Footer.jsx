import React from 'react';
import { Link } from 'react-router-dom'; // Добавляем импорт Link
import Inst from "../../assets/Instagram.svg";
import Tik from "../../assets/Tiktok.svg";
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__ice-cream-decoration"></div>
      
      <div className="footer__container">
        {/* Logo and Tagline Section */}
        <div className="footer__logo-section">
          <div className="footer__logo">
            <span className="icy">NOTO</span>
            <span className="footer__logo-cone">🍦</span>
          </div>
          <p className="footer__tagline">Мороженое, от которого тает сердце</p>
          <div className="footer__flavor-tags">
            <span className="flavor-tag">Клубника</span>
            <span className="flavor-tag">Шоколад</span>
            <span className="flavor-tag">Мята</span>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="footer__nav-section">
          <h3 className="footer__nav-title">Узнайте больше</h3>
          <ul className="footer__nav-list">
            <li className="footer__nav-item">
              <span className="nav-bullet">•</span>
              <a href="#главная" className="footer__nav-link">Главная</a>
            </li>
            <li className="footer__nav-item">
              <span className="nav-bullet">•</span>
              <a href="#отзывы" className="footer__nav-link">Отзывы</a>
            </li>
            <li className="footer__nav-item">
              <span className="nav-bullet">•</span>
              <a href="#категория" className="footer__nav-link">Категория</a>
            </li>
            <li className="footer__nav-item">
              <span className="nav-bullet">•</span>
              <a href="#топ вкусов" className="footer__nav-link">Топ вкусов</a>
            </li>
            <li className="footer__nav-item">
              <span className="nav-bullet">•</span>
              <Link to="/about-us" className="footer__nav-link">Команда</Link> {/* Обновляем ссылку */}
            </li>
          </ul>
        </div>

        {/* Contact Information */}
        <div className="footer__contact-section">
          <h3 className="footer__nav-title">Свяжитесь с нами</h3>
          <div className="footer__contact-item">
            <div className="contact-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
            <div className="contact-info">
              <h4>Главный офис:</h4>
              <p>г. Астана, проспект Мәңгілік Ел, 55/11,
Бизнес-центр EXPO, блок С1,
Казахстан, 010000</p>
            </div>
          </div>

          <div className="footer__contact-item">
            <div className="contact-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </div>
            <div className="contact-info">
              <h4>Email:</h4>
              <p>hello@noto ice.kz</p>
            </div>
          </div>
        </div>

        {/* Phone, Social and Newsletter */}
        <div className="footer__social-section">
          <div className="footer__contact-item">
            <div className="contact-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
            </div>
            <div className="contact-info">
              <h4>+7 705 174 8120</h4>
              <p>Звоните нам в любое время дня</p>
            </div>
          </div>

          <div className="footer__newsletter">
            <h4>Подпишитесь на новости</h4>
            <div className="newsletter-form">
              <input type="email" placeholder="Ваш email" className="newsletter-input" />
              <button className="newsletter-button">OK</button>
            </div>
          </div>

          <div className="footer-socials">
            <a href="https://www.instagram.com/tashaseeee/"><img src={Inst} alt="Instagram" /></a>
            <a href="https://www.tiktok.com/@tashasee1?_r=1&_d=ei2kcmdjhaai6k&sec_uid=MS4wLjABAAAAkVlfFUaWiWjDyTIz4qfwaYuxiSkHV4ZA-uKPYqGNcwXm25Dn3JvwJr2i7Z1JM1NO&share_author_id=6805438101638497285&sharer_language=ru&source=h5_m&u_code=dbcb891adh8ie6&ug_btm=b8727,b0&social_share_type=4&utm_source=copy&sec_user_id=MS4wLjABAAAAkVlfFUaWiWjDyTIz4qfwaYuxiSkHV4ZA-uKPYqGNcwXm25Dn3JvwJr2i7Z1JM1NO&tt_from=copy&utm_medium=ios&utm_campaign=client_share&enable_checksum=1&user_id=6805438101638497285&share_link_id=A2C98F80-A290-4648-9463-0A76D2614F7E&share_app_id=1233"><img src={Tik} alt="Tiktok" /></a>
          </div>
        </div>
      </div>

      {/* Additional Features - Ice Cream Facts */}
      <div className="footer__fun-facts">
        <div className="fun-fact">
          <div className="fun-fact-icon"></div>
          <p>Более 30 уникальных вкусов</p>
        </div>
        <div className="fun-fact">
          <div className="fun-fact-icon"></div>
          <p>Натуральные ингредиенты</p>
        </div>
        <div className="fun-fact">
          <div className="fun-fact-icon"></div>
          <p>Лучшее мороженое в Казахстане</p>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer__copyright">
        <p>© 2025 NOTO Мороженое. Все права защищены.</p>
        <div className="footer__copyright-links">
          <a href="#">Политика конфиденциальности</a>
          <span className="separator">|</span>
          <a href="#">Условия использования</a>
        </div>
      </div>
      
      <div className="footer__wavy-decoration"></div>
    </footer>
  );
};

export default Footer;