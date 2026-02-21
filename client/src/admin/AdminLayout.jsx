import { Navigate, Outlet, NavLink } from "react-router-dom";
import "./Admin.css";
import { useContext } from "react";
import { LanguageContext } from "../i18n/LanguageProvider";

const AdminLayout = () => {
  const { t } = useContext(LanguageContext);
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || user.role !== "admin") {
    return <Navigate to="/" />;
  }

  return (
    <div className="admin-layout">



      <aside className="admin-sidebar">

        <h3>{t("admin.brand")}</h3>

        <NavLink to="/admin/product">{t("admin.product")}</NavLink>
        <NavLink to="/admin/menu">{t("menu")}</NavLink>

      </aside>

      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
