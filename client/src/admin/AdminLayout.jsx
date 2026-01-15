import { Navigate, Outlet } from "react-router-dom"
import'./Admin.css'

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
        <div className="admin-layout">
        
            <div className="admin-header">
                <h3>Admin Panel</h3>
          
          <ul>
            <li>Dashboard</li>
            <li>Product</li>
        
          </ul>
            </div>

       
            <Outlet />
        </div>
    )
}

export default AdminLayout

