import React, { useState } from "react";
import { useCart } from "../CartContext/CartContext"; // Путь к CartContext правильный
import "./WaffleIceCreamCatalog.css"; // Локальный файл стилей
import Header from "../Header/Header"; // Исправленный путь
import Footer from "../Footer/Footer"; // Исправленный путь

const WaffleIceCreamCatalog = () => {
  const [selectedProduct, setSelectedProduct] = useState(null); // Состояние для выбранного продукта
  const [currentDot, setCurrentDot] = useState(0); // Состояние для текущей точки прокрутки
  
  const { addToCart, setIsCartOpen } = useCart(); // Получаем функции из контекста корзины

  // Данные о продуктах (вафельное мороженое ЧОКО-ТАКО)
  const waffleProducts = [
    { 
      id: 1, 
      name: "АССОРТИ ВКУСОВ - ЧОКО ТАКО [4 ШТУКИ]", 
      price: 500, 
      rating: 5.0, 
      reviews: 1, 
      description: "Ассорти всех вкусов Чоко Тако.", 
      images: ["waffle1.png", "waffle12.png"],
      isNew: true 
    },
    { 
      id: 2, 
      name: "РИЧ ШОКОЛАД - ЧОКО ТАКО [4 ШТУКИ]", 
      price: 500, 
      rating: 5.0, 
      reviews: 0, 
      description: "Шоколадное мороженое с вафлями тако.", 
      images: ["waffle2.png", "waffle22.png"],
      isNew: true 
    },
    { 
      id: 3, 
      name: "КРУНЧИ КАРАМЕЛЬ - ЧОКО ТАКО [4 ШТУКИ]", 
      price: 500, 
      rating: 5.0, 
      reviews: 0, 
      description: "Мороженое с вафлями тако со вкусом карамели.", 
      images: ["waffle3.png", "waffle32.png"],
      isNew: true 
    },
    { 
      id: 4, 
      name: "КОЛД КОФЕ - ЧОКО ТАКО [4 ШТУКИ]", 
      price: 500, 
      rating: 5.0, 
      reviews: 1, 
      description: "Мороженое с вафлями тако со вкусом кофе.", 
      images: ["waffle4.png", "waffle42.png"],
      isNew: true 
    },
    { 
      id: 5, 
      name: "КОЛД КОФЕ - ЧОКО ТАКО [4 ШТУКИ]", 
      price: 500, 
      rating: 5.0, 
      reviews: 1, 
      description: "Мороженое с вафлями тако со вкусом кофе.", 
      images: ["waffle5.png", "waffle52.png"],
      isNew: true 
    },
  ];

  // Обработчик клика по продукту для открытия модального окна
  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  // Закрытие модального окна
  const closeModal = () => {
    setSelectedProduct(null);
  };

  // Добавление продукта в корзину
  const handleAddToCart = (product, event) => {
    event.stopPropagation();
    addToCart(product);
    
    const button = event.currentTarget;
    const originalContent = button.innerHTML;
    button.innerHTML = "✓";
    button.classList.add("added-to-cart");
    
    setTimeout(() => {
      button.innerHTML = originalContent;
      button.classList.remove("added-to-cart");
    }, 1000);
  };

  // Прокрутка секции продуктов
  const scrollSection = (direction) => {
    const container = document.querySelector(".products-container");
    const scrollAmount = container.offsetWidth * 0.8;
    
    if (direction === "left") {
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      if (currentDot > 0) {
        setCurrentDot((prev) => prev - 1);
      }
    } else {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      if (currentDot < 1) {
        setCurrentDot((prev) => prev + 1);
      }
    }
  };

  return (
    <div>
      <Header />
      <div className="waffle ice-cream-catalog">
        <div id="waffle-section" className="catalog-section section-1">
          <div className="section-header">
            <h2>ВАФЛИ МОРОЖЕНОЕ</h2>
            <p>Вафли тако с мороженным изменят ваш день!</p>
            <span className="arrow right-arrow" onClick={() => scrollSection("right")}>
              →
            </span>
          </div>
          
          <div className="products-container">
            {waffleProducts.map((product) => (
              <div
                key={product.id}
                className="product-card"
                onClick={() => handleProductClick(product)}
              >
                {product.isNew && <span className="new-badge">НОВИНКА</span>}
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
                    {[...Array(Math.floor(product.rating))].map((_, i) => (
                      <span key={i}> COPYING</span>
                    ))}
                    {product.rating % 1 !== 0 && <span>☆</span>} {product.rating}{" "}
                    ({product.reviews})
                  </div>
                  <div className="product-price-cart">
                    <span className="price">₹ {product.price}</span>
                    <button
                      className="add-to-cart-btn"
                      onClick={(e) => handleAddToCart(product, e)}
                    >
                      <i className="cart-icon">🛒</i>
                    </button>
                  </div>
                  <div className="order-buttons">
                    <button
                      className="order-swiggy"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open("https://www.swiggy.com", "_blank");
                      }}
                    >
                      ЗАКАЗАТЬ НА SWIGGY
                    </button>
                    <button
                      className="order-zomato"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open("https://www.zomato.com", "_blank");
                      }}
                    >
                      ЗАКАЗАТЬ НА ZOMATO
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {selectedProduct && (
          <div className="product-modal-overlay" onClick={closeModal}>
            <div className="product-modal" onClick={(e) => e.stopPropagation()}>
              <button className="close-modal" onClick={closeModal}>
                ×
              </button>
              <div className="modal-content">
                <div className="modal-image-container">
                  <img
                    src={selectedProduct.images[1]}
                    alt={`${selectedProduct.name} задний вид`}
                    className="modal-image"
                  />
                </div>
                <div className="modal-info">
                  <h3>{selectedProduct.name}</h3>
                  <p className="modal-description">{selectedProduct.description}</p>
                  <div className="modal-rating">
                    {[...Array(Math.floor(selectedProduct.rating))].map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                    {selectedProduct.rating % 1 !== 0 && <span>☆</span>}{" "}
                    {selectedProduct.rating}/5 ({selectedProduct.reviews})
                  </div>
                  <div className="modal-price">₹ {selectedProduct.price}</div>
                  <button
                    className="add-to-cart-modal"
                    onClick={() => {
                      addToCart(selectedProduct);
                      closeModal();
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
      <Footer />
    </div>
  );
};

export default WaffleIceCreamCatalog;