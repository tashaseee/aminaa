import React, { useState } from "react";
import { useCart } from "../CartContext/CartContext";
import "./LowCalCatalog.css";

const PopsiclesCatalog = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  const { addToCart, setIsCartOpen } = useCart();

  const products = [
    { 
      id: 1, 
      name: "КЛУБНИЧНОЕ ЭСКИМО", 
      price: 250, 
      rating: 4.7, 
      reviews: 4, 
      description: "Эскимо с клубничным вкусом и шоколадной глазурью.", 
      images: ["lowcal1.png", "lowcal12.png"],
      isNew: true 
    },
    { 
      id: 2, 
      name: "ШОКОЛАДНОЕ ЭСКИМО", 
      price: 250, 
      rating: 4.8, 
      reviews: 6, 
      description: "Эскимо с насыщенным шоколадным вкусом.", 
      images: ["lowcal2.png", "lowcal22.png"],
      isNew: false 
    },
    { 
      id: 3, 
      name: "МАНГОВОЕ ЭСКИМО", 
      price: 250, 
      rating: 4.6, 
      reviews: 3, 
      description: "Эскимо с тропическим манговым вкусом.", 
      images: ["lowcal3.png", "lowcal32.png"],
      isNew: false 
    },
    { 
      id: 4, 
      name: "ЛИМОННОЕ ЭСКИМО", 
      price: 250, 
      rating: 4.6, 
      reviews: 3, 
      description: "Эскимо с освежающим лимонным вкусом.", 
      images: ["lowcal4.png", "lowcal42.png"],
      isNew: false 
    },
    { 
      id: 5, 
      name: "МАЛИНОВОЕ ЭСКИМО", 
      price: 250, 
      rating: 4.6, 
      reviews: 3, 
      description: "Эскимо с ярким малиновым вкусом.", 
      images: ["lowcal5.png", "lowcal52.png"],
      isNew: false 
    },
    { 
      id: 6, 
      name: "АПЕЛЬСИНОВОЕ ЭСКИМО", 
      price: 250, 
      rating: 4.5, 
      reviews: 5, 
      description: "Эскимо с освежающим апельсиновым вкусом.", 
      images: ["lowcal6.png", "lowcal62.png"],
      isNew: true 
    },
    { 
        id: 7, 
        name: "АПЕЛЬСИНОВОЕ ЭСКИМО", 
        price: 250, 
        rating: 4.5, 
        reviews: 5, 
        description: "Эскимо с освежающим апельсиновым вкусом.", 
        images: ["lowcal7.png", "lowcal72.png"],
        isNew: true 
      },
      { 
        id: 8, 
        name: "АПЕЛЬСИНОВОЕ ЭСКИМО", 
        price: 250, 
        rating: 4.5, 
        reviews: 5, 
        description: "Эскимо с освежающим апельсиновым вкусом.", 
        images: ["lowcal8.png", "lowcal82.png"],
        isNew: true 
      },
      { 
        id: 9, 
        name: "АПЕЛЬСИНОВОЕ ЭСКИМО", 
        price: 250, 
        rating: 4.5, 
        reviews: 5, 
        description: "Эскимо с освежающим апельсиновым вкусом.", 
        images: ["lowcal9.png", "lowcal92.png"],
        isNew: true 
      },
      { 
        id: 10, 
        name: "АПЕЛЬСИНОВОЕ ЭСКИМО", 
        price: 250, 
        rating: 4.5, 
        reviews: 5, 
        description: "Эскимо с освежающим апельсиновым вкусом.", 
        images: ["lowcal10.png", "lowcal102.png"],
        isNew: true 
      },
      { 
        id: 11, 
        name: "АПЕЛЬСИНОВОЕ ЭСКИМО", 
        price: 250, 
        rating: 4.5, 
        reviews: 5, 
        description: "Эскимо с освежающим апельсиновым вкусом.", 
        images: ["lowcal11.png", "lowcal112.png"],
        isNew: true 
      },
      
      { 
        id: 12, 
        name: "АПЕЛЬСИНОВОЕ ЭСКИМО", 
        price: 250, 
        rating: 4.5, 
        reviews: 5, 
        description: "Эскимо с освежающим апельсиновым вкусом.", 
        images: ["lowcal13.png", "lowcal132.png"],
        isNew: true 
      },
      { 
        id: 13, 
        name: "АПЕЛЬСИНОВОЕ ЭСКИМО", 
        price: 250, 
        rating: 4.5, 
        reviews: 5, 
        description: "Эскимо с освежающим апельсиновым вкусом.", 
        images: ["lowcal14.png", "lowcal142.png"],
        isNew: true 
      },

  ];

  // Логируем количество продуктов для проверки
  console.log("Количество отображаемых продуктов:", products.length);

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
      <div className="popsicles ice-cream-catalog">
        <div id="popsicles-section" className="catalog-section section-1">
          <div className="section-header">
            <h2>НИЗКОКАЛОРИЙНОЕ МОРОЖЕННОЕ</h2>
            <p>Попробуйте наши вкусные эскимо!</p>
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

export default PopsiclesCatalog;