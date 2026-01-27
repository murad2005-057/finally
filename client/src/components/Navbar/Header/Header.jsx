import React, { useContext } from 'react'
import './Header.css'
import { LanguageContext } from '../../../i18n/LanguageProvider'

const Header = () => {
    return (
        <div className='header'>
                    <img src="/header_img.jpg" alt="Header Image" />
            
                <div className="header-contents">
                    <h2>{useContext(LanguageContext).t("header.title")}</h2>
                    <p>{useContext(LanguageContext).t("header.subtitle")}</p>
                    <a href="#food-display">{useContext(LanguageContext).t("header.viewMenu")}</a>
                </div>
            </div>
    )
}

export default Header
