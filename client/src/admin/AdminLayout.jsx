import { Navigate, Outlet } from "react-router-dom"

const AdminLayout = () => {

    const user = JSON.parse(localStorage.getItem("user"))

    if (!user || user.role !== "admin") {
        return <Navigate to="/" />
    }

    const handleLogout = () => {
        localStorage.removeItem("user")
        window.location.href = "/"
    }

    return (
        <div>
            {/* 🔝 ADMIN HEADER */}
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "15px",
                background: "#222",
                color: "#fff"
            }}>
                <h3>Admin Panel</h3>
                <button onClick={handleLogout}>Logout</button>
            </div>

            {/* 👇 ADMIN CONTENT */}
            <Outlet />
        </div>
    )
}

export default AdminLayout
