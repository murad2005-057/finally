import React, { useState, useContext } from 'react'
import { useNavigate } from "react-router-dom"   // ✅ ƏLAVƏ
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { LanguageContext } from '../../i18n/LanguageProvider'
import { StoreContext } from '../../conText/StoreContext'
import API_URL from '../../config/api'

const LoginPopup = ({ setShowLogin }) => {

    const navigate = useNavigate()               // ✅ ƏLAVƏ

    const [currState, setCurrState] = useState("login")
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const { t } = useContext(LanguageContext)
    const { setUser } = useContext(StoreContext)

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            // ================= REGISTER =================
            if (currState === "signup") {
                const registerRes = await fetch(`${API_URL}/users`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData)
                })

                if (!registerRes.ok) throw new Error("Registration failed");

                const newUser = await registerRes.json();
                localStorage.setItem("user", JSON.stringify(newUser))
                setUser(newUser)
                setShowLogin(false)
                navigate("/")
                return
            }

            // ================= LOGIN =================
            const res = await fetch(`${API_URL}/users`)
            const users = await res.json()

            const foundUser = users.find(
                u => u.email === formData.email && u.password === formData.password
            )

            if (!foundUser) {
                alert(t("login.invalidCredentials"))
                return
            }

            localStorage.setItem("user", JSON.stringify(foundUser))
            setUser(foundUser)
            setShowLogin(false)

            // ✅ ADMIN / USER YÖNLƏNDİRMƏ
            if (foundUser.role === "admin") {
                navigate("/admin")
            } else {
                navigate("/")
            }
        } catch (error) {
            console.error(error);
            alert("Connection error. Please try again later.");
        }
    }

    // ================= ADMIN QUICK LOGIN =================
    const handleAdminLogin = async () => {
        try {
            const res = await fetch(`${API_URL}/users?role=admin`)
            const admins = await res.json()

            if (admins.length === 0) {
                alert(t("login.adminNotFound"))
                return
            }

            const adminUser = admins[0]
            localStorage.setItem("user", JSON.stringify(adminUser))
            setUser(adminUser)
            setShowLogin(false)
            navigate("/admin")
        } catch (error) {
            console.error(error);
        }
    }

    // ================= GUEST =================
    const handleGuest = () => {
        setShowLogin(false)
        navigate("/")
    }

    return (
        <div className='login-popup' onClick={() => setShowLogin(false)}>
            <form className="login-popup-container" onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>
                <div className="login-popup-title">
                    <h2>{currState === "signup" ? t("login.signUp") : t("login.login")}</h2>
                    <img
                        src={assets.cross_icon}
                        alt=""
                        onClick={() => setShowLogin(false)}
                    />
                </div>

                <div className="login-popup-inputs">
                    {(currState === "signup") && (
                        <input
                            type="text"
                            name="name"
                            placeholder={t("login.yourName")}
                            required
                            onChange={handleChange}
                        />
                    )}

                    <input
                        type="email"
                        name="email"
                        placeholder={t("login.yourEmail")}
                        required
                        onChange={handleChange}
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder={t("login.password")}
                        required
                        onChange={handleChange}
                    />
                </div>

                <button type="submit">
                    {currState === "signup" ? t("login.createAccount") : t("login.loginBtn")}
                </button>

                <button
                    type="button"
                    className="guest-btn"
                    onClick={handleGuest}
                >
                    {t("login.continueGuest")}
                </button>

                {currState === "login"
                    ? <p>{t("login.createNewAccount")} <span onClick={() => setCurrState("signup")}>{t("login.clickHere")}</span></p>
                    : <p>{t("login.alreadyHave")} <span onClick={() => setCurrState("login")}>{t("login.loginHere")}</span></p>
                }
            </form>
        </div>
    )
}

export default LoginPopup
