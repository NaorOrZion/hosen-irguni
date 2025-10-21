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
      const svgDataUri = `data:image/svg+xml;base64,${btoa(svgText)}`;

      // Create the combined SVG
      const width = 600;
      const height = 800;

      // Prefer live share text if provided, otherwise fallback to mock data
      const shareText = (active && active.shareText) || mockData.shareText || '';

      // Simple XML escape for embedding text into the SVG
      const escapeXml = (str) =>
        String(str)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#39;');

      // Wrap text into approximate-length lines so we can render using <tspan>
      const wrapText = (text, maxChars) => {
        const words = text.split(/\s+/);
        const lines = [];
        let line = '';
        for (const w of words) {
          if (!line) line = w;
          else if ((line + ' ' + w).length <= maxChars) line = line + ' ' + w;
          else {
            lines.push(line);
            line = w;
          }
        }
        if (line) lines.push(line);
        return lines;
      };

      const shareLines = wrapText(shareText, 26).slice(0, 6); // limit lines to avoid overflow
      const tspans = shareLines
        .map((ln, i) => `<tspan x="50%" dy="${i === 0 ? '0' : '1.25em'}">${escapeXml(ln)}</tspan>`)
        .join('');

      const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <rect width="100%" height="100%" fill="#384d22" rx="40"/>

      <text x="50%" y="18%" text-anchor="middle" font-size="28" font-family="Rubik,Arial,sans-serif" fill="#fff" direction="rtl">${escapeXml(mockData.textBeforeGrade)}</text>
      <text x="50%" y="40%" text-anchor="middle" font-size="84" font-family="Rubik,Arial,sans-serif" fill="#fff" direction="rtl" font-weight="bold">${score}</text>
      <text x="50%" y="56%" text-anchor="middle" font-size="30" font-family="Rubik,Arial,sans-serif" fill="#fff" direction="rtl">${escapeXml(getLightText())}</text>

      <!-- embedded share text so apps that drop shared text still show it in the image -->
      <text x="50%" y="70%" text-anchor="middle" font-size="20" font-family="Rubik,Arial,sans-serif" fill="#fff" direction="rtl">
        ${shareText}
      </text>

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
    const url = "https://hosen-irguni.vercel.app";
    const message = (active && active.shareText) || mockData.shareText || '';

    // Copy message+url to clipboard as a fallback for platforms that strip shared text
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(`${message} ${url}`);
      }
    } catch (err) {
      console.warn('clipboard write before share failed', err);
    }

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
