import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { StoreContext } from "../../conText/StoreContext";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getTotalCartAmount } = useContext(StoreContext);

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
        Arsenal Restaurant
      </Link>

      {/* Burger İkonu - Mobildə hər şeyi bu idarə edəcək */}
      <div className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <div className={isMenuOpen ? "line open" : "line"}></div>
        <div className={isMenuOpen ? "line open" : "line"}></div>
        <div className={isMenuOpen ? "line open" : "line"}></div>
      </div>

      {isMenuOpen && <div className="nav-overlay" onClick={closeMenu}></div>}

      <ul className={`navbar-menu ${isMenuOpen ? "mobile-visible" : ""}`}>
        <Link to="/" onClick={() => { setMenu("home"); closeMenu(); }} className={menu === "home" ? "active" : ""}>Home</Link>
        <a href="#explore-menu" onClick={() => { setMenu("menu"); closeMenu(); }} className={menu === "menu" ? "active" : ""}>Menu</a>
        <a href="#app-download" onClick={() => { setMenu("mobile-app"); closeMenu(); }} className={menu === "mobile-app" ? "active" : ""}>Mobile-App</a>
        <a href="#footer" onClick={() => { setMenu("contact-us"); closeMenu(); }} className={menu === "contact-us" ? "active" : ""}>Contact Us</a>

        {/* Mobildə Səbət Menyuda Görünsün */}
        <li className="mobile-only-cart">
          <Link to="/cart" onClick={closeMenu} className="mobile-cart-link">
            Səbət ({getTotalCartAmount() === 0 ? "Boş" : "Dolu"})
          </Link>
        </li>

        {/* Giriş/Çıxış Düyməsi */}
        <li className="navbar-menu-btn-wrapper">
          {!user ? (
            <button className="nav-btn" onClick={() => { setShowLogin(true); closeMenu(); }}>Sign In</button>
          ) : (
            <button className="nav-btn" onClick={handleLogout}>Log Out</button>
          )}
        </li>
      </ul>

      {/* Kompüter rejimi üçün sağ tərəf (Mobildə gizlənəcək) */}
      <div className="navbar-right-desktop">

        
        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="basket" />
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;