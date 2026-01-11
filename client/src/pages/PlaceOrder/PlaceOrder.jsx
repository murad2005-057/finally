import React, { useContext, useState } from 'react'
import "./PlaceOrder.css"
import { StoreContext } from '../../conText/StoreContext'

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

        alert("Order placed successfully!")
    }

    return (
        <form className='place-order' onSubmit={handleSubmit}>
            <div className="place-order-left">
                <p className='title'>Delivery Information</p>

                <div className="muliti-fields">
                    <input
                        type="text"
                        name="firstName"
                        placeholder="First name"
                        required
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last name"
                        required
                        onChange={handleChange}
                    />
                </div>

                <input
                    type="email"
                    name="email"
                    placeholder="Email address"
                    required
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="street"
                    placeholder="Street"
                    required
                    onChange={handleChange}
                />

                <div className="muliti-fields">
                    <input
                        type="text"
                        name="city"
                        placeholder="City"
                        required
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="state"
                        placeholder="State"
                        required
                        onChange={handleChange}
                    />
                </div>

                <div className="muliti-fields">
                    <input
                        type="text"
                        name="zip"
                        placeholder="Zip code"
                        required
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="country"
                        placeholder="Country"
                        required
                        onChange={handleChange}
                    />
                </div>

                <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    required
                    onChange={handleChange}
                />
            </div>

            <div className="place-order-right">
                <div className="cart-total">
                    <h2>Cart Totals</h2>

                    <div className="cart-total-details">
                        <p>Subtotal</p>
                        <p>${getTotalCartAmount()}</p>
                    </div>
                    <hr />

                    <div className="cart-total-details">
                        <p>Delivery Fee</p>
                        <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
                    </div>
                    <hr />

                    <div className="cart-total-details">
                        <p>Total</p>
                        <p>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</p>
                    </div>

                    <button type="submit">
                        PROCEED TO PAYMENT
                    </button>
                </div>
            </div>
        </form>
    )
}

export default PlaceOrder
