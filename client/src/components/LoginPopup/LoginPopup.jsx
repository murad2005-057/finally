import React, { useState, useContext } from 'react'
import { useNavigate } from "react-router-dom"   // ✅ ƏLAVƏ
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { LanguageContext } from '../../i18n/LanguageProvider'

const LoginPopup = ({ setShowLogin }) => {

    const navigate = useNavigate()               // ✅ ƏLAVƏ

    const [currState, setCurrState] = useState("login")
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const { t } = useContext(LanguageContext)

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        // ================= REGISTER =================
        if (currState === "signup") {
            await fetch("http://localhost:3000/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            })

            alert(t("login.registerSuccess"))
            setCurrState("login")
            return
        }

        // ================= LOGIN =================
        const res = await fetch("http://localhost:3000/users")
        const users = await res.json()

        const foundUser = users.find(
            u => u.email === formData.email && u.password === formData.password
        )

        if (!foundUser) {
            alert(t("login.invalidCredentials"))
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
            alert(t("login.adminNotFound"))
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
