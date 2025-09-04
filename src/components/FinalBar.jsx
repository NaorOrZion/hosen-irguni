import "../style/FinalBar.css";
import homeIcon from "../assets/home.svg";
import shareIcon from "../assets/share.svg";
import mockData from "../mockData.json";
import { useAppData } from "../realData";

function FinalBar({ score }) {
  const { data } = useAppData(mockData);
  const handleShare = async () => {
    const title = document.title || "מדור חוסן ארגוני";
    const url = window.location.href;
    const message = `קיבלתי ציון של ${score} במבחן חוסן ארגוני! בואו ובדקו את החוסן בארגון שלכם בעזרת מבחן קצר.`;

    try {
      if (navigator.share) {
        try {
          await navigator.share({ title, text: message, url });
          return;
        } catch (e1) {
          if (e1 && e1.name === "AbortError") return;
          try {
            await navigator.share({ text: `${message} ${url}` });
            return;
          } catch (e2) {
            if (e2 && e2.name === "AbortError") return;
          }
        }
      }
    } catch (_) {}

    try {
      await navigator.clipboard.writeText(`${message} ${url}`);
      alert("הטקסט והקישור הועתקו ללוח! אפשר להדביק ולשתף");
      return;
    } catch (_) {}

    window.open(
      `https://wa.me/?text=${encodeURIComponent(`${message} ${url}`)}`,
      "_blank"
    );
  };

  return (
    <div className="final-bar">
      <div className="backhome">
        <a
          href="/"
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            color: "#ffffff",
          }}
        >
          <p className="backhome-text">{(data ?? mockData).backHomeText}</p>
          <img src={homeIcon} alt="home button" className="home-icon" />
        </a>
      </div>
      <img
        src={shareIcon}
        alt="share button"
        className="share-icon"
        onClick={handleShare}
        style={{ cursor: "pointer" }}
      />
    </div>
  );
}

export default FinalBar;
