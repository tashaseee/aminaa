import React, { useState, useEffect } from 'react';
import { FaSearch, FaTrash, FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './AdminPanel.css';

const AdminPanel = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [newProduct, setNewProduct] = useState({ name: '', price: '', quantity: 1 });
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/user', {
          credentials: 'include',
        });
        
        const data = await response.json();
        
        if (!response.ok || !data.user || data.user.role !== 'admin') {
          throw new Error('Доступ запрещен');
        }
        
        setUser(data.user);
        fetchOrders();
      } catch (err) {
        navigate('/');
      }
    };
    
    checkAuth();
  }, [navigate]);

  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        credentials: 'include',
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Ошибка загрузки заказов');
      }
      
      setOrders(data.orders);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
    setError('');
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Ошибка обновления статуса');
      }

      setOrders(orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      ));
      
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder({ ...selectedOrder, status: newStatus });
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const addProduct = () => {
    if (!newProduct.name || !newProduct.price) {
      setError('Заполните название и цену товара.');
      return;
    }

    const updatedOrder = {
      ...selectedOrder,
      items: [
        ...selectedOrder.items,
        {
          id: Date.now(),
          name: newProduct.name,
          price: parseFloat(newProduct.price),
          quantity: newProduct.quantity,
        },
      ],
      total_amount: selectedOrder.items.reduce((sum, item) => sum + item.price * item.quantity, 0) +
                   parseFloat(newProduct.price) * newProduct.quantity,
    };
    setSelectedOrder(updatedOrder);
    setOrders(orders.map((o) => (o.id === updatedOrder.id ? updatedOrder : o)));
    setNewProduct({ name: '', price: '', quantity: 1 });
    setError('');
  };

  const updateProductQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;

    const updatedOrder = {
      ...selectedOrder,
      items: selectedOrder.items.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      ),
      total_amount: selectedOrder.items.reduce((sum, item) =>
        item.id === productId
          ? sum + item.price * newQuantity
          : sum + item.price * item.quantity, 0),
    };
    setSelectedOrder(updatedOrder);
    setOrders(orders.map((o) => (o.id === updatedOrder.id ? updatedOrder : o)));
  };

  const deleteProduct = (productId) => {
    const updatedOrder = {
      ...selectedOrder,
      items: selectedOrder.items.filter((item) => item.id !== productId),
      total_amount: selectedOrder.items
        .filter((item) => item.id !== productId)
        .reduce((sum, item) => sum + item.price * item.quantity, 0),
    };
    setSelectedOrder(updatedOrder);
    setOrders(orders.map((o) => (o.id === updatedOrder.id ? updatedOrder : o)));
  };

  const filteredOrders = orders.filter(
    (order) =>
      order.id.toString().includes(searchTerm) ||
      order.user_id.toString().includes(searchTerm)
  );

  if (!user) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Панель администратора NOTO - Заказы</h1>

        {error && (
          <div className="mb-6 p-4 bg-red-100 text-red-800 rounded-lg">
            {error}
          </div>
        )}

        <div className="mb-6 relative">
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Поиск по ID заказа или ID пользователя..."
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-noto-pink shadow-sm transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-noto-pink to-noto-purple text-white">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">ID заказа</th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">Дата</th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">ID пользователя</th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">Сумма</th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">Статус</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-pink-50 cursor-pointer transition-all duration-200"
                  onClick={() => handleOrderClick(order)}
                >
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{order.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(order.order_date).toLocaleDateString('ru-RU')}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{order.user_id}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">₽{order.total_amount.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        order.status === 'Отправлен'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {isModalOpen && selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Заказ #{selectedOrder.id}</h2>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="text-gray-500 hover:text-gray-700 transition-all text-xl"
                  >
                    ✕
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">ID пользователя</p>
                    <p className="font-medium text-gray-800">{selectedOrder.user_id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Метод оплаты</p>
                    <p className="font-medium text-gray-800">{selectedOrder.payment_method}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Дата</p>
                    <p className="font-medium text-gray-800">
                      {new Date(selectedOrder.order_date).toLocaleDateString('ru-RU')}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Сумма</p>
                    <p className="font-medium text-gray-800">₽{selectedOrder.total_amount.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Статус</p>
                    <select
                      value={selectedOrder.status}
                      onChange={(e) => updateOrderStatus(selectedOrder.id, e.target.value)}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-noto-pink"
                    >
                      <option value="В обработке">В обработке</option>
                      <option value="Отправлен">Отправлен</option>
                    </select>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Товары</h3>
                  <div className="space-y-4">
                    {selectedOrder.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between border-b border-gray-100 pb-4"
                      >
                        <div>
                          <p className="font-medium text-gray-800">{item.name}</p>
                          <p className="text-sm text-gray-500">
                            ₽{item.price.toFixed(2)} × {item.quantity}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => updateProductQuantity(item.id, parseInt(e.target.value))}
                            className="w-20 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-noto-pink"
                          />
                          <button
                            onClick={() => deleteProduct(item.id)}
                            className="text-red-500 hover:text-red-700 transition-all"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Добавить товар</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <input
                      type="text"
                      placeholder="Название товара"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                      className="border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-noto-pink"
                    />
                    <input
                      type="number"
                      placeholder="Цена"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                      className="border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-noto-pink"
                    />
                    <div className="flex gap-4">
                      <input
                        type="number"
                        min="1"
                        value={newProduct.quantity}
                        onChange={(e) => setNewProduct({ ...newProduct, quantity: parseInt(e.target.value) })}
                        className="border border-gray-200 rounded-lg px-4 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-noto-pink"
                      />
                      <button
                        onClick={addProduct}
                        className="bg-gradient-to-r from-noto-pink to-noto-purple text-white px-6 py-2 rounded-lg hover:from-noto-pink-dark hover:to-noto-purple-dark flex items-center gap-2 transition-all"
                      >
                        <FaPlus /> Добавить
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;