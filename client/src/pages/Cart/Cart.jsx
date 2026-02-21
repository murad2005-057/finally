import React, { useContext } from 'react'
import '../Cart/Cart.css'
import { StoreContext } from '../../conText/StoreContext'
import { LanguageContext } from '../../i18n/LanguageProvider'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
    const { cartItems, food_list, removeFromCart, getTotalCartAmount, products } = useContext(StoreContext);
    const { t } = useContext(LanguageContext);
    const navigate = useNavigate();

    return (
        <div className='cart'>
            <div className="cart-items">
                <div className="cart-items-title">
                    <p>{t("cart.items")}</p>
                    <p>{t("cart.title")}</p>
                    <p>{t("cart.price")}</p>
                    <p>{t("cart.quantity")}</p>
                    <p>{t("cart.total_item") || "Total"}</p>
                    <p>{t("cart.remove")}</p>
                </div>
                <br />
                <hr />
                {products.concat(food_list).map((item, index) => {
                    const itemId = item.id || item._id;
                    if (cartItems[itemId] > 0) {
                        return (
                            <div key={itemId}>
                                <div className='cart-items-title cart-items-item'>
                                    <img src={item.image} alt="" />
                                    <p>{t(`product.${itemId}.name`) !== `product.${itemId}.name` ? t(`product.${itemId}.name`) : t(item.name)}</p>
                                    <p>{t("currency")}{item.price}</p>
                                    <p>{cartItems[itemId]}</p>
                                    <p>{t("currency")}{item.price * cartItems[itemId]}</p>
                                    <p onClick={() => removeFromCart(itemId)} className='cross'>x</p>
                                </div>
                                <hr />
                            </div>
                        )
                    }
                    return null;
                })}
            </div>
            <div className="cart-bottom">
                <div className="cart-total">
                    <h2>{t("cart.totals")}</h2>
                    <div>
                        <div className="cart-total-details">
                            <p>{t("cart.subtotal")}</p>
                            <p>{t("currency")}{getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <p>{t("cart.deliveryFee")}</p>
                            <p>{t("currency")}{getTotalCartAmount() === 0 ? 0 : 2}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <b>{t("cart.total")}</b>
                            <b>{t("currency")}{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
                        </div>
                    </div>
                    <button onClick={() => navigate('/order')}>{t("cart.proceed")}</button>
                </div>

            </div>
        </div>
    )
}

export default Cart;