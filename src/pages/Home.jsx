import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import hosenLogo from '../assets/LOGO.svg'
import '../style/Home.css'

function Home() {
  const [count, setCount] = useState(0)
  const navigate = useNavigate()

  return (
    <>
      <div className="logos">
        <img src={hosenLogo} className="logo" alt="Hosen irguni logo" />
      </div>
      <div className="headline-container">
        <h1 className="heading-h1">המבחן האולטימטיבי לחוסן ארגוני</h1>
        <p className="subheading-p">
          גלו האם אתם מיישמים את
          עקרונות החוסן הארגוני
          ביחידה שלכם
        </p>
      </div>
      <div className="card">
        <button className="button-hosen" onClick={() => navigate('/quizz')}>
          להתחלת המבחן
        </button>
      </div>
      <span className="white-circle"></span>
      <span className="deep-green-circle"></span>
    </>
  )
}

export default Home