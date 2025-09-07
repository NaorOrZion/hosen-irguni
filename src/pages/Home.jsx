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
      <div className="upper-container">
          <img src={hosenLogo} className="logo" alt="Hosen irguni logo" />
          <div className="headline-container">
            <h1 className="heading-h1">{(data ?? mockData).mainAppTitle}</h1>
            <p className="subheading-p">
            {(data ?? mockData).mainAppSubheading}
            </p>
          </div>
          <span className="white-circle"></span>
      </div>
      <span className="deep-green-circle"></span>
      <button className="button-hosen" onClick={() => navigate('/quizz')}>
      {(data ?? mockData).buttonTextHome}
      </button>
    </div>
  )
}

export default Home