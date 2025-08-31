import "../style/FinalBar.css"
import homeIcon from "../assets/home.svg";
import shareIcon from "../assets/share.svg";

function FinalBar() {
  return (
    <div className="final-bar">
      <div className="backhome">
        <a href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", color: "#ffffff" }}>
          <p className="backhome-text">לעמוד הראשי</p>
          <img src={homeIcon} alt="home button" className="home-icon" />
        </a>
      </div>
      <img src={shareIcon} alt="share button" className="share-icon" />
    </div>
  );
}

export default FinalBar;