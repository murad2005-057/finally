import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"   // ✅ ƏLAVƏ
import './LoginPopup.css'
import { assets } from '../../assets/assets'

const LoginPopup = ({ setShowLogin }) => {

    const navigate = useNavigate()               // ✅ ƏLAVƏ

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

        // ================= LOGIN =================
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

        // ✅ ADMIN / USER YÖNLƏNDİRMƏ
        if (foundUser.role === "admin") {
            navigate("/admin")
        } else {
            navigate("/")
        }
    }

    // ================= ADMIN QUICK LOGIN =================
    const handleAdminLogin = async () => {
        const res = await fetch("http://localhost:3000/users?role=admin")
        const admins = await res.json()

        if (admins.length === 0) {
            alert("Admin not found")
            return
        }

        localStorage.setItem("user", JSON.stringify(admins[0]))
        setShowLogin(false)
        navigate("/admin")        // ✅ DÜZƏLDİ
    }

    // ================= GUEST =================
    const handleGuest = () => {
        setShowLogin(false)
        navigate("/")             // ✅ DÜZƏLDİ
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
