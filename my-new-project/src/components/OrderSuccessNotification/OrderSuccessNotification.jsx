import React, { useEffect } from 'react';
import { useCart } from '../CartContext/CartContext';
import './OrderSuccessNotification.css';

const OrderSuccessNotification = () => {
  const { orderSuccess, orderNumber } = useCart();
  
  useEffect(() => {
    let timer;
    if (orderSuccess) {
      // Animation to slide in
      const notification = document.querySelector('.order-success-notification');
      if (notification) {
        notification.style.transform = 'translateX(0)';
        
        // Auto-hide after 5 seconds
        timer = setTimeout(() => {
          notification.style.transform = 'translateX(120%)';
        }, 5000);
      }
    }
    
    return () => {
      clearTimeout(timer);
    };
  }, [orderSuccess]);
  
  if (!orderSuccess) return null;
  
  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}.${(currentDate.getMonth() + 1).toString().padStart(2, '0')}.${currentDate.getFullYear()}`;
  const formattedTime = `${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}`;
  
  return (
    <div className="order-success-notification">
      <div className="success-icon">✓</div>
      <div className="success-content">
        <h3>Заказ успешно оформлен!</h3>
        <p>Номер заказа: <strong>#{orderNumber}</strong></p>
        <p>Дата: {formattedDate} {formattedTime}</p>
        <p>На ваш номер телефона отправлено SMS с информацией о заказе</p>
      </div>
      <button className="close-success">×</button>
    </div>
  );
};

export default OrderSuccessNotification;