import { useState } from "react";
function AnswerButtons({ options, buttonTextNext, extraClass = "", onNext, onAnimationEnd }) {
  const [currentSelectedScore, setCurrentSelectedScore] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  return (
    <>
      <div className="answers-fade" />
      <div className="answers-scroll">
        <div
          className={`answer-buttons ${extraClass}`}
          onAnimationEnd={onAnimationEnd}
        >
          {options.map((option, index) => (
            <button
              key={index}
              className={`answer-button ${selectedIndex === index ? "answer-button-focus" : ""}`}
              onClick={() => {
                setCurrentSelectedScore(option.score);
                setSelectedIndex(index);
              }}
            >
              {option.question}
            </button>
          ))}
        </div>
        <button
          className="button-hosen"
          style={{ marginBottom: "3rem" }}
          onClick={() => {
            if (typeof onNext === "function") {
              onNext(parseInt(currentSelectedScore));
            }
          }}
        >
          {buttonTextNext}
        </button>
      </div>
    </>
  );
}

export default AnswerButtons;
