import React, { useContext } from 'react'
import '../Cart/Cart.css'
import { StoreContext } from '../../conText/StoreContext'
import { LanguageContext } from '../../i18n/LanguageProvider'

const Cart = () => {
    const { getTotalCartAmount } = useContext(StoreContext);

    const { t } = useContext(LanguageContext);

    return (
        <form className='place-order'>
            {/* SOL TƏRƏF: Məlumat Girişi */}
            <div className="place-order-left">
                <p className="title">{t("cart.deliveryInformation")}</p>
                <div className="multi-fields">
                    <input type="text" placeholder={t("cart.placeholder.firstName")} />
                    <input type="text" placeholder={t("cart.placeholder.lastName")} />
                </div>
                <input type="email" placeholder={t("cart.placeholder.email")} />
                <input type="text" placeholder={t("cart.placeholder.street")} />
                <div className="multi-fields">
                    <input type="text" placeholder={t("cart.placeholder.city")} />
                    <input type="text" placeholder={t("cart.placeholder.state")} />
                </div>
                <div className="multi-fields">
                    <input type="text" placeholder={t("cart.placeholder.zip")} />
                    <input type="text" placeholder={t("cart.placeholder.country")} />
                </div>
                <input type="text" placeholder={t("cart.placeholder.phone")} />
            </div>

            {/* SAĞ TƏRƏF: Səbət Yekunu (Mobildə formanın altına düşəcək) */}
            <div className="place-order-right">
                <div className="cart-total">
                    <h2>{t("cart.totals")}</h2>
                    <div className="cart-total-details">
                        <p>{t("cart.subtotal")}</p>
                        <p>${getTotalCartAmount()}</p>
                    </div>
                    <hr />
                    <div className="cart-total-details">
                        <p>{t("cart.deliveryFee")}</p>
                        <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
                    </div>
                    <hr />
                    <div className="cart-total-details">
                        <b>{t("cart.total")}</b>
                        <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
                    </div>
                    <button className='cart-button' type='submit'>{t("cart.proceed")}</button>
                </div>
            </div>
        </form>
    )
}

export default Cart;