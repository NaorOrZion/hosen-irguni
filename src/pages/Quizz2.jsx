import "../style/Quizz2.css"
import QuizzData from "../components/QuizzData";
import FinalContent from "../components/FinalContent";
import mockData from "../mockData.json";
import { useState, useEffect, use } from "react";

export const Quizz2 = () => {
    const [score, setScore] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const questionsLength = mockData.questions.length;
    const isDone = currentQuestion >= questionsLength;

    useEffect(() => {
        if (isDone) {
            const totalScore = mockData.questions.reduce(
                (acc, question) => acc + Number(question?.score ?? 0),
                0
            );
            setScore(totalScore);
        }
    }, [isDone, questionsLength]);

    return (
        <div className="quizz-page">
            <div className={`small-circle ${isDone ? 'move-left' : ''}`}></div>
            <div className={`circle ${isDone ? 'circle-move' : ''}`}></div>
            {isDone ? (
                <FinalContent score={score} />
            ) : (
                <QuizzData
                    {...{
                        currentQuestion,
                        setCurrentQuestion,
                        questionsLength,
                        mockData,
                        setScore,
                    }}
                />
            )}
        </div>

    );
}