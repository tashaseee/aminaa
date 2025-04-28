// SectionBlock.jsx

import React, { useState, useEffect } from 'react';
import '../cube1/SectionBlock.css';
import pht1 from '../../assets/photo1.png';
import pht2 from '../../assets/banner2.png';
import pht3 from '../../assets/banner3.png';

const SectionBlock = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const sections = [
    {
      textBgColor: '#F83D8E',
      imageBgColor: '#D9C6E4',
      title: ['САМОЕ',
             'УНИКАЛЬНОЕ', 
             'МОРОЖЕНОЕ'],
      subtitle: 'В КАЗАХСТАНЕ',
      image: pht1
    },
    {
      textBgColor: '#4A90E2',
      imageBgColor: '#C5E1FF',
      title: ['НОВЫЕ ВКУСЫ', 'СОВСЕМ СКОРО!'],
      subtitle: 'ПОДПИСЫВАЙТЕСЬ НА ОБНОВЛЕНИЯ',
      image: pht2
    },
    {
      textBgColor: '#50E3C2',
      imageBgColor: '#C8F7EE',
      title: ['МОРОЖЕНОЕ ДЛЯ','ВЕГАНОВ'],
      subtitle: 'СКОРО В НАЛИЧИИ',
      image: pht3
    }
  ];

  // Auto-rotate sections every few seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % sections.length);
    }, 5000); // Change section every 5 seconds
    
    return () => clearInterval(interval);
  }, [sections.length]);

  // Handle manual navigation dot click
  const handleDotClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="section-container">
      {sections.map((section, index) => (
        <div 
          key={index} 
          className={`section-slide ${index === activeIndex ? 'active' : ''}`}
        >
          <div className="section-flex">
            {/* Text side */}
            <div className="text-side" style={{ backgroundColor: section.textBgColor }}>
              <div className="text-content">
                {section.title.map((line, i) => (
                  <h2 key={i} className="section-title">{line}</h2>
                ))}
                <p className="section-subtitle">{section.subtitle}</p>
              </div>
            </div>
            
            {/* Image side */}
            <div className="image-side" style={{ backgroundColor: section.imageBgColor }}>
              <img 
                src={section.image} 
                alt={`Ice cream product ${index + 1}`} 
                className="section-image"
              />
            </div>
          </div>
        </div>
      ))}
      
      {/* Navigation dots */}
      <div className="nav-dots">
        {sections.map((_, index) => (
          <div 
            key={index}
            className={`nav-dot ${index === activeIndex ? 'active' : ''}`}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default SectionBlock;