// IceCreamCatalog.jsx
import React, { useState } from 'react';
import { useCart } from '../CartContext/CartContext';
import './IceCreamCatalog.css';

const IceCreamCatalog = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentDots, setCurrentDots] = useState({
    section1: 0,
    section2: 0,
    section3: 0,
    section4: 0
  });
  
  // Используем setIsCartOpen вместо toggleCart
  const { addToCart, setIsCartOpen } = useCart();

  // Mock product data based on your screenshots
  const products = {
    section1: [
      { id: 1, name: 'ЧОКО-ТАКО АССОРТИ', price: 5000, rating: 4.8, description: 'Ассорти всех вкусов.', images: ['p11.png', 'p12.png'] },
      { id: 2, name: 'ЧОКО-ТАКО ШОКОЛАД', price: 5000, rating: 4.8, description: 'Шоколадное мороженое с вафлями тако.', images: ['p21.png', 'p22.png'] },
      { id: 3, name: 'ЧОКО-ТАКО КАРАМЕЛЬ', price: 5000, rating: 4.8, description: 'Мороженое пломбир с вафлями тако со вкусом карамели.', images: ['p31.png', 'p32.png'] },
      { id: 4, name: 'ЧОКО-ТАКО КОФЕ', price: 5000, rating: 4.9, description: 'Мороженое с вафлями тако со вкусом кофе.', images: ['p41.png', 'p42.png'] },
    ],
    section2: [
      { id: 5, name: 'Фруктовый лед слива', price: 1500, rating: 4.8, description: 'Натуральный продукт с кусочками фруктов.', images: ['p91.png', 'p92.png'] },
      { id: 6, name: 'Фруктовый лед пина колада', price: 1500, rating: 5, description: 'Натуральный продукт с кусочками фруктов.', images: ['p101.png', 'p102.png'] },
      { id: 7, name: 'Фруктовый лед манго-кокос', price: 1500, rating: 4.6, description: 'Натуральный продукт с кусочками фруктов.', images: ['p71.png', 'p72.png'] },
      { id: 8, name: 'Фруктовый лед клубника-малина', price: 1500, rating: 4.8, description: 'Натуральный продукт с кусочками фруктов.', images: ['p81.png', 'p82.png'] },
    ],
    section3: [
      { id: 9, name: 'ШОКОЛАДНОЕ МОРОЖЕНОЕ', price: 3500, rating: 4.8, description: 'Натуральное мороженое из свежих сливок и какао 70%.', images: ['p121.png', 'p122.png'] },
      { id: 10, name: 'МОРОЖЕНОЕ ТЕМНЫЙ ШОКОЛАД', price: 3500, rating: 4.9, description: 'Натуральное мороженое из свежих сливок и какао 75%.', images: ['p131.png', 'p132.png'] },
      { id: 11, name: 'МОРОЖЕНОЕ С КРОШКОЙ ШОКОЛАДА', price: 3500, rating: 4.9, description: 'Натуральное мороженое из свежих сливок с крошкой шоколада.', images: ['p141.png', 'p142.png'] },
      { id: 12, name: 'МОРОЖЕНОЕ СО ВКУСОМ МАНГО', price: 3500, rating: 4.8, description: 'Натуральное мороженое из свежих сливок и манго.', images: ['p151.png', 'p152.png'] },
    ],
    section4: [
      { id: 13, name: 'ЭСКИМО ШОКОЛАДНОЕ', price: 1300, rating: 4.9, description: 'Вкусное лакомство на палочке.', images: ['p171.png', 'p172.png'] },
      { id: 14, name: 'ЭСКИМО С ОРЕХАМИ', price: 1300, rating: 4.8, description: 'Вкусное лакомство на палочке.', images: ['p181.png', 'p182.png'] },
      { id: 15, name: 'КЛУБНИЧНЫЙ MINIS', price: 8000, rating: 4.9, description: 'Шоколадные шарики с мороженым и  с кусочками клубники', images: ['p211.png', 'p212.png'] },
      { id: 16, name: 'МОРОЖЕНОЕ ЧЕРНИКА', price: 6000, rating: 4.9, description: 'Торт мороженое с кусочками бисквита.', images: ['p161.png', 'p162.png'] },
    ],
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  const handleAddToCart = (product, event) => {
    event.stopPropagation(); // Prevent opening modal when clicking the cart button
    addToCart(product);
    
    // Display a quick notification
    const button = event.currentTarget;
    const originalContent = button.innerHTML;
    button.innerHTML = '✓';
    button.classList.add('added-to-cart');
    
    setTimeout(() => {
      button.innerHTML = originalContent;
      button.classList.remove('added-to-cart');
    }, 1000);
  };

  const scrollSection = (section, direction) => {
    const container = document.querySelector(`.section-${section} .products-container`);
    const scrollAmount = container.offsetWidth * 0.8;
    
    if (direction === 'left') {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      if (currentDots[`section${section}`] > 0) {
        setCurrentDots(prev => ({
          ...prev,
          [`section${section}`]: prev[`section${section}`] - 1
        }));
      }
    } else {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      if (currentDots[`section${section}`] < 1) { // assuming we have 2 dots (0 and 1)
        setCurrentDots(prev => ({
          ...prev,
          [`section${section}`]: prev[`section${section}`] + 1
        }));
      }
    }
  };

  const renderSection = (title, subtitle, sectionKey, sectionNumber) => {
    return (
      <div id={`section-${sectionNumber}`} className={`catalog-section section-${sectionNumber}`}>
        <div className="section-header">
          <h2>{title}</h2>
          <p>{subtitle}</p>
          <span className="arrow right-arrow" onClick={() => scrollSection(sectionNumber, 'right')}>→</span>
        </div>
        
        <div className="products-container">
          {products[sectionKey].map(product => (
            <div key={product.id} className="product-card" onClick={() => handleProductClick(product)}>
              <div className="wishlist-icon"></div>
              <img 
                src={product.images[0]} 
                alt={product.name} 
                className="product-image"
              />
              <div className="product-info">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <div className="product-rating">
                  ★ {product.rating}/5
                </div>
                <div className="product-price-cart">
                  <span className="price">{product.price}₸</span>
                  <button 
                    className="add-to-cart-btn"
                    onClick={(e) => handleAddToCart(product, e)}
                  >
                    <i className="cart-icon">🛒</i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="ice-cream-catalog">
      {renderSection('ВАФЛИ МОРОЖЕННОЕ', 'Вафли тако с мороженным изменят ваш день!', 'section1', 1)}
      {renderSection('ФРУКТОВЫЙ ЛЕД', 'Освежитесь в жаркий день вкусным летним эскимо!', 'section2', 2)}
      {renderSection('МОРОЖЕНОЕ', 'Найти свой идеальный вкус мороженого только у нас!', 'section3', 3)}
      {renderSection('МОРОЖЕНОЕ БАР', 'Рай для любителей сладкого!', 'section4', 4)}

      {selectedProduct && (
        <div className="product-modal-overlay" onClick={closeModal}>
          <div className="product-modal" onClick={e => e.stopPropagation()}>
            <button className="close-modal" onClick={closeModal}>×</button>
            <div className="modal-content">
              <div className="modal-image-container">
                <img 
                  src={selectedProduct.images[1]} 
                  alt={`${selectedProduct.name} back view`} 
                  className="modal-image"
                />
              </div>
              <div className="modal-info">
                <h3>{selectedProduct.name}</h3>
                <p className="modal-description">{selectedProduct.description}</p>
                <div className="modal-rating">★ {selectedProduct.rating}/5</div>
                <div className="modal-price">{selectedProduct.price}₸</div>
                <button 
                  className="add-to-cart-modal"
                  onClick={() => {
                    addToCart(selectedProduct);
                    closeModal();
                    // Используем setIsCartOpen(true) вместо toggleCart для гарантированного открытия корзины
                    setTimeout(() => setIsCartOpen(true), 300);
                  }}
                >
                  Добавить в корзину
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IceCreamCatalog;