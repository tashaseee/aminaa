import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../CartContext/CartContext';
import './Header.css';

const Header = () => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const { setIsCartOpen, getTotalItems } = useCart();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const handleScroll = () => {
      const scrolled = window.scrollY > 10;
      setIsScrolled(scrolled);
      if (scrolled) {
        document.body.classList.add('scrolled');
      } else {
        document.body.classList.remove('scrolled');
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCartClick = () => {
    setIsCartOpen(true);
  };

  const categories = [
    { name: 'Вафельное мороженое', path: '/waffle-catalog' },
    { name: 'Эскимо', path: '/ice-cream-bars-catalog' },
    { name: 'Мороженное на палочке', path: '/popsicles-catalog' },
    { name: 'Низкокалорийное мороженое', path: '/low-cal-catalog' },
    { name: 'Мини-кусочки', path: '/mini-bites-catalog' },
    { name: 'Торт-мороженое', path: '/ice-cream-cake-catalog' },
    { name: 'Веганские десерты', path: '/vegan-frozen-desserts-catalog' },
    { name: 'Макарон-мороженое', path: '/macaron ice-cream-catalog' },
    { name: 'Сиропы', path: '/syrups-catalog' },
  ];

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header__container">
        <div className="header__logo">NOTO</div>

        <nav className="header__nav">
          {['Главная', 'Каталог', 'О нас', 'Для сотрудников', 'Личный кабинет'].map((item) => (
            <div
              key={item}
              className="header__link-wrapper"
              onMouseEnter={() => setHoveredItem(item)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {item === 'Каталог' ? (
                <>
                  <span className={`header__link ${hoveredItem === item ? 'hovered' : ''}`}>
                    {item}
                    <span className="link__underline"></span>
                  </span>
                  {hoveredItem === 'Каталог' && (
                    <div className="dropdown-menu">
                      {categories.map((category) => (
                        <Link
                          key={category.name}
                          to={category.path}
                          className="dropdown-item"
                          onClick={() => setHoveredItem(null)}
                        >
                          {category.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : item === 'Главная' ? (
                <Link
                  to="/"
                  className={`header__link ${hoveredItem === item ? 'hovered' : ''}`}
                >
                  {item}
                  <span className="link__underline"></span>
                </Link>
              ) : item === 'О нас' ? (
                <Link
                  to="/about-us"
                  className={`header__link ${hoveredItem === item ? 'hovered' : ''}`}
                >
                  {item}
                  <span className="link__underline"></span>
                </Link>
              ) : item === 'Личный кабинет' ? (
                <Link
                  to="/profile"
                  className={`header__link ${hoveredItem === item ? 'hovered' : ''}`}
                >
                  {item}
                  <span className="link__underline"></span>
                </Link>
              ) : (
                <Link
                  to="/employee-experience"
                  className={`header__link ${hoveredItem === item ? 'hovered' : ''}`}
                >
                  {item}
                  <span className="link__underline"></span>
                </Link>
              )}
            </div>
          ))}
        </nav>

        <div className="header__buttons">
          {user ? (
            <span className="header__user">Привет, {user.username}!</span>
          ) : (
            <Link to="/login" className="header__login-button">
              <span className="button__text">ВОЙТИ</span>
              <span className="button__hover-effect"></span>
            </Link>
          )}
          {user && (
            <button className="header__button" onClick={handleCartClick}>
              <span className="button__text">
                В КОРЗИНУ {getTotalItems() > 0 && `(${getTotalItems()})`}
              </span>
              <span className="button__hover-effect"></span>
              {getTotalItems() > 0 && (
                <span className="cart-count">{getTotalItems()}</span>
              )}
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;