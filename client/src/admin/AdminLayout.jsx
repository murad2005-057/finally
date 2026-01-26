import { Navigate, Outlet, NavLink } from "react-router-dom";
import "./Admin.css";

const AdminLayout = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || user.role !== "admin") {
    return <Navigate to="/login" />;
  }

  return (
    <div className="admin-layout">


      
      <aside className="admin-sidebar">

        
        <h3>Start Bootstrap</h3>

        <NavLink to="/admin/product">Product</NavLink>

      </aside>

      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
