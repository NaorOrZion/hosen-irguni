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
      title="דברו איתנו בוואטסאפ"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        color: "inherit",
        textDecoration: "none"
      }}
    >
      <img src={whatsappIcon} alt="WhatsApp" style={{ width: 20, height: 20 }} />
      <span style={{ fontSize: 12, fontWeight: 600 }}>חוסן ארגוני</span>
    </a>
  );
}

export default WhatsAppButton;