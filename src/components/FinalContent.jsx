import arrowDownGreen from "../assets/arrow-down-green.svg";
import Carousel from "../components/Carousel";
import FinalBar from "../components/FinalBar";
import FinalScore from "../components/FinalScore";
import WhatsAppButton from "../components/WhatsappButton";
import mockData from "../mockData.json";
import { useAppData } from "../realData";
import "../style/Quizz2.css"

function FinalContent({ score }) {
    const { data } = useAppData(mockData);
    return (
        <div className="final-content">
            <div className={"circle circle-move"}></div>
            <FinalBar score={score} />
            <FinalScore score={score} />
            <div className="break">
                <p className="break-text">{(data ?? mockData).FinalPageMiniText}</p>
                <img src={arrowDownGreen} alt="arrow-down" className="arrow-down" />
            </div>
            <Carousel />
            <WhatsAppButton />
        </div>)
}

export default FinalContent;