import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminProduct.css"; // Reuse CSS
import { LanguageContext } from '../i18n/LanguageProvider'
import API_URL from "../config/api"

const AdminMenu = () => {
    const [menus, setMenus] = useState([]);
    const navigate = useNavigate();
    const { t } = useContext(LanguageContext);

    useEffect(() => {
        fetch(`${API_URL}/menu`)
            .then(res => res.json())
            .then(data => setMenus(data));
    }, []);

    const deleteMenu = async (id) => {
        await fetch(`${API_URL}/menu/${id}`, {
            method: "DELETE"
        });
        setMenus(menus.filter(m => m.id !== id));
    };

    return (
        <div>
            <h2>{t("admin.menu") || "Menu Management"}</h2>

            <div className="products-grid">
                {menus.map(menu => (
                    <div className="product-card" key={menu.id}>
                        <img src={menu.menu_image} alt={menu.menu_name} />
                        <h4>{menu.menu_name}</h4>

                        <button
                            className="delete-btn"
                            onClick={() => deleteMenu(menu.id)}
                        >
                            {t("admin.delete")}
                        </button>
                    </div>
                ))}

                <div
                    className="product-card add-product-card"
                    onClick={() => navigate("/admin/menu/add")}
                >
                    <span>＋</span>
                    <p>{t("admin.addMenu") || "Add Menu"}</p>
                </div>
            </div>
        </div>
    );
};

export default AdminMenu;
