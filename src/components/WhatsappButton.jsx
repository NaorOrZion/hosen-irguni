import React from "react";
import whatsappIcon from "../assets/whatsapp-icon.svg";
import mockData from "../mockData.json";
import { useAppData } from "../realData";

function WhatsAppButton() {
  const { data } = useAppData(mockData);
  const phoneNumber = (data ?? mockData).phoneNumber;
  const message = (data ?? mockData).whatsappText;
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: "fixed",
        bottom: 20,
        right: 20,
        backgroundColor: "#384D22",
        color: "#fff",
        borderRadius: "10px",
        minWidth: 60,
        padding: 10,
        gap: 10,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        textDecoration: "none",
        boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
      }}
      title="דברו איתנו בוואטסאפ"
    >
      <p style={{ margin: 0, fontSize: 12, fontWeight: 600 }}>חוסן ארגוני</p>
      <img src={whatsappIcon} alt="WhatsApp" style={{ width: 20, height: 20 }} />
    </a>
  );
}

export default WhatsAppButton;