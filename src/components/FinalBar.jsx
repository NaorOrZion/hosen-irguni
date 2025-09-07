import "../style/FinalBar.css";
import homeIcon from "../assets/home.svg";
import shareIcon from "../assets/share.svg";
import mockData from "../mockData.json";
import { useAppData } from "../realData";
// Removed html2canvas – generating a simple, reliable share image via Canvas instead

function FinalBar({ score }) {
  const { data } = useAppData(mockData);
  const handleShare = async () => {
    const title = document.title || "מדור חוסן ארגוני";
    const url = window.location.href;
    const message = mockData.shareText;

    // Helper: generate a simple OpenGraph-like image with the score
    const generateShareImage = async () => {
      try {
        const width = 1200; // good preview size
        const height = 630;
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return null;

        // Background
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, width, height);

        // Green header bar
        ctx.fillStyle = "#384D22";
        ctx.fillRect(0, 0, width, 180);

        // Title text
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 64px system-ui, -apple-system, Segoe UI, Roboto, Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("חוסן ארגוני", width / 2, 90);

        // Score box
        ctx.fillStyle = "#506B33";
        const boxWidth = width - 200;
        const boxHeight = 260;
        const boxX = 100;
        const boxY = 240;
        ctx.fillRect(boxX, boxY, boxWidth, boxHeight);

        // Score text
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 80px system-ui, -apple-system, Segoe UI, Roboto, Arial";
        ctx.fillText(`הציון שלי: ${Math.round(Number(score) || 0)}`, width / 2, boxY + boxHeight / 2);

        // Footer text
        ctx.fillStyle = "#384D22";
        ctx.font = "400 36px system-ui, -apple-system, Segoe UI, Roboto, Arial";
        ctx.fillText(title, width / 2, height - 60);

        const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png", 0.92));
        if (!blob) return null;
        return new File([blob], "share.png", { type: "image/png" });
      } catch (_) {
        return null;
      }
    };

    // Generate the image first
    const file = await generateShareImage();
    
    // Try native share with image first (most important)
    if (navigator.share && file && navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({ title, text: message, url, files: [file] });
        return;
      } catch (e) {
        if (e && e.name === "AbortError") return;
        // If image sharing fails, try without image
        try {
          await navigator.share({ title, text: message, url });
          return;
        } catch (e2) {
          if (e2 && e2.name === "AbortError") return;
        }
      }
    }

    // Try native share without image
    if (navigator.share) {
      try {
        await navigator.share({ title, text: message, url });
        return;
      } catch (e) {
        if (e && e.name === "AbortError") return;
      }
    }

    // If we have an image but can't share it natively, offer download
    if (file) {
      try {
        // Create download link
        const downloadUrl = URL.createObjectURL(file);
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = "חוסן-ארגוני-ציון.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(downloadUrl);
        
        // Also copy text to clipboard
        await navigator.clipboard.writeText(`${message} ${url}`);
        alert("התמונה הורדה והטקסט הועתק ללוח! אפשר לשתף את התמונה עם הטקסט");
        return;
      } catch (_) {}
    }

    // Fallbacks
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
