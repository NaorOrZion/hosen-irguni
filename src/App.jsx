import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home.jsx'; // Assuming you have a Home component

import { Quizz2 } from './pages/Quizz2.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quizz" element={<Quizz2 />} />
      </Routes>
    </Router>
  );
}

export default App;