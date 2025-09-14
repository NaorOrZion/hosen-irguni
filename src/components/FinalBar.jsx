import "../style/FinalBar.css";
import homeIcon from "../assets/home.svg";
import shareIcon from "../assets/share.svg";
import mockData from "../mockData.json";
import { useAppData } from "../realData";
import greenLightIcon from "../assets/green-light.svg";
import yellowLightIcon from "../assets/yellow-light.svg";
import redLightIcon from "../assets/red-light.svg";


function FinalBar({ score }) {
  const { data } = useAppData(mockData);
  const active = data ?? mockData;
  const greatText = active.greatText;
  const okText = active.okText;
  const badText = active.badText;

  const getLightText = () => {
    if (score >= 85) {
      return greatText;
    } else if (score >= 75) {
      return okText;
    } else {
      return badText;
    }
  };

  const generateShareableImage = async () => {
    try {
      // Get the correct traffic light SVG based on score
      let lightSvgUrl;
      if (score >= 85) lightSvgUrl = greenLightIcon;
      else if (score >= 75) lightSvgUrl = yellowLightIcon;
      else lightSvgUrl = redLightIcon;

      // Fetch the SVG content
      const svgResponse = await fetch(lightSvgUrl);
      const svgText = await svgResponse.text();
      const svgDataUri =
        "data:image/svg+xml;base64," +
        btoa(unescape(encodeURIComponent(svgText)));

      // Create the combined SVG
      const width = 600;
      const height = 800;
      const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <rect width="100%" height="100%" fill="#384d22" rx="40"/>
      <image 
  xlink:href="${svgDataUri}" 
  x="${width / 2 - 220 / 2}" 
  y="80" 
  width="220" 
  preserveAspectRatio="xMidYMid meet"
/>

      <text x="50%" y="60%" text-anchor="middle" font-size="36" font-family="Rubik,Arial,sans-serif" fill="#fff" direction="rtl">${mockData.textBeforeGrade}</text>
      <text x="50%" y="75%" text-anchor="middle" font-size="80" font-family="Rubik,Arial,sans-serif" fill="#fff" direction="rtl" font-weight="bold">${score}</text>
      <text x="50%" y="90%" text-anchor="middle" font-size="36" font-family="Rubik,Arial,sans-serif" fill="#fff" direction="rtl">${getLightText()}</text>
    </svg>
  `;

      // Convert SVG to PNG using canvas
      const blob = await new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);
          canvas.toBlob(resolve, 'image/png', 0.95);
        };
        img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
      });

      return new File([blob], 'חוסן-ארגוני.png', { type: 'image/png' });
    } catch (error) {
      console.error('Error creating shareable image:', error);
      return null;
    }
  };

  const handleShare = async () => {
    const file = await generateShareableImage();
    const url = window.location.href;
    const message = mockData.shareText;

    // Try native share API first
    if (navigator.share && file && navigator.canShare?.({ files: [file] })) {
      try {
        await navigator.share({
          files: [file],
          text: message,
          url
        });
        return;
      } catch (e) {
        if (e.name === "AbortError") return;
      }
    }

    // Try native share without image
    if (navigator.share) {
      try {
        await navigator.share({ text: message, url });
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
      } catch (_) { }
    }

    // Fallbacks
    try {
      await navigator.clipboard.writeText(`${message} ${url}`);
      alert("הטקסט והקישור הועתקו ללוח! אפשר להדביק ולשתף");
      return;
    } catch (_) { }

    // If we have an image, download it before opening WhatsApp
    if (file) {
      try {
        const downloadUrl = URL.createObjectURL(file);
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = "חוסן-ארגוני-ציון.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(downloadUrl);

        // Copy text to clipboard for WhatsApp
        try {
          await navigator.clipboard.writeText(`${message} ${url}`);
        } catch (_) { }

        alert(
          "התמונה הורדה והטקסט הועתק ללוח! פתח את WhatsApp ושתף את התמונה עם הטקסט"
        );
      } catch (_) { }
    }

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
