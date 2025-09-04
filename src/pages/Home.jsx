import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import hosenLogo from '../assets/LOGO.svg'
import '../style/Home.css'
import mockData from "../mockData.json"
import { useAppData } from "../realData";

function Home() {
  const navigate = useNavigate()
  const { data } = useAppData(mockData);

  return (
    <div className="home-page">
      <div className="logos">
        <img src={hosenLogo} className="logo" alt="Hosen irguni logo" />
      </div>
      <div className="headline-container">
        <h1 className="heading-h1">{(data ?? mockData).mainAppTitle}</h1>
        <p className="subheading-p">
        {(data ?? mockData).mainAppSubheading}
        </p>
      </div>
      <div className="button-placement">
        <button className="button-hosen" onClick={() => navigate('/quizz')}>
        {(data ?? mockData).buttonTextHome}
        </button>
      </div>
      <span className="white-circle"></span>
      <span className="deep-green-circle"></span>
    </div>
  )
}

export default Home