import React, { useContext, useState } from 'react'
import "./PlaceOrder.css"
import { StoreContext } from '../../conText/StoreContext'
import { LanguageContext } from '../../i18n/LanguageProvider'

const PlaceOrder = () => {

    const { getTotalCartAmount } = useContext(StoreContext)

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zip: "",
        country: "",
        phone: ""
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

        const orderData = {
            user: user ? user.email : "guest",
            deliveryInfo: formData,
            subtotal: getTotalCartAmount(),
            deliveryFee: getTotalCartAmount() === 0 ? 0 : 2,
            total: getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2,
            createdAt: new Date().toISOString()
        }

        await fetch("http://localhost:3000/delivery", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(orderData)
        })

        alert(useContext(LanguageContext).t("order.success"))
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
