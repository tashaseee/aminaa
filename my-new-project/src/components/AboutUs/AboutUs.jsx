import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';
import './AboutUs.css';
import { 
  FaTruck, 
  FaIceCream, 
  FaLeaf, 
  FaHeart, 
  FaYoutube, 
  FaChevronLeft, 
  FaChevronRight,
  FaInstagram 
} from 'react-icons/fa';

// Компонент для рендеринга 3D-модели Disney
const DisneyLogo = ({ url }) => {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={[5, 5, 5]} position={[0, -1, 0]} />;
};

const AboutUs = () => {
  // Массив баннеров
  const banners = ['/ban1.png', '/ban2.png', '/ban3.png', '/ban4.png', '/ban5.png'];
  const [currentBanner, setCurrentBanner] = useState(0);

  // Партнеры (без Disney, так как он выделен отдельно)
  const partners = [
    '/partners/danone.png',
    '/partners/ferrero.png',
    '/partners/kraft-heinz.png',
    '/partners/walmart.png',
    '/partners/amazon.png',
    '/partners/general-mills.png'
  ];

  // Автопереключение баннеров
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [banners.length]);

  const nextBanner = () => {
    setCurrentBanner((prev) => (prev + 1) % banners.length);
  };

  const prevBanner = () => {
    setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);
  };

  return (
    <div className="about-us">
      <section className="about-us__hero">
        <div className="about-us__content">
          {/* Блок с баннером */}
          <div className="banner-container">
            <button className="banner-arrow left" onClick={prevBanner}>
              <FaChevronLeft />
            </button>
            <div className="banner-slide">
              <img 
                src={banners[currentBanner]} 
                alt={`Баннер ${currentBanner + 1}`} 
                className="banner-image"
              />
            </div>
            <button className="banner-arrow right" onClick={nextBanner}>
              <FaChevronRight />
            </button>
            <div className="banner-dots">
              {banners.map((_, index) => (
                <span 
                  key={index} 
                  className={`dot ${index === currentBanner ? 'active' : ''}`}
                  onClick={() => setCurrentBanner(index)}
                />
              ))}
            </div>
          </div>

          {/* Заголовок */}
          <h1 className="about-us__title">ДЛЯ ВАС ТОЛЬКО ЛУЧШЕЕ</h1>

          {/* Основной блок с фичами */}
          <div className="about-us__main">
            <div className="about-us__features-left">
              <div className="feature-item">
                <div className="feature-icon fast-delivery">
                  <FaTruck className="icon" />
                </div>
                <h3>БЫСТРАЯ ДОСТАВКА</h3>
                <p>Доставляем мороженое в идеальном состоянии за 30 минут</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon unique-packaging">
                  <FaIceCream className="icon" />
                </div>
                <h3>ЭКСКЛЮЗИВНАЯ УПАКОВКА</h3>
                <p>Каждая порция в фирменной упаковке с дизайнерским принтом</p>
              </div>
            </div>

            <div className="about-us__image-container">
              <div className="about-us__image-circle"></div>
              <img src="/photo.png" alt="NOTO Ice Cream" className="about-us__image" />
              <div className="about-us__image-overlay">
                <span className="calories-tag">75 КАЛОРИЙ, ВСЕГО ЛИШЬ!</span>
              </div>
            </div>

            <div className="about-us__features-right">
              <div className="feature-item">
                <div className="feature-icon money-back">
                  <FaLeaf className="icon" />
                </div>
                <h3>НАТУРАЛЬНЫЕ ИНГРЕДИЕНТЫ</h3>
                <p>Только свежее молоко и натуральные добавки</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon fast-delivery-2">
                  <FaHeart className="icon" />
                </div>
                <h3>СДЕЛАНО С ЛЮБОВЬЮ</h3>
                <p>Каждая порция приготовлена с особым вниманием</p>
              </div>
            </div>
          </div>

          {/* Секция партнеров */}
          <div className="partners-section">
            <h2 className="partners-title">Наши партнеры</h2>
            <div className="partners-main">
              <div className="partners-disney">
                <div className="disney-logo-container">
                  <Canvas style={{ height: '300px', width: '100%' }} camera={{ position: [0, 0, 5], fov: 50 }}>
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[10, 10, 5]} intensity={1} />
                    <DisneyLogo url="public/Disney.glb" />
                    <OrbitControls enablePan={false} enableZoom={false} />
                  </Canvas>
                </div>
              </div>
              <div className="partners-text">
                <h3>Disney — наш главный партнер</h3>
                <p>
                  Мы гордимся сотрудничеством с Disney, мировым лидером в создании волшебства и радости. 
                  Вместе мы создаем уникальные вкусы мороженого, вдохновленные любимыми персонажами и историями, 
                  чтобы подарить вам и вашим близким незабываемые моменты счастья.
                </p>
              </div>
            </div>
            <div className="partners-ticker">
              <div className="partners-ticker-track">
                {partners.concat(partners).map((logo, index) => (
                  <img 
                    key={index} 
                    src={logo} 
                    alt={`Партнер ${index + 1}`} 
                    className="partner-logo"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Блок с YouTube каналом */}
          <div className="youtube-section">
            <div className="youtube-header">
              <FaYoutube className="youtube-icon" />
              <h2>Наш YouTube канал</h2>
            </div>
            <p className="youtube-description">
              Подписывайтесь на наш канал, чтобы первыми узнавать о новых вкусах и акциях!
              <br />
              Канал: <a href="https://www.youtube.com/channel/UCXTN8bGCOlyTruCZNDTeN0A" target="_blank" rel="noopener noreferrer">NOTO Ice Cream</a>
            </p>
            
            <div className="video-grid">
              <div className="video-container">
                <iframe 
                  src="https://www.youtube.com/embed/GV4vhZPHHsY" 
                  title="NOTO Ice Cream видео 1"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen>
                </iframe>
              </div>
              <div className="video-container">
                <iframe 
                  src="https://www.youtube.com/embed/4tTEXlDUwUE" 
                  title="NOTO Ice Cream видео 2"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen>
                </iframe>
              </div>
              <div className="video-container">
                <iframe 
                  src="https://www.youtube.com/embed/33FYfA4ZMTM" 
                  title="NOTO Ice Cream видео 3"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen>
                </iframe>
              </div>
              <div className="video-container">
                <iframe 
                  src="https://www.youtube.com/embed/EIXJR7LeTb4" 
                  title="NOTO Ice Cream видео 4"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen>
                </iframe>
              </div>
            </div>
          </div>

          {/* Блок с Instagram */}
          <div className="instagram-section">
            <div className="instagram-header">
              <FaInstagram className="instagram-icon" />
              <h2>Мы в Instagram</h2>
            </div>
            <p className="instagram-description">
              Следите за нашими яркими моментами, новыми вкусами и эксклюзивными предложениями!
              <br />
              Подписывайтесь: <a href="https://www.instagram.com/eatnoto/" target="_blank" rel="noopener noreferrer">@eatnoto</a>
            </p>
            <div className="instagram-grid">
              <div className="instagram-post">
                <a href="https://www.instagram.com/p/DIoNKpZPrZ9/" target="_blank" rel="noopener noreferrer">
                  <img src="/inst1.png" alt="Instagram пост 1" className="instagram-image" />
                  <div className="instagram-overlay">
                    <FaInstagram className="instagram-overlay-icon" />
                  </div>
                </a>
              </div>
              <div className="instagram-post">
                <a href="https://www.instagram.com/reel/DIGJmwlSFzo/" target="_blank" rel="noopener noreferrer">
                  <img src="/inst2.png" alt="Instagram пост 2" className="instagram-image" />
                  <div className="instagram-overlay">
                    <FaInstagram className="instagram-overlay-icon" />
                  </div>
                </a>
              </div>
              <div className="instagram-post">
                <a href="https://www.instagram.com/p/DH8lsfMMFaN/" target="_blank" rel="noopener noreferrer">
                  <img src="/inst3.png" alt="Instagram пост 3" className="instagram-image" />
                  <div className="instagram-overlay">
                    <FaInstagram className="instagram-overlay-icon" />
                  </div>
                </a>
              </div>
              <div className="instagram-post">
                <a href="https://www.instagram.com/p/DHiIH4Ssr3i/" target="_blank" rel="noopener noreferrer">
                  <img src="/inst4.png" alt="Instagram пост 4" className="instagram-image" />
                  <div className="instagram-overlay">
                    <FaInstagram className="instagram-overlay-icon" />
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;