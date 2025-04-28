import React, { useState } from 'react';
import { useCart } from '../CartContext/CartContext';
import { sendOrderNotification } from './TelegramService'; // Укажите правильный путь
import './Checkout.css';

const Checkout = () => {
  const { 
    cartItems, 
    checkoutOpen, 
    closeCheckout, 
    getTotalPrice, 
    completeOrder 
  } = useCart();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    paymentMethod: 'card'
  });
  
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  
  if (!checkoutOpen) return null;
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'Введите имя';
    if (!formData.lastName.trim()) newErrors.lastName = 'Введите фамилию';
    if (!formData.phone.trim()) newErrors.phone = 'Введите номер телефона';
    if (!/^\+?[0-9]{10,15}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Введите корректный номер телефона';
    }
    if (!formData.email.trim()) newErrors.email = 'Введите email';
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Введите корректный email';
    }
    if (!formData.address.trim()) newErrors.address = 'Введите адрес';
    if (!formData.city.trim()) newErrors.city = 'Введите город';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm() && !isProcessing) {
      setIsProcessing(true);
      
      try {
        // Подготавливаем данные о заказе
        const orderNumber = Math.floor(100000 + Math.random() * 900000); // Генерируем случайный номер заказа
        const subtotal = getTotalPrice();
        const shipping = subtotal > 10000 ? 0 : 1000; // Free shipping over 10000₸
        const tax = Math.round(subtotal * 0.12); // 12% tax
        const total = subtotal + shipping + tax;
        
        const orderDetails = {
          orderNumber: orderNumber,
          customer: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone
          },
          address: {
            address: formData.address,
            city: formData.city,
            zipCode: formData.zipCode
          },
          items: cartItems,
          subtotal: subtotal,
          shipping: shipping,
          tax: tax,
          total: total,
          paymentMethod: formData.paymentMethod
        };
        
        // Отправляем уведомление в Telegram
        await sendOrderNotification(orderDetails);
        
        // Завершаем оформление заказа
        completeOrder(orderNumber);
        
        // Закрываем модальное окно оформления заказа
        closeCheckout();
      } catch (error) {
        console.error('Ошибка при обработке заказа:', error);
      } finally {
        setIsProcessing(false);
      }
    }
  };
  
  const selectPaymentMethod = (method) => {
    setFormData({
      ...formData,
      paymentMethod: method
    });
  };
  
  // Calculate shipping cost and tax for display
  const subtotal = getTotalPrice();
  const shipping = subtotal > 10000 ? 0 : 1000; // Free shipping over 10000₸
  const tax = Math.round(subtotal * 0.12); // 12% tax
  const total = subtotal + shipping + tax;
  
  return (
    <div className="checkout-overlay">
      <div className="checkout-container">
        <div className="checkout-header">
          <h3>Оформление заказа</h3>
          <button className="checkout-close-btn" onClick={closeCheckout}>×</button>
        </div>
        
        <div className="checkout-content">
          <form className="checkout-form" onSubmit={handleSubmit}>
            <div className="form-section">
              <h4>Контактная информация</h4>
              <div className="form-row">
                <div className="form-group">
                  <label>Имя</label>
                  <input 
                    type="text" 
                    name="firstName" 
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                  {errors.firstName && <div className="error-message">{errors.firstName}</div>}
                </div>
                <div className="form-group">
                  <label>Фамилия</label>
                  <input 
                    type="text" 
                    name="lastName" 
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                  {errors.lastName && <div className="error-message">{errors.lastName}</div>}
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Email</label>
                  <input 
                    type="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && <div className="error-message">{errors.email}</div>}
                </div>
                <div className="form-group">
                  <label>Телефон</label>
                  <input 
                    type="tel" 
                    name="phone" 
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+7"
                  />
                  {errors.phone && <div className="error-message">{errors.phone}</div>}
                </div>
              </div>
            </div>
            
            <div className="form-section">
              <h4>Адрес доставки</h4>
              <div className="form-row">
                <div className="form-group">
                  <label>Адрес</label>
                  <input 
                    type="text" 
                    name="address" 
                    value={formData.address}
                    onChange={handleChange}
                  />
                  {errors.address && <div className="error-message">{errors.address}</div>}
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Город</label>
                  <input 
                    type="text" 
                    name="city" 
                    value={formData.city}
                    onChange={handleChange}
                  />
                  {errors.city && <div className="error-message">{errors.city}</div>}
                </div>
                <div className="form-group">
                  <label>Почтовый индекс</label>
                  <input 
                    type="text" 
                    name="zipCode" 
                    value={formData.zipCode}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            
            <div className="form-section">
              <h4>Способ оплаты</h4>
              <div className="payment-methods">
                <div 
                  className={`payment-method ${formData.paymentMethod === 'card' ? 'selected' : ''}`}
                  onClick={() => selectPaymentMethod('card')}
                >
                  <div className="payment-icon">💳</div>
                  <div className="payment-label">Банковская карта</div>
                </div>
                <div 
                  className={`payment-method ${formData.paymentMethod === 'cash' ? 'selected' : ''}`}
                  onClick={() => selectPaymentMethod('cash')}
                >
                  <div className="payment-icon">💵</div>
                  <div className="payment-label">Наличными</div>
                </div>
              </div>
            </div>
            
            <div className="checkout-summary">
              <div className="summary-item">
                <span>Товары:</span>
                <span>{subtotal}₸</span>
              </div>
              <div className="summary-item">
                <span>Доставка:</span>
                <span>{shipping}₸</span>
              </div>
              <div className="summary-item">
                <span>НДС (12%):</span>
                <span>{tax}₸</span>
              </div>
              <div className="summary-total">
                <span>Итого:</span>
                <span>{total}₸</span>
              </div>
            </div>
            
            <button type="submit" className="complete-order-btn" disabled={isProcessing}>
              {isProcessing ? 'Обработка...' : 'Подтвердить заказ'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;