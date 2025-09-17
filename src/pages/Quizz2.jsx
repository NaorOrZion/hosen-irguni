import "../style/Quizz2.css"
import QuizzData from "../components/QuizzData";
import FinalContent from "../components/FinalContent";
import mockData from "../mockData.json";
import { useAppData } from "../realData";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Quizz2 = ({ score, setScore, totalScore, setTotalScore }) => {

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [isCarSeen, setIsCarSeen] = useState(false);
    const { data, loading, error } = useAppData(mockData);
    const activeData = (data && Array.isArray(data.questions)) ? data : (Array.isArray(mockData?.questions) ? mockData : { questions: [] });
    const questionsLength = activeData.questions.length;
    const isDone = currentQuestion >= questionsLength;
    const navigate = useNavigate();

    useEffect(() => {
        if (isDone) {
            setTotalScore(score.reduce((accumulator, currentValue) => accumulator + currentValue, 0));
            navigate("/final");
        }
    }, [isDone, score]);

    // Back button logic
    const handleBack = () => {
        if (!isCarSeen) {
            navigate("/"); // Go to home page
        } else if (currentQuestion === 0) {
            setIsCarSeen(false); // Show car illustration
        } else {
            setCurrentQuestion(prev => prev - 1); // Go back one question
            setScore(prev => prev.slice(0, -1)); // Remove last score
        }
    };

    return (
        <div className="quizz-page">
            <div className={`small-circle ${isDone ? 'move-left' : ''}`}></div>

            {isDone ? (
                <FinalContent score={totalScore} />
            ) : (
                <QuizzData
                    {...{
                        currentQuestion,
                        setCurrentQuestion,
                        questionsLength,
                        mockData: activeData,
                        setScore,
                        isCarSeen,
                        setIsCarSeen,
                        score,
                        handleBack,
                        isDone,
                    }}
                />
            )}
        </div>
    );
}