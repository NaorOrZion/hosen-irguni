import "../style/Quizz2.css"
import circle from "../assets/circle.svg"
import fullCircle from "../assets/full-circle.svg"
import ProgressBar from "../components/ProgressBar";
import arrowBack from "../assets/arrow-back.svg";
import arrowDownGreen from "../assets/arrow-down-green.svg";
import Car from "../assets/car.svg";
import AnswerButtons from "../components/AnswerButtons";
import FinalBar from "../components/FinalBar";
import FinalScore from "../components/FinalScore";

export const Quizz2 = () => {
    return (
        <div className="quizz-page">
            <div className="small-circle move-left"></div>
            <div className="circle circle-move"></div>
            <div className="final-content">
                <FinalBar />
                <FinalScore score={30} />
                <div className="break">
                    <p className="break-text">מה זה אומר עליי?</p>
                    <img src={arrowDownGreen} alt="arrow-down" className="arrow-down"/>
                </div>
            </div>
            {/* <div className="upper-section">
                <div className="content-container">
                    <div className="progress-and-action-bar">
                        <div className="actions-bar">
                            <img src={arrowBack} alt="arrow-back" />
                            <p className="question-number">1/5</p>
                        </div>
                        <ProgressBar />
                    </div>
                    <div className="text">נניח שהמכונית היא הצוות שלכם ואתם האנשים מאחורי ההגה...</div>
                </div>
            </div>
            <div className="answers">
                {/* <div className="car-part">
                    <div className="illustration-car">
                        <img src={Car} alt="Car Illustration" className="svg-car"/>
                    </div>
                    <button className="button-hosen" style={{ marginBottom: "3rem" }} onClick={() => navigate("/quizz")}>
                        להתחלת המבחן
                    </button>
                </div> 
                <div className="answers-fade" />
                <div className="answers-scroll">
                    <AnswerButtons />
                    <button className="button-hosen" style={{ marginBottom: "3rem" }} onClick={() => navigate("/quizz")}>
                        להתחלת המבחן
                    </button>
                </div>
            </div> */}
        </div>
    );
}