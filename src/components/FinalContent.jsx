import arrowDownGreen from "../assets/arrow-down-green.svg";
import Carousel from "../components/Carousel";
import FinalBar from "../components/FinalBar";
import FinalScore from "../components/FinalScore";

function FinalContent({ score }) {
    return (
        <div className="final-content">
            <FinalBar />
            <FinalScore score={score} />
            <div className="break">
                <p className="break-text">מה זה אומר עליי?</p>
                <img src={arrowDownGreen} alt="arrow-down" className="arrow-down" />
            </div>
            <Carousel />
        </div>)
}

export default FinalContent;