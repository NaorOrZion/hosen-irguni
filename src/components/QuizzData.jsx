import ProgressBar from "../components/ProgressBar";
import arrowBack from "../assets/arrow-back.svg";
import Car from "../assets/Car.svg";
import AnswerButtons from "../components/AnswerButtons";
import Skeleton from "@mui/material/Skeleton";
import { useState, useEffect } from "react";

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
  isDone,
  loading,
}) {
  const [animationPhase, setAnimationPhase] = useState("in");
  const [queuedScore, setQueuedScore] = useState(null);
  const [currentSelectedScore, setCurrentSelectedScore] = useState(0);
  const [hasSelected, setHasSelected] = useState(false);

  useEffect(() => {
    setAnimationPhase("in");
    setHasSelected(false);
  }, [currentQuestion]);

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
        <div className={`circle ${isDone ? "circle-move" : ""}`}></div>
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
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {loading ? (
              <>
                <Skeleton width={320} height={40} />
                <Skeleton width={300} height={40} />
                <Skeleton width={270} height={40} />
              </>
            ) : (
              <div
                className="text"
                key={isCarSeen ? `q-${currentQuestion}` : "intro"}
              >
                {!isCarSeen
                  ? mockData.carText
                  : mockData.questions[currentQuestion].question}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="answers">
        <div className="answers-content">
          {!isCarSeen ? (
            <img src={Car} alt="Car Illustration" className="svg-car" />
          ) : (
            <AnswerButtons
              key={currentQuestion}
              options={mockData.questions[currentQuestion].options}
              buttonTextNext={mockData.buttonTextNext}
              extraClass={
                animationPhase === "out" ? "slide-out-left" : "slide-in-right"
              }
              onNext={handleNext}
              onAnimationEnd={handleAnswersAnimationEnd}
              setCurrentSelectedScore={setCurrentSelectedScore}
              setHasSelected={setHasSelected}
            />
          )}
        </div>
        <button
          className="button-hosen"
          onClick={() => {
            if (!isCarSeen) {
              setIsCarSeen(true);
              return;
            }
            if (typeof handleNext === "function") {
              handleNext(parseInt(currentSelectedScore));
            }
          }}
          disabled={isCarSeen && hasSelected === false}
          style={{
            opacity: isCarSeen && hasSelected === false ? 0.5 : 1,
            cursor:
              isCarSeen && hasSelected === false ? "not-allowed" : "pointer",
          }}
        >
          {!isCarSeen ? mockData.buttonTextStart : mockData.buttonTextNext}
        </button>
      </div>
    </>
  );
}

export default QuizzData;
