import * as React from 'react';
import "../style/FinalScore.css"
import greenLightIcon from "../assets/green-light.svg";
import yellowLightIcon from "../assets/yellow-light.svg";
import redLightIcon from "../assets/red-light.svg";

function FinalScore({ score }) {
    const greatText = "אתה בכיוון הנכון, הצוות איתך, המשך כך!";
    const okText = "שווה לעצור לתדלוק – יש מה לשפר...";
    const badText = "עצור! כנס למוסך מהר אתה חייב תחזוקה במיידי";
    // const badText = "עצור! כנס למוסך מהר אתה חייב תחזוקה במיידי";
    const textBefore = "ניקוד סופי:";

    const getLightIcon = () => {
        if (score >= 80) {
            return greenLightIcon;
        } else if (score >= 50) {
            return yellowLightIcon;
        } else {
            return redLightIcon;
        }
    };

    const getLightText = () => {
        if (score >= 80) {
            return greatText;
        } else if (score >= 50) {
            return okText;
        } else {
            return badText;
        }
    };

    return (
        <div className="final-score">
            <img src={getLightIcon()} alt="score light" className="score-light" />
            <div className="text-box">
                <p className="score-text">{textBefore}</p>
                <p className="score-number">{score}</p>
                <p className="score-text">{getLightText()}</p>
            </div>
        </div>
    );
}

export default FinalScore; 