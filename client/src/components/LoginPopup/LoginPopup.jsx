import React, { useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'

const LoginPopup = ({ setShowLogin }) => {

    const [currState, setCurrState] = useState("Login")
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        // ================= REGISTER =================
        if (currState === "Sign Up") {
            await fetch("http://localhost:3000/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            })

            alert("Register successful. Please login.")
            setCurrState("Login")
            return
        }

        // ================= LOGIN (json-server) =================
        const res = await fetch("http://localhost:3000/users")
        const users = await res.json()

        const foundUser = users.find(
            u => u.email === formData.email && u.password === formData.password
        )

        if (!foundUser) {
            alert("Email or password is incorrect")
            return
        }

        localStorage.setItem("user", JSON.stringify(foundUser))
        setShowLogin(false)
        window.location.href = "/" // HOME
    }

    const handleGuest = () => {
        setShowLogin(false)
        window.location.href = "/" // HOME
    }

    return (
        <div className='login-popup'>
            <form className="login-popup-container" onSubmit={handleSubmit}>
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img
                        src={assets.cross_icon}
                        alt=""
                        onClick={() => setShowLogin(false)}
                    />
                </div>

                <div className="login-popup-inputs">
                    {currState === "Sign Up" && (
                        <input
                            type="text"
                            name="name"
                            placeholder="Your name"
                            required
                            onChange={handleChange}
                        />
                    )}

                    <input
                        type="email"
                        name="email"
                        placeholder="Your email"
                        required
                        onChange={handleChange}
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                        onChange={handleChange}
                    />
                </div>

                <button type="submit">
                    {currState === "Sign Up" ? "Create account" : "Login"}
                </button>

                {/* ✅ GUEST BUTTON */}
                <button
                    type="button"
                    className="guest-btn"
                    onClick={handleGuest}
                >
                    Continue as Guest
                </button>

                {currState === "Login"
                    ? <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click here</span></p>
                    : <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>
                }
            </form>
        </div>
    )
}

export default LoginPopup
