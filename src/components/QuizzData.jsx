import ProgressBar from "../components/ProgressBar";
import arrowBack from "../assets/arrow-back.svg";
import Car from "../assets/Car.svg";
import AnswerButtons from "../components/AnswerButtons";
import { useState } from "react";

function QuizzData({
  currentQuestion,
  setCurrentQuestion,
  questionsLength,
  mockData,
  setScore,
  isCarSeen,
  setIsCarSeen,
  score,
  handleBack,
}) {
  const [animationPhase, setAnimationPhase] = useState("in");
  const [queuedScore, setQueuedScore] = useState(null);

  const handleNext = (selectedScore) => {
    setQueuedScore(selectedScore);
    setAnimationPhase("out");
  };

  const handleAnswersAnimationEnd = () => {
    if (animationPhase === "out") {
      if (queuedScore !== null) {
        setScore((prev) => [...prev, parseInt(queuedScore)]);
      }
      setCurrentQuestion((prev) => prev + 1);
      setAnimationPhase("in");
      setQueuedScore(null);
    }
  };
  return (
    <>
      <div className="upper-section">
        <div className="content-container">
          <div className="progress-and-action-bar">
            <div className="actions-bar">
              <img
                src={arrowBack}
                alt="arrow-back"
                onClick={handleBack}
                style={{ cursor: "pointer" }}
              />
              <p className="question-number">
                {currentQuestion + 1 + "/" + questionsLength}
              </p>
            </div>
            <ProgressBar
              numerator={currentQuestion + 1}
              denominator={questionsLength}
            />
          </div>
          <div
            className="text"
            key={isCarSeen ? `q-${currentQuestion}` : "intro"}
          >
            {!isCarSeen
              ? mockData.carText
              : mockData.questions[currentQuestion].question}
          </div>
        </div>
      </div>
      <div className="answers">
        {!isCarSeen ? (
          <div className="car-part">
            <div className="illustration-car">
              <img src={Car} alt="Car Illustration" className="svg-car" />
            </div>
            <button
              className="button-hosen"
              style={{ marginBottom: "3rem" }}
              onClick={() => {
                setIsCarSeen(true);
              }}
            >
              {mockData.buttonTextStart}
            </button>
          </div>
        ) : (
          <AnswerButtons
            options={mockData.questions[currentQuestion].options}
            buttonTextNext={mockData.buttonTextNext}
            extraClass={
              animationPhase === "out" ? "slide-out-left" : "slide-in-right"
            }
            onNext={handleNext}
            onAnimationEnd={handleAnswersAnimationEnd}
          />
        )}
      </div>
    </>
  );
}

export default QuizzData;
