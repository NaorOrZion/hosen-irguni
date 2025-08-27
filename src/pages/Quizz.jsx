import { useState } from "react";
import arrowBack from "../assets/arrow-back.svg";
import ProgressBar from "../components/ProgressBar";
import "../style/Quizz.css";

function Quizz() {
  return (
    <>
      <div className="quizz-page">
        <div className="quizz-container">
          <div className="upper-bar">
            <div className="actions-bar">
              <p className="question-number">1/5</p>
              <img src={arrowBack} alt="arrow-back" />
            </div>
            <div className="progress-bar-mobile">
              <ProgressBar />
            </div>
            <div className="question-box">
                <p className="question-text">מה עם ערכי החסון ארגוני בעיניך?</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Quizz;
