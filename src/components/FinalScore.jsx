import * as React from 'react';
import "../style/FinalScore.css"
import greenLightIcon from "../assets/green-light.svg";
import yellowLightIcon from "../assets/yellow-light.svg";
import redLightIcon from "../assets/red-light.svg";
import mockData from "../mockData.json";
import { useAppData } from "../realData";

function FinalScore({ score }) {
    const { data } = useAppData(mockData);
    const active = data ?? mockData;
    const greatText = active.greatText;
    const okText = active.okText;
    const badText = active.badText;
    const textBefore = active.textBeforeGrade;

    const getLightIcon = () => {
        if (score >= 85) {
            return greenLightIcon;
        } else if (score >= 75) {
            return yellowLightIcon;
        } else {
            return redLightIcon;
        }
    };

    const getLightText = () => {
        if (score >= 85) {
            return greatText;
        } else if (score >= 75) {
            return okText;
        } else {
            return badText;
        }
    };

    return (
        <div className="final-score">
            <img src={getLightIcon()} alt="score light" style={{ width: "90%" }} className="score-light" />
            <div className="text-box">
                <p className="score-text">{textBefore}</p>
                <p className="score-number">{score}</p>
                <p className="score-text">{getLightText()}</p>
            </div>
        </div>
    );
}

export default FinalScore; 