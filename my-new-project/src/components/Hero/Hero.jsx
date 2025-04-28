// Hero.jsx
import React from 'react';
import './Hero.css';
import heroImage from '../../assets/hero.png'; // Импортируем изображение

const Hero = () => {
  const promoItems = [
    { text: 'ДЛЯ НОВЫХ ПОКУПАТЕЛЕЙ СКИДКА 50%', color: '#FF0000' },
    { text: 'ДЛЯ НОВЫХ ПОКУПАТЕЛЕЙ СКИДКА 50%', color: '#FF7F00' },
    { text: 'ДЛЯ НОВЫХ ПОКУПАТЕЛЕЙ СКИДКА 50%', color: '#FFFF00' },
    { text: 'ДЛЯ НОВЫХ ПОКУПАТЕЛЕЙ СКИДКА 50%', color: '#00FF00' },
    { text: 'ДЛЯ НОВЫХ ПОКУПАТЕЛЕЙ СКИДКА 50%', color: '#0000FF' },
    { text: 'ДЛЯ НОВЫХ ПОКУПАТЕЛЕЙ СКИДКА 50%', color: '#4B0082' },
    { text: 'ДЛЯ НОВЫХ ПОКУПАТЕЛЕЙ СКИДКА 50%', color: '#9400D3' }
  ];

  return (
    <section className="hero">
      <div 
        className="hero__background" 
        style={{ backgroundImage: `url(${heroImage})` }}
      ></div>
      <div className="hero__content-container">
        <div className="hero__content">
          <div className="hero__logo">NOTO</div>
          <div className="hero__subtitle">ICE CREAM THAT LOVES YOU BACK</div>
        </div>
      </div>
      <div className="hero__promo-carousel">
        <div className="hero__promo-track">
          {[...promoItems, ...promoItems].map((item, index) => (
            <div key={index} className="hero__promo-item" style={{ color: item.color }}>
              {item.text}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;