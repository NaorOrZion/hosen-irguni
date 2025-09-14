import React from "react";
import whatsappIcon from "../assets/whatsapp-icon.svg";
import mockData from "../mockData.json";
import { useAppData } from "../realData";
import "../style/Footer.css";

function Footer() {
    const { data } = useAppData(mockData);
    const phoneNumber = (data ?? mockData).phoneNumber;
    const message = (data ?? mockData).whatsappText;
    const whatsappButtonText = (data ?? mockData).whatsappButtonText;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <footer className="site-footer">
            <a
                className="footer-whatsapp"
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                title="דברו איתנו בוואטסאפ"
            >
                <img src={whatsappIcon} alt="WhatsApp" className="footer-whatsapp-icon" />
                <span className="footer-whatsapp-text">{(data ?? mockData).whatsappButtonText}</span>
            </a>
            {/* <span className="footer-made-by">דברו איתנו בווצאפ</span> */}
        </footer>
    );
}

export default Footer;


