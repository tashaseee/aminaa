// Categories.jsx
import React, { useEffect, useRef } from 'react';
import './Categories.css';

import category1 from '../../assets/1.png';
import category2 from '../../assets/2.png';
import category3 from '../../assets/3.png';
import category4 from '../../assets/4.png';

const Categories = () => {
  const categoriesRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll('.category-item');
            items.forEach((item, index) => {
              setTimeout(() => {
                item.classList.add('animate-in');
              }, 150 * index); 
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (categoriesRef.current) {
      observer.observe(categoriesRef.current);
    }

    return () => {
      if (categoriesRef.current) {
        observer.unobserve(categoriesRef.current);
      }
    };
  }, []);

  const categories = [
    {
      id: 1,
      name: 'ВАФЛИ-МОРОЖЕНОЕ',
      image: category1,
      color: '#EA7AA0',
      bgColor: '#F7D1D9',
      sectionId: 'section-1'
    },
    {
      id: 2,
      name: 'ФРУКТОВЫЙ ЛЕД',
      image: category2,
      color: '#8A95E6',
      bgColor: '#D3E0D1',
      sectionId: 'section-2'
    },
    {
      id: 3,
      name: 'МОРОЖЕНОЕ',
      image: category3,
      color: '#C2A87E',
      bgColor: '#F0E4D4',
      sectionId: 'section-3'
    },
    {
      id: 4,
      name: 'БАР МОРОЖЕНОГО',
      image: category4, 
      color: '#E6A095',
      bgColor: '#E2D3F0',
      sectionId: 'section-4'
    }
  ];

  // Функция для скролла к нужному разделу
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id='категория' className="categories-section">
      <div className="title-container">
        <h2 className="categories__title animate-title">КАТЕГОРИИ</h2>
      </div>
      <div className="categories-content">
        <div className="categories__container" ref={categoriesRef}>
          {categories.map(category => (
            <div key={category.id} className="category-item">
              <div 
                className="category-image-container" 
                style={{ backgroundColor: category.bgColor }}
                onClick={() => scrollToSection(category.sectionId)}
              >
                <img src={category.image} alt={category.name} className="category-image" />
              </div>
              <button 
                className="category-button" 
                style={{ backgroundColor: category.color }}
                onClick={() => scrollToSection(category.sectionId)}
                onMouseEnter={(e) => e.target.querySelector('.arrow-icon')?.classList.add('arrow-bounce')}
                onMouseLeave={(e) => e.target.querySelector('.arrow-icon')?.classList.remove('arrow-bounce')}
              >
                {category.name}
                <span className="arrow-icon">→</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;