import React, { useState } from "react";
import "../style/Carousel.css";
import Tank from "../assets/tank.svg";
import carIcon from "../assets/mini-car-icon.svg";
import wheelIcon from "../assets/wheel-icon.svg";
import roadIcon from "../assets/road-icon.svg";
import driverIcon from "../assets/driver-icon.svg";

function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const cards = [
    {
      id: 1,
      title: "הרכב עצמו",
      content:
        "יש לרכב טסט? ביטוח? כמה הוא יודע להאיץ? או לבלום אם פתאום צריך? (החוסן הארגוני של היחידה – מורכב ממוכנות וגמישות)",
      icon: carIcon,
    },
    {
      id: 2,
      title: "תמיכה בנסיעה",
      content:
        "המוזיקה, הנוסעים, הדלק ואפילו אפליקציית החניה. (המשאבים של היחידה - התרבות, הערכים, התמיכה בבית ועוד...)",
      icon: wheelIcon,
    },
    {
      id: 3,
      title: "תנאי הדרך",
      content:
        "האם חם היום? יש חסימה בכביש? ערפל? חשש גדול שנאחר? (הלחצים – כל מה שמשפיע עלי ולא בשליטתי)",
      icon: roadIcon,
    },
    {
      id: 4,
      title: "וכמובן, הנהג",
      content:
        "נהג ותיק או חדש? הוא ישן בלילה או חגג במסיבה? (מנהיגות – המפקד כמחולל, מודל ומתווך חוסן)",
      icon: driverIcon,
    },
  ];

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  const prevCard = () => {
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const goToCard = (index) => {
    setCurrentIndex(index);
  };

  const currentCard = cards[currentIndex];

  return (
    <div className="carousel-wrapper">
      <div className="card-container">
        <div className="card">
          <div className="card-header">
            <img className="card-icon" src={currentCard.icon} />
            <h3 className="card-title">{currentCard.title}</h3>
          </div>

          <div className="card-content">
            <p>{currentCard.content}</p>
          </div>

          <div className="card-illustration">
            <img src={Tank} alt="tank" />
          </div>
        </div>
      </div>

      <div className="card-navigation">
        <button className="nav-button prev" onClick={prevCard}>
          ‹
        </button>

        <div className="pagination-dots">
          {cards.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentIndex ? "active" : ""}`}
              onClick={() => goToCard(index)}
            />
          ))}
        </div>

        <button className="nav-button next" onClick={nextCard}>
          ›
        </button>
      </div>
    </div>
  );
}

export default Carousel;
