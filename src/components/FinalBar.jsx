import html2canvas from "html2canvas";
import "../style/FinalBar.css";
import homeIcon from "../assets/home.svg";
import shareIcon from "../assets/share.svg";
import mockData from "../mockData.json";
import { useAppData } from "../realData";

function FinalBar({ score, shareableContentRef }) { // Accept the shareableContentRef prop
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
      // Wait for 1 second for any animations to complete before taking the screenshot
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (!shareableContentRef.current) {
        console.error('Shareable content element not found for screenshot.');
        return null;
      }

      const canvas = await html2canvas(shareableContentRef.current, { // Use the ref's current element as the target
        useCORS: true,
        scale: 2, // Higher scale for better quality
      });
      const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png', 0.9));
      return new File([blob], 'hosen-irguni-screenshot.png', { type: 'image/png' });
    } catch (error) {
      console.error('Error creating shareable image:', error);
      return null;
    }
  };

  const handleShare = async () => {
    const url = "https://hosen-irguni.vercel.app";
    const message = (active && active.shareText) || mockData.shareText || '';
    const file = await generateShareableImage();

    // Try native Web Share API with the image
    if (navigator.share && file && navigator.canShare?.({ files: [file] })) {
      try {
        await navigator.share({
          files: [file],
          text: message,
          url
        });
        return;
      } catch (error) {
        if (error.name === "AbortError") {
          return; // User cancelled the share
        }
        console.error("Error sharing with image:", error);
      }
    }

    // Fallback for WhatsApp
    window.open(
      `https://wa.me/?text=${encodeURIComponent(`${message} ${url}`)}`,
      "_blank"
    );

    // Inform user to share the downloaded image on desktop
    if (file && !navigator.share) {
      alert("כדי לשתף את התמונה, אנא שמור אותה ושתף אותה ישירות ב-WhatsApp.");
    }
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
