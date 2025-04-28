import React, { useState, useEffect } from 'react';
import './IceCreamCarousel.css';

// Импорт изображений из папки assets
import strawberryIceCream from '../../assets/strawberry-ice-cream.png';
import strawberryDecor from '../../assets/strawberry-decor.png';
import mangoIceCream from '../../assets/mango-ice-cream.png';
import mangoDecor from '../../assets/mango-decor.png';
import chocolateIceCream from '../../assets/chocolate-ice-cream.png';
import chocolateDecor from '../../assets/chocolate-decor.png';
import pistachioIceCream from '../../assets/pistachio-ice-cream.png';
import pistachioDecor from '../../assets/pistachio-decor.png';

// Массив данных о вкусах мороженого
const flavors = [
  {
    name: 'Strawberry',
    iceCreamImage: strawberryIceCream,
    backgroundColors: ['#ffcccc', '#ff9999'],
    decorativeElements: [
      { image: strawberryDecor, position: { top: '15%', left: '10%' }, rotation: 15 },
      { image: strawberryDecor, position: { top: '30%', left: '80%' }, rotation: -10 },
      { image: strawberryDecor, position: { top: '65%', left: '20%' }, rotation: 25 },
      { image: strawberryDecor, position: { top: '20%', left: '60%' }, rotation: -20 },
      { image: strawberryDecor, position: { top: '70%', left: '75%' }, rotation: 5 },
    ],
    flavorText: 'КЛУБНИКА И ПИВО',
    flavorNote: 'Сладкая клубника в сочетании с легкими нотами светлого пива'
  },
  {
    name: 'Mango',
    iceCreamImage: mangoIceCream,
    backgroundColors: ['#ffd700', '#ffa500'],
    decorativeElements: [
      { image: mangoDecor, position: { top: '20%', left: '15%' }, rotation: -15 },
      { image: mangoDecor, position: { top: '35%', left: '75%' }, rotation: 10 },
      { image: mangoDecor, position: { top: '60%', left: '30%' }, rotation: -5 },
      { image: mangoDecor, position: { top: '25%', left: '55%' }, rotation: 20 },
      { image: mangoDecor, position: { top: '70%', left: '80%' }, rotation: -12 },
    ],
    flavorText: 'МАНГО ЧИЛИ',
    flavorNote: 'Сочное манго с пикантной ноткой чили'
  },
  {
    name: 'Chocolate',
    iceCreamImage: chocolateIceCream,
    backgroundColors: ['#8B4513', '#A0522D'],
    decorativeElements: [
      { image: chocolateDecor, position: { top: '15%', left: '20%' }, rotation: 5 },
      { image: chocolateDecor, position: { top: '40%', left: '70%' }, rotation: -8 },
      { image: chocolateDecor, position: { top: '65%', left: '15%' }, rotation: 12 },
      { image: chocolateDecor, position: { top: '20%', left: '65%' }, rotation: -15 },
      { image: chocolateDecor, position: { top: '55%', left: '85%' }, rotation: 10 },
    ],
    flavorText: 'ШОКОЛАД КОНЬЯК',
    flavorNote: 'Бельгийский шоколад с богатым ароматом выдержанного коньяка'
  },
  {
    name: 'Pistachio',
    iceCreamImage: pistachioIceCream,
    backgroundColors: ['#ccffcc', '#99ff99'],
    decorativeElements: [
      { image: pistachioDecor, position: { top: '20%', left: '15%' }, rotation: -10 },
      { image: pistachioDecor, position: { top: '35%', left: '80%' }, rotation: 15 },
      { image: pistachioDecor, position: { top: '60%', left: '25%' }, rotation: 5 },
      { image: pistachioDecor, position: { top: '25%', left: '50%' }, rotation: -5 },
      { image: pistachioDecor, position: { top: '70%', left: '70%' }, rotation: 20 },
    ],
    flavorText: 'ФИСТАШКА ВАСАБИ',
    flavorNote: 'Нежная фисташка с неожиданным акцентом васаби'
  },
];

const IceCreamCarousel = () => {
  const [currentFlavorIndex, setCurrentFlavorIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showText, setShowText] = useState(true);
  const [direction, setDirection] = useState('right'); // 'left' или 'right'
  const currentFlavor = flavors[currentFlavorIndex];

  useEffect(() => {
    // Показываем текст с задержкой после смены вкуса
    if (isAnimating) {
      setShowText(false);
      const textTimer = setTimeout(() => {
        setShowText(true);
      }, 700); // Увеличенное время задержки для лучшей синхронизации с анимацией
      return () => clearTimeout(textTimer);
    }
  }, [isAnimating]);

  const handleNext = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setDirection('right');
    setCurrentFlavorIndex((prevIndex) => (prevIndex + 1) % flavors.length);
    
    // Сбрасываем флаг анимации через некоторое время
    setTimeout(() => {
      setIsAnimating(false);
    }, 1000); // Увеличенное время для более плавной анимации
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    if (isAnimating) return;
    
    setIsAnimating(true);
    setDirection('left');
    setCurrentFlavorIndex((prevIndex) => (prevIndex - 1 + flavors.length) % flavors.length);
    
    // Сбрасываем флаг анимации через некоторое время
    setTimeout(() => {
      setIsAnimating(false);
    }, 1000); // Увеличенное время для более плавной анимации
  };

  return (
    <div id='топ-вкусов' className="carousel-container">
      <div
        className="background"
        style={{
          background: `radial-gradient(circle, ${currentFlavor.backgroundColors[0]}, ${currentFlavor.backgroundColors[1]})`,
          transition: 'background 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)'
        }}
      />
      <div className="header">АВТОРСКИЕ ВКУСЫ</div>
      
      <div className="ice-cream-content">
        <div className={`ice-cream ${isAnimating ? (direction === 'left' ? 'ice-cream-slide-left' : 'ice-cream-slide-right') : ''}`}>
          <img
            src={currentFlavor.iceCreamImage}
            alt={currentFlavor.name}
            className="ice-cream-image"
          />
        </div>
        
        {currentFlavor.decorativeElements.map((element, index) => (
          <img
            key={index}
            src={element.image}
            alt=""
            className={`decorative-element element-${index} ${isAnimating ? 'element-animate-in' : ''}`}
            style={{ 
              ...element.position, 
              transform: `rotate(${element.rotation}deg) scale(${0.8 + Math.random() * 0.4})`,
              animationDelay: `${index * 0.15}s`,
              opacity: isAnimating ? 0 : 1,
              transition: 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out'
            }}
          />
        ))}
        
        <div className="flavor-text-container">
          <div className={`flavor-text ${showText ? 'text-visible' : 'text-hidden'}`}>
            {currentFlavor.flavorText}
          </div>
          <div className={`flavor-note ${showText ? 'text-visible' : 'text-hidden'}`}>
            {currentFlavor.flavorNote}
          </div>
        </div>
      </div>
      
      <div className="carousel-controls">
        <button className="control-btn prev-btn" onClick={handlePrev}>
          &#8249;
        </button>
        <button className="control-btn next-btn" onClick={handleNext}>
          &#8250;
        </button>
      </div>
    </div>
  );
};

export default IceCreamCarousel;