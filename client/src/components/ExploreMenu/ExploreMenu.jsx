import React, { useEffect, useState, useContext } from 'react'
import './ExploreMenu.css'
import { LanguageContext } from '../../i18n/LanguageProvider'

const ExploreMenu = ({ category, setCategory }) => {

    const [menuList, setMenuList] = useState([])

    useEffect(() => {
        fetch("http://localhost:3000/menu")
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

            <div className="explore-menu-list">
                {menuList.map((item) => (
                    <div
                        key={item.id}
                        onClick={() =>
                            setCategory(prev =>
                                prev === item.menu_name ? "All" : item.menu_name
                            )
                        }
                        className='explore-menu-list-item'
                    >
                        <img
                            src={item.menu_image}
                            alt={item.menu_name}
                            className={category === item.menu_name ? "active" : ""}
                        />
                        <p>{item.menu_name}</p>
                    </div>
                ))}
            </div>

            <hr />
        </div>
    )
}

export default ExploreMenu
