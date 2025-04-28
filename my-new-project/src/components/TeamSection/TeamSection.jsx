import React, { useState } from 'react';
import './TeamSection.css';

const TeamMember = ({ name, title, image, hoverImage }) => {
  const [isHovering, setIsHovering] = useState(false);
  
  return (
    <div className="team-member">
      <div 
        className="team-member-photo"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <img 
          src={isHovering ? hoverImage : image} 
          alt={name} 
        />
      </div>
      <h3 className="team-member-name">{name}</h3>
      <div className="team-member-title">
        <div>Должность:</div>
        <div>{title}</div>
      </div>
    </div>
  );
};

const TeamSection = () => {
  const teamMembers = [
    {
      name: "Таукен Аспан",
      title: "Менеджер по качеству и безопасности",
      image: "/public/aspan1.png",
      hoverImage: "/public/aspan2.png"
    },
    {
      name: "Амина Казанбасова",
      title: "Директор по инновациям и разработке продуктов",
      image: "/public/amina1.png",
      hoverImage: "/public/amina2.png"
    },
    {
      name: "Даниярова Меруерт",
      title: "Менеджер по закупкам и снабжению",
      image: "/public/meru1.png",
      hoverImage: "/public/meru2.png"
    },
    {
      name: "Шаяхмет Енлик",
      title: "Руководитель отдела логистики",
      image: "/public/enlik1.png",
      hoverImage: "/public/enlik.png"
    },
    {
      name: "Нурберген Айымжан",
      title: "Финансовый директор",
      image: "/public/aiym.png",
      hoverImage: "/public/aiyme.png"
    },
    {
      name: "Мубарак Бекзат",
      title: "Сомелье мороженого",
      image: "/public/beka1.png",
      hoverImage: "/public/beka2.png"
    }
  ];

  // Разделение на строки по 3 человека
  const rows = [];
  for (let i = 0; i < teamMembers.length; i += 3) {
    rows.push(teamMembers.slice(i, i + 3));
  }

  return (
    <div id='команда' className="team-section">
      <h2 className="team-section-title">Наша команда</h2>
      <p className="team-section-description">
        Это группа увлечённых профессионалов, которые делают мир мороженого более интересным и необычным! Мы ломаем четвертую стенку и не боимся нарушать шаблоны. Познакомьтесь с нашими мастерами «NOTO»:
      </p>
      
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="team-row">
          {row.map((member, index) => (
            <TeamMember 
              key={index}
              name={member.name}
              title={member.title}
              image={member.image}
              hoverImage={member.hoverImage}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default TeamSection;