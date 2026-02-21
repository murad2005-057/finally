import React, { useContext } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../conText/StoreContext'
import { LanguageContext } from '../../i18n/LanguageProvider'

const FoodItem = ({ id, name, price, description, image }) => {

    const { cartItems, addToCart, removeFromCart, user } = useContext(StoreContext);
    const { t } = useContext(LanguageContext)

    return (
        <div className='food-item' >
            <div className="food-item-image-container">
                {/* Şəkli backend-dən gələn URL ilə birləşdiririk */}
                <img className='food-item-image' src={image} alt={t(name)} />

                {!cartItems[id]
                    ? <img className='add' onClick={() => addToCart(id)} src={assets.add_icon_white} alt={t("add")} />
                    : <div className='food-item-counter'>
                        <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt={t("remove")} />
                        <p>{cartItems[id]}</p>
                        <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt={t("add")} />
                    </div>
                }
            </div>
            <div className="food-item-info">
                <div className="food-item-name-rating">
                    <p>{t(name)}</p>
                    <img src={assets.rating_starts} alt={t("ratingStars")} />
                </div>
                <p className='food-item-desc'>{t(description)}</p>
                <p className='food-item-price'>{t("currency")}{price}</p>
            </div>
        </div>
    )
}

export default FoodItem;