import React, { useRef, useState } from "react";
import "../style/Carousel.css";
import Tank from "../assets/Tank.svg";
import mockData from "../mockData.json";
import { useAppData } from "../realData";
import MiniCarIcon from "../assets/mini-car-icon.svg";
import WheelIcon from "../assets/wheel-icon.svg";
import RoadIcon from "../assets/road-icon.svg";
import DriverIcon from "../assets/driver-icon.svg";

function Carousel() {
  const { data } = useAppData(mockData);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationPhase, setAnimationPhase] = useState("in"); // 'in' | 'out'
  const [direction, setDirection] = useState("right"); // 'right' (next) | 'left' (prev)
  const [pendingIndex, setPendingIndex] = useState(null);
  const startXRef = useRef(null);
  const isPointerDownRef = useRef(false);
  const SWIPE_THRESHOLD_PX = 50;

  const cards = (data ?? mockData).CarouselData;

  const iconMap = {
    1: MiniCarIcon,
    2: WheelIcon,
    3: RoadIcon,
    4: DriverIcon,
  };

  const nextCard = () => {
    if (animationPhase === "out") return;
    const target = (currentIndex + 1) % cards.length;
    setDirection("right");
    setPendingIndex(target);
    setAnimationPhase("out");
  };

  const prevCard = () => {
    if (animationPhase === "out") return;
    const target = (currentIndex - 1 + cards.length) % cards.length;
    setDirection("left");
    setPendingIndex(target);
    setAnimationPhase("out");
  };

  const goToCard = (index) => {
    if (index === currentIndex || animationPhase === "out") return;
    const dir = index > currentIndex ? "right" : "left";
    setDirection(dir);
    setPendingIndex(index);
    setAnimationPhase("out");
  };

  const currentCard = cards[currentIndex];

  const handleAnimationEnd = () => {
    if (animationPhase === "out") {
      if (pendingIndex !== null) {
        setCurrentIndex(pendingIndex);
      }
      setAnimationPhase("in");
      setPendingIndex(null);
    }
  };

  const cardAnimationClass =
    animationPhase === "out"
      ? direction === "right"
        ? "slide-out-left"
        : "slide-out-right"
      : direction === "right"
      ? "slide-in-right"
      : "slide-in-left";

  // Touch/Mouse swipe handlers
  const onTouchStart = (e) => {
    if (animationPhase === "out") return;
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    startXRef.current = x;
    isPointerDownRef.current = true;
  };

  const onTouchEnd = (e) => {
    if (!isPointerDownRef.current || animationPhase === "out") return;
    const endX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
    const deltaX = endX - (startXRef.current ?? endX);
    isPointerDownRef.current = false;
    startXRef.current = null;
    if (Math.abs(deltaX) < SWIPE_THRESHOLD_PX) return;
    if (deltaX < 0) {
      // swipe left → next
      nextCard();
    } else {
      // swipe right → prev
      prevCard();
    }
  };

  return (
    <div className="carousel-wrapper">
      <div
        className="card-container"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onMouseDown={onTouchStart}
        onMouseUp={onTouchEnd}
      >
        <div
          className={`card ${cardAnimationClass}`}
          onAnimationEnd={handleAnimationEnd}
        >
          <div className="card-header">
            <img className="card-icon" src={iconMap[currentCard.id]} />
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

        <div className="pagination-dots">
          {cards.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentIndex ? "active" : ""}`}
              onClick={() => goToCard(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Carousel;
