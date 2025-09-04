import { useState } from "react";

function AnswerButtons({options, setScore, setCurrentQuestion}) {
  const [currentSelectedScore, setCurrentSelectedScore] = useState(0);
  return (
    <>
      <div className="answers-fade" />
      <div className="answers-scroll">
        <div className="answer-buttons">
          {options.map((option, index) => (
            <button key={index} className="answer-button" onClick={() => {setCurrentSelectedScore(option.score)}}>{option.question}</button>
          ))}
        </div>
        <button className="button-hosen" style={{ marginBottom: "3rem" }} onClick={() => {setScore(prev => [...prev, parseInt(currentSelectedScore)]); setCurrentQuestion(prev => prev + 1)}}>
          לשאלה הבאה
        </button>
      </div>
    </>
  );
}

export default AnswerButtons;