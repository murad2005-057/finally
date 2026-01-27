import React, { useEffect, useState, useContext } from "react"
import { LanguageContext } from '../i18n/LanguageProvider'

const Admin = () => {

    const [admin, setAdmin] = useState(null)

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"))

        // login yoxdursa və ya admin deyilsə → home
        if (!user || user.role !== "admin") {
            window.location.href = "/"
            return
        }

        // admin məlumatlarını DB-dən çək
        fetch("http://localhost:3000/users?role=admin")
            .then(res => res.json())
            .then(data => {
                // adətən 1 admin olur
                setAdmin(data[0])
            })
    }, [])

    if (!admin) {
        return <h2 style={{ padding: "30px" }}>{useContext(LanguageContext).t("admin.loading")}</h2>
    }

    return (
        <div style={{ padding: "30px" }}>
            <h1>{useContext(LanguageContext).t("admin.panel")}</h1>

            <div style={{
                border: "1px solid #ccc",
                padding: "20px",
                maxWidth: "400px"
            }}>
                <p><b>{useContext(LanguageContext).t("admin.name")}:</b> {admin.name}</p>
                <p><b>{useContext(LanguageContext).t("admin.email")}:</b> {admin.email}</p>
                <p><b>{useContext(LanguageContext).t("admin.role")}:</b> {admin.role}</p>
            </div>
        </div>
    )
}

export default Admin
