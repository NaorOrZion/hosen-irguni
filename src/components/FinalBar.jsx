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

  // Assuming you have a variable for the bottom Call to Action text
  const bottomCtaText = active.footerCtaText || "בואו ובדקו את החוסן בארגון שלכם בעזרת מבחן קצר >>";

  const getLightText = () => {
    if (score >= 85) return greatText;
    else if (score >= 75) return okText;
    else return badText;
  };

  const generateShareableImage = async () => {
    try {
      // 1. Determine which icon and color to use
      let lightSvgUrl;
      let scoreColor; 

      if (score >= 85) {
        lightSvgUrl = greenLightIcon;
        scoreColor = "#28C624"; // Green
      } else if (score >= 75) {
        lightSvgUrl = yellowLightIcon;
        scoreColor = "#FFD81A"; // Yellow
      } else {
        lightSvgUrl = redLightIcon;
        scoreColor = "#E81818"; // Red
      }

      // 2. Fetch the Icon
      const svgResponse = await fetch(lightSvgUrl);
      const svgText = await svgResponse.text();
      // Ensure correct base64 encoding for external SVGs
      const svgBase64 = btoa(unescape(encodeURIComponent(svgText))); 
      const svgDataUri = `data:image/svg+xml;base64,${svgBase64}`;

      // 3. Setup Canvas Dimensions
      const width = 600;
      const height = 900; 
      
      const escapeXml = (str) =>
        String(str)
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#39;");

      const wrapText = (text, maxChars) => {
        const words = text.split(/\s+/);
        const lines = [];
        let line = "";
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

      // Prepare Bottom CTA Text (Wrapped)
      const ctaLines = wrapText(bottomCtaText, 25); 
      const ctaTspans = ctaLines
        .map((ln, i) => `<tspan x="300" dy="${i === 0 ? "0" : "1.3em"}">${escapeXml(ln)}</tspan>`)
        .join("");

      // 5. Build the SVG Template to match the photo
      const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
          <defs>
            <linearGradient id="bgGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style="stop-color:#6C8E4E;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#506B33;stop-opacity:1" />
            </linearGradient>
            
            <filter id="textShadow">
              <feDropShadow dx="1" dy="2" stdDeviation="2" flood-color="#000000" flood-opacity="0.3"/>
            </filter>
          </defs>

          <rect width="100%" height="100%" fill="url(#bgGradient)" />
          
          <image href="${svgDataUri}" x="200" y="100" width="200" height="200" />

          <text x="300" y="450" text-anchor="middle" font-size="36" font-family="Rubik, sans-serif" fill="#e2e8f0" direction="rtl" font-weight="500" style="filter:url(#textShadow);">
            ${escapeXml(mockData.textBeforeGrade || "ניקוד סופי:")}
          </text>

          <text x="300" y="590" text-anchor="middle" font-size="130" font-family="Rubik, sans-serif" fill="${scoreColor}" font-weight="900" style="filter:url(#textShadow);">
            ${score}
          </text>

          <text x="300" y="670" text-anchor="middle" font-size="24" font-family="Rubik, sans-serif" fill="#ffffff" font-weight="400" direction="rtl">
            ${escapeXml(getLightText())}
          </text>

        </svg>
      `;

      // 6. Convert SVG to PNG
      const blob = await new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);
          canvas.toBlob(resolve, 'image/png', 1.0);
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
          title: "חוסן ארגוני",
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

        alert("התמונה הורדה והטקסט הועתק ללוח! ניתן לשתף בוואטסאפ.");
        
        // Also try to open WhatsApp with the text message
        window.open(
          `https://wa.me/?text=${encodeURIComponent(`${message} ${url}`)}`,
          "_blank"
        );
        return;
      } catch (_) { }
    }

    // Final Fallback (Clipboard + WhatsApp)
    try {
      await navigator.clipboard.writeText(`${message} ${url}`);
      alert("הטקסט והקישור הועתקו ללוח! אפשר להדביק ולשתף");
      window.open(
        `https://wa.me/?text=${encodeURIComponent(`${message} ${url}`)}`,
        "_blank"
      );
      return;
    } catch (_) { }
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