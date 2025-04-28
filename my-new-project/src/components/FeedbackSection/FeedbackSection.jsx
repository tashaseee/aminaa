import React, { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import './FeedbackSection.css';

const FeedbackSection = () => {
  const [activeQuestion, setActiveQuestion] = useState(null);

    // Add this function before the return statement
  const toggleQuestion = (id) => {
  setActiveQuestion(activeQuestion === id ? null : id);
  };
  
  const testimonials = [
    {
      id: 1,
      text: "Я безумно обожаю НОТО, все мои тайные желания исполняют только они! Мороженое со вкусом коньяка и шоколада мое любимоеее••",
      author: "Салимов Нурдаулет",
      position: "Клиент",
      avatar: "/public/nurda.PNG"
    },
    {
      id: 2,
      text: "Великолепное мороженое! Особенно нравится клубничное с кусочками настоящих ягод. Всегда беру на семейные праздники.",
      author: "Елтай Данар",
      position: "Клиент",
      avatar: "/public/danar.jpg"
    },
    {
      id: 3,
      text: "Быстрая доставка, мороженое приезжает всегда хорошо упакованным и не успевает растаять. Рекомендую!",
      author: "Саматов Адиль",
      position: "Клиент",
      avatar: "/public/adil.PNG"
    },
    {
      id: 4,
      text: "Попробовала ваше новое мороженое с лавандой - это что-то невероятное! Теперь это мой любимый вкус.",
      author: "Агабай Аида",
      position: "Клиент",
      avatar: "/public/aidaa.jpeg"
    }
  ];
  
  const faqQuestions = [
    {
      id: 1,
      question: "Могу ли я заказать мороженое онлайн?",
      answer: "Да, вы можете заказать наше мороженое онлайн через наш сайт или мобильное приложение. Доставка осуществляется в специальных термоконтейнерах, чтобы мороженое доехало до вас в идеальном состоянии."
    },
    {
      id: 2,
      question: "Используете ли вы ГМО в своей продукции?",
      answer: "Нет, мы не используем ГМО в нашей продукции. Мы заботимся о качестве и натуральности наших ингредиентов. Все компоненты тщательно отбираются и проходят строгий контроль качества."
    },
    {
      id: 3,
      question: "Где вы находитесь?",
      answer: "Наши фирменные магазины расположены в нескольких районах города. Основной офис и производство находятся по адресу ул. Ледяная, 15. Полный список адресов можно найти в разделе 'Контакты'."
    },
    {
      id: 4,
      question: "Как вы доставляете мороженое так чтоб оно не растаяло?",
      answer: "Мы используем специальные термоизолированные контейнеры с сухим льдом, которые поддерживают оптимальную температуру до 4 часов. Наши курьеры проходят специальное обучение по правильной транспортировке мороженого."
    }
  ];



  // SVG for the decorative curl
  const DecorativeCurl = () => (
    <svg viewBox="0 0 100 40" className="decorative-curl">
      <path d="M10,20 Q30,5 50,20 T90,20" stroke="currentColor" strokeWidth="3" fill="none" />
    </svg>
  );



  return (
    <div id='отзывы' className="feedback-section">
      <div className="feedback-container">
        <h2 className="feedback-title">ОБРАТНАЯ СВЯЗЬ</h2>
        <p className="feedback-subtitle">Всегда рады обратной связи от вас!</p>
        
        <div className="feedback-grid">
          {/* Testimonials section - left column */}
          <div className="testimonials-container">
            <Swiper
              modules={[Autoplay]}
              spaceBetween={20}
              slidesPerView={1}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              loop={true}
              className="testimonials-swiper"
            >
              {testimonials.map((testimonial) => (
                <SwiperSlide key={testimonial.id}>
                  <div className="testimonial-card">
                    <div className="testimonial-decoration">
                      <DecorativeCurl />
                    </div>
                    <p className="testimonial-text">{testimonial.text}</p>
                    <div className="testimonial-author">
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.author} 
                        className="author-avatar"
                      />
                      <div className="author-info">
                        <p className="author-name">{testimonial.author}</p>
                        <p className="author-position">{testimonial.position}</p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          
          {/* FAQ section - right column */}
          <div className="faq-container">
            {faqQuestions.map((faq) => (
              <div className="faq-item" key={faq.id}>
                <button
                  className="faq-question"
                  onClick={() => toggleQuestion(faq.id)}
                >
                  <span>{faq.question}</span>
                  <span className="faq-toggle">{activeQuestion === faq.id ? '−' : '+'}</span>
                </button>
                {activeQuestion === faq.id && (
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackSection;