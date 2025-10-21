import arrowDownGreen from "../assets/arrow-down-green.svg";
import React, { useRef } from "react"; // Import React and useRef
import FinalBar from "../components/FinalBar";
import FinalScore from "../components/FinalScore";
import Footer from "../components/Footer";
import mockData from "../mockData.json";
import { useAppData } from "../realData";
import "../style/Quizz2.css";

import Carousel from "../components/Carousel"; // Keep Carousel import

function FinalContent({ score }) {
  const { data } = useAppData(mockData);
  const shareableContentRef = useRef(null); // Create a ref to hold the DOM element

  return (
    <div className="final-content">
      {/* <div className={"circle circle-move"}></div> */}
      <div ref={shareableContentRef}> {/* Wrap the desired content with the ref */}
        <div className="greenBackground">
          <FinalBar score={score} shareableContentRef={shareableContentRef} /> {/* Pass the ref to FinalBar */}
          <FinalScore score={score} />
        </div>
        <div className="break">
          <p className="break-text">{(data ?? mockData).FinalPageMiniText}</p>
          <img src={arrowDownGreen} alt="arrow-down" className="arrow-down" />
        </div>
      </div>
      <Carousel />
      <Footer />
    </div>
  );
}

export default FinalContent;
