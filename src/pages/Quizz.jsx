import { useState } from 'react';
import arrowBack from '../assets/arrow-back.svg';
// import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/Quizz.css';

function Quizz() {
    return (
        <>
            <div className="quizz-page">
                <div className="quizz-container">
                <div className="row">
                    <div className="col">
                        One of three columns
                    </div>
                    <div className="col">
                    One of three columns
                    </div>
                    <div className="col">
                    One of three columns
                    </div>
                </div>
                    <div className="actions-bar">
                        <p className="question-number">1/5</p>
                        <img src={arrowBack} alt="arrow-back" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Quizz