import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import { assets } from "../../assets/assets";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { LanguageContext } from '../../i18n/LanguageProvider'

const Footer = () => {
  const { t } = useContext(LanguageContext);

  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <h1 className="footer-logo">{t("brand")}</h1>
          <p className="footer-desc">
            {t("header.subtitle")}
          </p>
          <div className="footer-social-icons">
            <a href="https://www.facebook.com/Arsenal/" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="icon facebook" />
            </a>
            <a href="https://www.instagram.com/arsenal/" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="icon instagram" />
            </a>
            <a href="https://www.youtube.com/@arsenal" target="_blank" rel="noopener noreferrer">
              <FaYoutube className="icon youtube" />
            </a>
          </div>
        </div>

        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <Link to="/"><li>Home</li></Link>
            <Link to="/about"><li>About us</li></Link>
            <Link to="/delivery"><li>Delivery</li></Link>
            <Link to="/privacy"><li>Privacy policy</li></Link>
          </ul>
        </div>

        <div className="footer-content-right">
          <h2>{t("footer.getInTouch")}</h2>
          <ul>
            <li>+1-212-456-7890</li>
            <li>contact@arsenal-restaurant.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright 2026 © Arsenal-Restaurant.com - All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
