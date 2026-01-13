import React, { useEffect, useState } from "react"

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
        return <h2 style={{ padding: "30px" }}>Loading admin data...</h2>
    }

    return (
        <div style={{ padding: "30px" }}>
            <h1>Admin Panel</h1>

            <div style={{
                border: "1px solid #ccc",
                padding: "20px",
                maxWidth: "400px"
            }}>
                <p><b>Name:</b> {admin.name}</p>
                <p><b>Email:</b> {admin.email}</p>
                <p><b>Role:</b> {admin.role}</p>
            </div>
        </div>
    )
}

export default Admin
