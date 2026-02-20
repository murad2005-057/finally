import React, { useContext, useState } from 'react'
import "./PlaceOrder.css"
import { StoreContext } from '../../conText/StoreContext'
import API_URL from '../../config/api'
import { LanguageContext } from '../../i18n/LanguageProvider'
import { useNavigate } from 'react-router-dom'

const PlaceOrder = () => {

    const { getTotalCartAmount, cartItems, food_list, products } = useContext(StoreContext)
    const { t } = useContext(LanguageContext)
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zip: "",
        country: "",
        phone: "",
        cardNumber: ""
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const user = JSON.parse(localStorage.getItem("user"))

        const userInfo = user
            ? user
            : {
                name: `${formData.firstName} ${formData.lastName}`,
                email: formData.email,
                password: "",
                role: "customer",
                createdAt: new Date().toISOString(),
            }

        let orderedItems = [];
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                const itemInfo = products.find(p => String(p.id) === String(item)) || food_list.find(p => String(p._id) === String(item)) || products.find(p => String(p._id) === String(item));
                if (itemInfo) {
                    orderedItems.push({
                        ...itemInfo,
                        quantity: cartItems[item],
                        total: itemInfo.price * cartItems[item]
                    });
                }
            }
        }

        const orderData = {
            userId: user ? user.id : "guest",
            user: user ? user.email : formData.email,
            userInfo,
            deliveryInfo: formData,
            cardInfo: {
                cardNumber: formData.cardNumber
            },
            products: orderedItems,
            amount: getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2,
            currency: t("currency"), // Default currency
            subtotal: getTotalCartAmount(),
            deliveryFee: getTotalCartAmount() === 0 ? 0 : 2,
            total: getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2,
            createdAt: new Date().toISOString(),
        }

        await fetch(`${API_URL}/delivery`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(orderData),
        })

        // navigate to success page
        navigate('/order/success')
    }

    return (
        <form className='place-order' onSubmit={handleSubmit}>

            <div className="place-order-left">
                <p className='title'>{useContext(LanguageContext).t("cart.deliveryInformation")}</p>

                <div className="muliti-fields">
                    <input
                        type="text"
                        name="firstName"
                        placeholder={useContext(LanguageContext).t("cart.placeholder.firstName")}
                        required
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="lastName"
                        placeholder={useContext(LanguageContext).t("cart.placeholder.lastName")}
                        required
                        onChange={handleChange}
                    />
                </div>

                <input
                    type="email"
                    name="email"
                    placeholder={useContext(LanguageContext).t("cart.placeholder.email")}
                    required
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="cardNumber"
                    placeholder="Card Number"
                    required
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="street"
                    placeholder={useContext(LanguageContext).t("cart.placeholder.street")}
                    required
                    onChange={handleChange}
                />

                <div className="muliti-fields">
                    <input
                        type="text"
                        name="city"
                        placeholder={useContext(LanguageContext).t("cart.placeholder.city")}
                        required
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="state"
                        placeholder={useContext(LanguageContext).t("cart.placeholder.state")}
                        required
                        onChange={handleChange}
                    />
                </div>

                <div className="muliti-fields">
                    <input
                        type="text"
                        name="zip"
                        placeholder={useContext(LanguageContext).t("cart.placeholder.zip")}
                        required
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="country"
                        placeholder={useContext(LanguageContext).t("cart.placeholder.country")}
                        required
                        onChange={handleChange}
                    />
                </div>

                <input
                    type="text"
                    name="phone"
                    placeholder={useContext(LanguageContext).t("cart.placeholder.phone")}
                    required
                    onChange={handleChange}
                />
            </div>

            <div className="place-order-right">
                <div className="cart-total">
                    <h2>{useContext(LanguageContext).t("cart.totals")}</h2>

                    <div className="cart-total-details">
                        <p>{useContext(LanguageContext).t("cart.subtotal")}</p>
                        <p>${getTotalCartAmount()}</p>
                    </div>
                    <hr />

                    <div className="cart-total-details">
                        <p>{useContext(LanguageContext).t("cart.deliveryFee")}</p>
                        <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
                    </div>
                    <hr />

                    <div className="cart-total-details">
                        <p>{useContext(LanguageContext).t("cart.total")}</p>
                        <p>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</p>
                    </div>

                    <button type="submit">
                        {useContext(LanguageContext).t("cart.proceed")}
                    </button>
                </div>
            </div>
        </form>
    )
}

export default PlaceOrder
