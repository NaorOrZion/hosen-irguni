import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home.jsx";
import { Quizz2 } from "./pages/Quizz2.jsx";
import FinalPage from "./pages/FinalPage.jsx";

function App() {
  const [score, setScore] = useState([]);
  const [totalScore, setTotalScore] = useState(0);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quizz" element={<Quizz2 {...{score, setScore, totalScore, setTotalScore}} />} />
        <Route path="/final" element={<FinalPage totalScore={totalScore} />} />
      </Routes>
    </Router>
  );
}

export default App;
