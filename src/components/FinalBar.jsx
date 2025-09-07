import "../style/FinalBar.css";
import homeIcon from "../assets/home.svg";
import shareIcon from "../assets/share.svg";
import mockData from "../mockData.json";
import { useAppData } from "../realData";
import html2canvas from "html2canvas";

function FinalBar({ score }) {
  const { data } = useAppData(mockData);
  const handleShare = async () => {
    const title = document.title || "מדור חוסן ארגוני";
    const url = window.location.href;
    const message = mockData.shareText;

    try {
      // Try to capture screenshot
      let file = null;
      try {
        const previousScrollY = window.scrollY || window.pageYOffset || 0;
        // Ensure web fonts are fully loaded before capture
        if (document.fonts && typeof document.fonts.ready?.then === "function") {
          try { await document.fonts.ready; } catch (_) {}
        }
        window.scrollTo(0, 0);
        await new Promise((resolve) => requestAnimationFrame(resolve));
        const target = document.documentElement; // capture full page
        const width = target.scrollWidth;
        const height = target.scrollHeight;
        const canvas = await html2canvas(target, {
          useCORS: true,
          allowTaint: true,
          backgroundColor: "#ffffff",
          windowWidth: width,
          windowHeight: height,
          width,
          height,
          scrollX: 0,
          scrollY: 0,
          scale: Math.min(2, window.devicePixelRatio || 1),
          letterRendering: true,
          foreignObjectRendering: true,
          onclone: async (clonedDoc) => {
            // Wait for fonts in the cloned document as well
            try {
              if (clonedDoc.fonts && typeof clonedDoc.fonts.ready?.then === "function") {
                await clonedDoc.fonts.ready;
              }
            } catch (_) {}
          },
        });
        window.scrollTo(0, previousScrollY);
        const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png", 0.92));
        if (blob) {
          file = new File([blob], "screenshot.png", { type: "image/png" });
        }
      } catch (_) {}

      if (navigator.share) {
        try {
          if (file && navigator.canShare && navigator.canShare({ files: [file] })) {
            await navigator.share({ title, text: message, url, files: [file] });
            return;
          }
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
