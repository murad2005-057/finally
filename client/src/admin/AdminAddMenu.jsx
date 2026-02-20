import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../admin/AdminAddProduct.css";
import { LanguageContext } from "../i18n/LanguageProvider";
import API_URL from "../config/api";

const AdminAddMenu = () => {
    const [form, setForm] = useState({
        menu_name: "",
        menu_image: ""
    });

    const navigate = useNavigate();
    const { t } = useContext(LanguageContext);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        await fetch(`${API_URL}/menu`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });

        navigate("/admin/menu");
    };

    return (
        <div className="add-product-container">
            <h2>{t("admin.addMenu") || "Add Menu"}</h2>

            <form className="add-product-form" onSubmit={handleSubmit}>
                <input
                    name="menu_name"
                    placeholder={t("admin.placeholder.menuName") || "Menu Name"}
                    onChange={handleChange}
                    required
                />

                <input
                    name="menu_image"
                    placeholder={t("admin.placeholder.menuImage") || "Image Path"}
                    onChange={handleChange}
                    required
                />

                <button type="submit">{t("admin.addButton") || "Add"}</button>
            </form>
        </div>
    );
};

export default AdminAddMenu;
