import { useState } from "react";
function AnswerButtons({ options, buttonTextNext, extraClass = "", onNext, onAnimationEnd, setCurrentSelectedScore, setHasSelected }) {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  return (
    <>
      <div className="answers-fade" />
      <div
        className={`answer-buttons ${extraClass}`}
        onAnimationEnd={() => {
          if (typeof onAnimationEnd === "function") {
            onAnimationEnd();
          }
        }}
      >
        {options.map((option, index) => (
          <button
            key={index}
            className={`answer-button ${selectedIndex === index ? "answer-button-focus" : ""}`}
            onClick={() => {
              setCurrentSelectedScore(option.score);
              setSelectedIndex(index);
              setHasSelected(true);
            }}
          >
            {option.question}
          </button>
        ))}
      </div>

      {/* <button
          className="button-hosen"
          style={{ marginBottom: "3rem" }}
          onClick={() => {
            if (typeof onNext === "function") {
              onNext(parseInt(currentSelectedScore));
            }
          }}
        >
          {buttonTextNext}
        </button> */}

    </>
  );
}

export default AnswerButtons;
