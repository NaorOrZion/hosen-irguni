import { useState } from "react";
import arrowBack from "../assets/arrow-back.svg";
import ProgressBar from "../components/ProgressBar";
import AnswerButtons from "../components/AnswerButtons";
import Car from "../assets/car.svg";
import "../style/Quizz.css";

function Quizz() {
  return (
    <>
      <div className="quizz-page">
        <div className="quizz-container">
          <div className="upper-bar">
            <div className="progress-and-action-bar">
              <div className="actions-bar">
                <p className="question-number">1/5</p>
                <img src={arrowBack} alt="arrow-back" />
              </div>
              <div className="progress-bar-mobile">
                <ProgressBar />
              </div>
            </div>
            <div className="question-box">
              <p className="question-text">
                נניח שהמכונית היא הצוות שלכם ואתם האנשים מאחורי ההגה...
              </p>
            </div>
          </div>
          <div className="answers">
            <AnswerButtons />
          </div>
          {/* <div className="illustration-car">
            <img src={Car} alt="Car Illustration" />
          </div> */}
          <div className="card">
            <button className="button-hosen" style={{ marginBottom: "3rem" }} onClick={() => navigate("/quizz")}>
              להתחלת המבחן
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Quizz;
