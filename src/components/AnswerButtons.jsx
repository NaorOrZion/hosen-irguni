import { useState } from "react";

function AnswerButtons({ options, extraClass = "", onNext, onAnimationEnd }) {
  const [currentSelectedScore, setCurrentSelectedScore] = useState(0);
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
              className="answer-button"
              onClick={() => {
                setCurrentSelectedScore(option.score);
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
          לשאלה הבאה
        </button>
      </div>
    </>
  );
}

export default AnswerButtons;
