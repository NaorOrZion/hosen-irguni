import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home.jsx'; // Assuming you have a Home component
import Quizz from './pages/quizz.jsx'; // Assuming you have an About component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quizz" element={<Quizz />} />
      </Routes>
    </Router>
  );
}

export default App;