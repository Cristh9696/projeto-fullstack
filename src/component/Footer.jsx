import React from "react";
import "../assets/css/Footer.css";
import { FaFacebook } from "react-icons/fa";
import { FaSquareTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">
        <div className="social-media">
        <FaFacebook className="facebook"/>
        <FaSquareTwitter className="twitter"/>
        <FaInstagram className="instagram"/>
        <FaWhatsapp className="whatsapp"/>
        </div>
      
    </footer>
  );
}

export default Footer;