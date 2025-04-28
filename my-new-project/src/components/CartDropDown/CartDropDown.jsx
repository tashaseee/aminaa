import React from 'react';
import { useCart } from '../CartContext/CartContext';
import './CartDropDown.css'; // Путь должен соответствовать реальному расположению файла

const CartDropdown = () => {
  const { 
    cartItems, 
    isCartOpen, 
    removeFromCart, 
    updateQuantity, 
    getTotalPrice, 
    toggleCart,
    openCheckout
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="cart-dropdown-overlay">
      <div className="cart-dropdown">
        <div className="cart-header">
          <h3>Ваша корзина</h3>
          <button className="cart-close-btn" onClick={toggleCart}>×</button>
        </div>
        
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <p>Ваша корзина пуста</p>
            <button className="continue-shopping" onClick={toggleCart}>
              Продолжить покупки
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-image">
                    <img src={item.images[0]} alt={item.name} />
                  </div>
                  <div className="cart-item-details">
                    <h4>{item.name}</h4>
                    <div className="cart-item-price">{item.price}₸</div>
                    <div className="cart-item-controls">
                      <div className="quantity-control">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                          +
                        </button>
                      </div>
                      <button 
                        className="remove-item" 
                        onClick={() => removeFromCart(item.id)}
                      >
                        <span className="trash-icon">🗑️</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="cart-footer">
              <div className="cart-total">
                <span>Итого:</span>
                <span>{getTotalPrice()}₸</span>
              </div>
              <button className="checkout-btn" onClick={openCheckout}>
                Оформить заказ
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartDropdown;