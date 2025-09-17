
import "../style/Quizz.css";
import FinalContent from "../components/FinalContent";

function FinalPage({ totalScore }) {
    return (
        <>
            <FinalContent score={totalScore} />
        </>
    );
}

export default FinalPage;