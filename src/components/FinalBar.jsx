import "../style/FinalBar.css";
import homeIcon from "../assets/home.svg";
import shareIcon from "../assets/share.svg";
import mockData from "../mockData.json";
import { useAppData } from "../realData";
import html2canvas from "html2canvas";

function FinalBar({ score }) {
  const { data } = useAppData(mockData);

  const generateWebpageScreenshot = async () => {
    try {
      // Wait for any CSS animations to complete (especially FinalScore fade-in)
      await new Promise((resolve) => setTimeout(resolve, 1200));

      // Shrink the SVG before screenshot
      const scoreLight = document.querySelector('.score-light');
      let originalWidth = null;
      if (scoreLight) {
        originalWidth = scoreLight.style.width;
        scoreLight.style.width = '7rem';
      }

      // Force all elements to be fully visible before screenshot
      const allElements = document.querySelectorAll("*");
      const originalStyles = new Map();
      allElements.forEach((el) => {
        const computedStyle = window.getComputedStyle(el);
        if (
          computedStyle.opacity !== "1" ||
          computedStyle.transform !== "none"
        ) {
          originalStyles.set(el, {
            opacity: el.style.opacity,
            transform: el.style.transform,
            animation: el.style.animation,
          });
          el.style.opacity = "1";
          el.style.transform = "none";
          el.style.animation = "none";
        }
      });

      // Capture the entire page
      const canvas = await html2canvas(document.body, {
        allowTaint: true,
        useCORS: true,
        scale: 1,
        backgroundColor: "#73944f",
        logging: false,
        width: document.body.scrollWidth,
        height: document.body.scrollHeight,
      });

      // Restore original styles
      originalStyles.forEach((styles, el) => {
        el.style.opacity = styles.opacity;
        el.style.transform = styles.transform;
        el.style.animation = styles.animation;
      });

      // Restore SVG width
      if (scoreLight) {
        scoreLight.style.width = originalWidth || '';
      }

      // Convert to blob
      const blob = await new Promise((resolve) => {
        canvas.toBlob(resolve, "image/png", 0.9);
      });

      if (blob) {
        return new File([blob], "חוסן-ארגוני-צילום-מסך.png", {
          type: "image/png",
        });
      }
      return null;
    } catch (error) {
      console.error("Error taking screenshot:", error);
      return null;
    }
  };

  const handleShare = async () => {
    const title = document.title || "מדור חוסן ארגוני";
    const url = window.location.href;
    const message = mockData.shareText;

    // Generate the webpage screenshot
    const file = await generateWebpageScreenshot();

    // Try native share with image first (most important)
    if (
      navigator.share &&
      file &&
      navigator.canShare &&
      navigator.canShare({ files: [file] })
    ) {
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
