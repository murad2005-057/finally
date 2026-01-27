import { Navigate, Outlet, NavLink } from "react-router-dom";
import "./Admin.css";
import { useContext } from "react";
import { LanguageContext } from "../i18n/LanguageProvider";

const AdminLayout = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || user.role !== "admin") {
    return <Navigate to="/login" />;
  }

  return (
    <div className="admin-layout">


      
      <aside className="admin-sidebar">
        
        <h3>{useContext(LanguageContext).t("admin.brand")}</h3>

        <NavLink to="/admin/product">{useContext(LanguageContext).t("admin.product")}</NavLink>

      </aside>

      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
