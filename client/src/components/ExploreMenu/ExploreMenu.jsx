import React, { useEffect, useState, useContext } from 'react'
import './ExploreMenu.css'
import { LanguageContext } from '../../i18n/LanguageProvider'
import API_URL from '../../config/api'

const ExploreMenu = ({ category, setCategory }) => {

    const [menuList, setMenuList] = useState([])

    useEffect(() => {
        fetch(`${API_URL}/menu`)
            .then(res => res.json())
            .then(data => setMenuList(data))
            .catch(err => console.error("Menu fetch error:", err))
    }, [])

    const { t } = useContext(LanguageContext)

    return (
        <div className='explore-menu' id='explore-menu'>
            <h1>{t("explore.title")}</h1>
            <p className='explore-menu-text'>
                {t("explore.subtitle")}
            </p>

            <div className="explore-menu-list-wrapper">
                <div className="explore-menu-list">
                    {[...menuList, ...menuList].map((item, index) => (
                        <div
                            key={`${item.id}-${index}`}
                            onClick={() =>
                                setCategory(prev =>
                                    prev === item.menu_name ? "All" : item.menu_name
                                )
                            }
                            className={`explore-menu-list-item ${index >= menuList.length ? 'mobile-only' : ''}`}
                        >
                            <img
                                src={item.menu_image}
                                alt={t(item.menu_name)}
                                className={category === item.menu_name ? "active" : ""}
                            />
                            <p>{t(item.menu_name)}</p>
                        </div>
                    ))}
                </div>
            </div>

            <hr />
        </div>
    )
}

export default ExploreMenu
