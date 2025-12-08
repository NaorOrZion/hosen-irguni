import { useState } from "react";
import { useNavigate } from "react-router-dom";
import hosenLogo from "../assets/LOGO.svg";
import akaLogo from "../assets/Logo-aka.png";
import mmdaLogo from "../assets/mmda.png";
import "../style/Home.css";
import mockData from "../mockData.json";
import Skeleton from "@mui/material/Skeleton";
import { useAppData } from "../realData";

function Home() {
  const navigate = useNavigate();
  const { data, error, loading } = useAppData(mockData);

  console.log("Home data:", data);

  return (
    <div className="home-page">
      <div className="side-logos-right">
        <img src={mmdaLogo} className="side-logo" alt="Hosen irguni logo" width="51px"/>
      </div>
      <div className="side-logos-left">
        <img src={akaLogo} className="side-logo" alt="Hosen irguni logo" width="51px"/>
      </div>
      <div className="upper-container">
        <img src={hosenLogo} className="logo" alt="Hosen irguni logo" />
        <div className="headline-container">
          <h1 className="heading-h1">
            {loading ? (
              <Skeleton
                variant="rounded"
                animation="wave"
                sx={{ marginTop: 1 }}
                width={270}
                height={90}
              />
            ) : (
              (data ?? mockData).mainAppTitle
            )}
          </h1>
          <h1 className="heading-h1">
            {loading ? (
              <Skeleton
                variant="rounded"
                animation="wave"
                sx={{ marginTop: 1, }}
                width={270}
                height={90}
              />
            ) : (
              (data ?? mockData).mainAppTitleSec
            )}
          </h1>
          <p
            className="subheading-p"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {loading ? (
              <>
                <Skeleton
                  variant="rounded"
                  animation="wave"
                  width={270}
                  height={20}
                  sx={{ marginBottom: 1 }}
                />
                <Skeleton
                  variant="rounded"
                  animation="wave"
                  width={200}
                  height={20}
                />
              </>
            ) : (
              (data ?? mockData).mainAppSubheading
            )}
          </p>
        </div>
        <span className="white-circle"></span>
      </div>
      <span className="deep-green-circle"></span>
      <button
        className="button-hosen"
        onClick={() => navigate("/quizz")}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          alignContent:"center",
        }}
      >
        {loading ? (
          <Skeleton
            variant="rounded"
            animation="wave"
            sx={{ marginTop: 1 }}
            width={150}
            height={25}
          />
        ) : (
          (data ?? mockData).buttonTextHome
        )}
      </button>
    </div>
  );
}

export default Home;
