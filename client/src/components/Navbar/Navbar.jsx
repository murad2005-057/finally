import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { MdLogout, MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import { StoreContext } from "../../conText/StoreContext";
import { LanguageContext } from "../../i18n/LanguageProvider";
import { ThemeContext } from "../../conText/ThemeContext";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getTotalCartAmount, user, setUser } = useContext(StoreContext);
  const { language, setLanguage, t } = useContext(LanguageContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/";
  };

  const closeMenu = () => setIsMenuOpen(false);

  const handleCartClick = (e) => {
    e.preventDefault();
    if (!user) {
      setShowLogin(true);
    } else {
      navigate("/cart");
      closeMenu();
    }
  };

  return (
    <div className="navbar">
      <Link to="/" className="logo">
        {t("brand")}
      </Link>

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

        {/* Theme Toggle in Mobile Menu */}
        <li className="mobile-only-theme" onClick={toggleTheme}>
          {theme === 'light' ? <MdOutlineDarkMode size={24} /> : <MdOutlineLightMode size={24} />}
          <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
        </li>

        <li className="mobile-only-cart">
          <Link to="/cart" onClick={handleCartClick} className="mobile-cart-link">
            {t("cart")} ({getTotalCartAmount() === 0 ? t("empty") : t("full")})
          </Link>
        </li>

        <li className="mobile-only-auth">
          {!user ? (
            <button className="nav-btn" onClick={() => { setShowLogin(true); closeMenu(); }}>{t("signIn")}</button>
          ) : (
            <div className="nav-user-info" onClick={() => { handleLogout(); closeMenu(); }}>
              <span className="user-name">{user.name}</span>
              <MdLogout className="logout-icon" />
            </div>
          )}
        </li>
      </ul>

      <div className="navbar-right-desktop">
        {/* Theme Toggle Desktop */}
        <div className="navbar-theme-toggle" onClick={toggleTheme} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
          {theme === 'light' ? <MdOutlineDarkMode size={22} /> : <MdOutlineLightMode size={22} />}
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
        <div className="navbar-search-icon" onClick={handleCartClick} style={{ cursor: "pointer" }}>
          <img src={assets.basket_icon} alt={t("basketAlt")} />
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        <div className="navbar-desktop-auth">
          {!user ? (
            <button className="nav-btn" onClick={() => setShowLogin(true)}>{t("signIn")}</button>
          ) : (
            <div className="nav-user-info" onClick={handleLogout}>
              <span className="user-name">{user.name}</span>
              <MdLogout className="logout-icon" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;