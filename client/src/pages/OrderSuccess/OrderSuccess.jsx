import React, { useContext } from 'react'
import './OrderSuccess.css'
import { LanguageContext } from '../../i18n/LanguageProvider'

const OrderSuccess = () => {
    const { t } = useContext(LanguageContext)

    return (
        <div className="order-success">
            <h1>{t('order.success')}</h1>
            <p>{t('order.thankYou') || 'Thank you for your purchase! Your order is being processed.'}</p>
        </div>
    )
}

export default OrderSuccess
