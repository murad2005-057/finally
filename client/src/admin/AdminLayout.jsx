import { Navigate, Outlet, NavLink } from "react-router-dom"
import './Admin.css'

const AdminLayout = () => {

    const user = JSON.parse(localStorage.getItem("user"))

    if (!user || user.role !== "admin") {
        return <Navigate to="/" />
    }

    return (
        <div className="admin-layout">

            <div className="admin-header">
                <h3>Admin Panel</h3>

                <ul>
                    <li>
                        <NavLink 
                            to="/admin-dashboard"
                            end
                            className={({ isActive }) => isActive ? "active" : ""}
                        >
                            Dashboard
                        </NavLink>
                    </li>

                    <li>
                        <NavLink 
                            to="/admin-products"
                            className={({ isActive }) => isActive ? "active" : ""}
                        >
                            Product
                        </NavLink>
                    </li>
                </ul>
            </div>

            <Outlet />
        </div>
    )
}

export default AdminLayout
