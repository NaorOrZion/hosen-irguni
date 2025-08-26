import { useState } from 'react'
import hosenLogo from './assets/LOGO.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

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
        <button className="button-hosen" onClick={() => setCount((count) => count + 1)}>
          להתחלת המבחן
        </button>
      </div>
      <span class="white-circle"></span>
      <span class="deep-green-circle"></span>
    </>
  )
}

export default App
