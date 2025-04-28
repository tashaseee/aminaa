import React, { useState } from "react";
import { useCart } from "../CartContext/CartContext";
import "./MiniBitesCatalog.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const MiniBitesCatalog = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentDot, setCurrentDot] = useState(0);
  
  const { addToCart, setIsCartOpen } = useCart();

  const products = [
    { 
      id: 1, 
      name: "ШОКОЛАДНЫЕ МИНИ-КУСОЧКИ", 
      price: 500, 
      rating: 4.9, 
      reviews: 8, 
      description: "Мини-кусочки мороженого с шоколадным вкусом.", 
      images: ["mini1.png", "mini12.png"],
      isNew: true 
    },
    { 
      id: 2, 
      name: "КЛУБНИЧНЫЕ МИНИ-КУСОЧКИ", 
      price: 500, 
      rating: 4.7, 
      reviews: 6, 
      description: "Мини-кусочки мороженого с клубничным вкусом.", 
      images: ["mini2.png", "mini22.png"],
      isNew: false 
    },
    { 
      id: 3, 
      name: "КАРАМЕЛЬНЫЕ МИНИ-КУСОЧКИ", 
      price: 500, 
      rating: 4.8, 
      reviews: 5, 
      description: "Мини-кусочки мороженого с карамельным вкусом.", 
      images: ["mini3.png", "mini32.png"],
      isNew: false 
    },
    { 
        id: 4, 
        name: "КАРАМЕЛЬНЫЕ МИНИ-КУСОЧКИ", 
        price: 500, 
        rating: 4.8, 
        reviews: 5, 
        description: "Мини-кусочки мороженого с карамельным вкусом.", 
        images: ["mini4.png", "mini42.png"],
        isNew: false 
      },
  ];

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

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
      <div className="mini-bites ice-cream-catalog">
        <div id="mini-bites-section" className="catalog-section section-1">
          <div className="section-header">
            <h2>МИНИ-КУСОЧКИ МОРОЖЕНОГО</h2>
            <p>Попробуйте наши вкусные мини-кусочки!</p>
            <span className="arrow right-arrow" onClick={() => scrollSection("right")}>
              →
            </span>
          </div>
          
          <div className="products-container">
            {products.map((product) => (
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
                      <span key={i}>★</span>
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
                  <div className="modal-price">₹ {selectedProduct.price}</div> {/* Исправлено: product.price → selectedProduct.price */}
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

export default MiniBitesCatalog;