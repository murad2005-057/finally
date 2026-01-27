import React, { useContext } from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { LanguageContext } from '../../i18n/LanguageProvider'

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <h1>{useContext(LanguageContext).t("brand")}</h1>

          <div className="footer-social-icons">
            <a href="https://www.facebook.com/Arsenal/" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="icon facebook" size={25} />
            </a>
            <a href="https://www.instagram.com/arsenal/" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="icon instagram" size={25} />
            </a>
            <a href="https://www.youtube.com/@arsenal" target="_blank" rel="noopener noreferrer">
              <FaYoutube className="icon youtube" size={25} />
            </a>
          </div>
        </div>

        <div className="footer-content-right">
          <h2>{useContext(LanguageContext).t("footer.getInTouch")}</h2>
          <ul>
            <li>+1-212-456-7890</li>
            <li>contact@arsenal-restaurant.com</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
