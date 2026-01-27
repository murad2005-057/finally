import React, { useContext } from 'react'
import './AppDownload.css'
import { assets } from '../../assets/assets'
import { LanguageContext } from '../../i18n/LanguageProvider'

const AppDownload = () => {
    const { t } = useContext(LanguageContext)

    return (
        <div className='app-download' id='app-download'>
            <p>{t("appDownload.part1")} <br />{t("appDownload.part2")}</p>
            <div className="app-download-platforms">
                <img src={assets.play_store} alt="" />
                <img src={assets.app_store} alt="" />
            </div>
        </div>
    )
}

export default AppDownload
