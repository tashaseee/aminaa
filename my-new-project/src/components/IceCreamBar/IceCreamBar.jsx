import React, { useState } from "react";
import { useCart } from "../CartContext/CartContext";
import "./IceCreamBar.css";

const IceCreamBar = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  const { addToCart, setIsCartOpen } = useCart();

  const products = [
    { 
      id: 1, 
      name: "КЛУБНИЧНЫЙ ЛЕДЕНЕЦ", 
      price: 300, 
      rating: 4.8, 
      reviews: 5, 
      description: "Леденец на палочке с клубничным вкусом.", 
      images: ["ice1.png", "ice12.png"],
      isNew: true 
    },
    { 
      id: 2, 
      name: "ШОКОЛАДНЫЙ ЛЕДЕНЕЦ", 
      price: 300, 
      rating: 4.9, 
      reviews: 3, 
      description: "Леденец на палочке с шоколадным покрытием.", 
      images: ["ice2.png", "ice22.png"],
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

  return (
    <div>
      <div className="ice-cream-bar ice-cream-catalog">
        <div id="ice-cream-bar-section" className="catalog-section section-1">
          <div className="section-header">
            <h2>ЭСКИМО</h2>
            <p>Попробуйте наши вкусные леденцы на палочке!</p>
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
    </div>
  );
};

export default IceCreamBar;