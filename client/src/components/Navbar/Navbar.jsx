import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { StoreContext } from "../../conText/StoreContext";
import { LanguageContext } from "../../i18n/LanguageProvider";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getTotalCartAmount } = useContext(StoreContext);
  const { language, setLanguage, t } = useContext(LanguageContext);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div className="navbar">
      <Link to="/" className="logo">
        {t("brand")}
      </Link>

      {/* Burger İkonu - Mobildə hər şeyi bu idarə edəcək */}
      <div className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <div className={isMenuOpen ? "line open" : "line"}></div>
        <div className={isMenuOpen ? "line open" : "line"}></div>
        <div className={isMenuOpen ? "line open" : "line"}></div>
      </div>

      {isMenuOpen && <div className="nav-overlay" onClick={closeMenu}></div>}

      <ul className={`navbar-menu ${isMenuOpen ? "mobile-visible" : ""}`}>
        <Link to="/" onClick={() => { setMenu("home"); closeMenu(); }} className={menu === "home" ? "active" : ""}>{t("home")}</Link>
        <a href="#explore-menu" onClick={() => { setMenu("menu"); closeMenu(); }} className={menu === "menu" ? "active" : ""}>{t("menu")}</a>
        <a href="#app-download" onClick={() => { setMenu("mobile-app"); closeMenu(); }} className={menu === "mobile-app" ? "active" : ""}>{t("mobileApp")}</a>
        <a href="#footer" onClick={() => { setMenu("contact-us"); closeMenu(); }} className={menu === "contact-us" ? "active" : ""}>{t("contactUs")}</a>

        {/* Mobildə Səbət Menyuda Görünsün */}
        <li className="mobile-only-cart">
          <Link to="/cart" onClick={closeMenu} className="mobile-cart-link">
            {t("cart")} ({getTotalCartAmount() === 0 ? t("empty") : t("full")})
          </Link>
        </li>

        {/* Giriş/Çıxış Düyməsi */}
        <li className="navbar-menu-btn-wrapper">
          {!user ? (
            <button className="nav-btn" onClick={() => { setShowLogin(true); closeMenu(); }}>{t("signIn")}</button>
          ) : (
            <button className="nav-btn" onClick={handleLogout}>{t("logOut")}</button>
          )}
        </li>
      </ul>

      {/* Kompüter rejimi üçün sağ tərəf (Mobildə gizlənəcək) */}
      <div className="navbar-right-desktop">

        
        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt={t("basketAlt")} />
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        <div className="navbar-language-select">
          <select value={language} onChange={(e) => setLanguage(e.target.value)} aria-label="Select language">
            <option value="az">AZ - Azərbaycan</option>
            <option value="en">EN - English</option>
            <option value="tr">TR - Türkçe</option>
            <option value="ar">AR - العربية</option>
            <option value="uz">UZ - O'zbek</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Navbar;