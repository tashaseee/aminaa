import { TELEGRAM_API_URL, TELEGRAM_CHAT_ID } from './telegramconfig';

export const sendOrderNotification = async (orderDetails) => {
  try {
    const { orderNumber, customer, items, total, address, paymentMethod } = orderDetails;
    
    // Форматируем сообщение для отправки в Telegram
    const message = `
🛒 *НОВЫЙ ЗАКАЗ #${orderNumber}*

👤 *Информация о клиенте:*
- Имя: ${customer.firstName} ${customer.lastName}
- Телефон: ${customer.phone}
- Email: ${customer.email}

📦 *Доставка:*
- Адрес: ${address.address}
- Город: ${address.city}
${address.zipCode ? `- Индекс: ${address.zipCode}` : ''}

💰 *Оплата:*
- Метод: ${paymentMethod === 'card' ? 'Банковская карта' : 'Наличными'}
- Сумма: ${total}₸

🛍️ *Товары:*
${items.map(item => `- ${item.name} x${item.quantity} - ${item.price * item.quantity}₸`).join('\n')}

⏰ Дата: ${new Date().toLocaleString('ru-RU')}
    `;
    
    // Отправляем сообщение в Telegram
    const response = await fetch(`${TELEGRAM_API_URL}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'Markdown'
      })
    });
    
    const data = await response.json();
    
    if (!data.ok) {
      console.error('Ошибка при отправке уведомления в Telegram:', data);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Ошибка при отправке уведомления в Telegram:', error);
    return false;
  }
};