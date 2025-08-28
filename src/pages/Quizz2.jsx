import "../style/Quizz2.css"
import circle from "../assets/circle.svg"
import fullCircle from "../assets/full-circle.svg"
import ProgressBar from "../components/ProgressBar";
import arrowBack from "../assets/arrow-back.svg";
import AnswerButtons from "../components/AnswerButtons";

export const Quizz2 = () => {
    return (
        <div className="quizz-page">
            <div className="upper-section">
                {/* <img src={fullCircle} alt="" className="circle" /> */}
                <div className="circle"></div>
                <div className="content-container">
                    <div>
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
                <div className="answers-fade" />
                <div className="answers-scroll">
                    <AnswerButtons />
                    <button className="button-hosen" style={{ marginBottom: "3rem" }} onClick={() => navigate("/quizz")}>
                        להתחלת המבחן
                    </button>
                </div>
            </div>
        </div>
    );
}