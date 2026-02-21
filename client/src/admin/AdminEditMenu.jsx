import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../admin/AdminAddProduct.css";
import { LanguageContext } from "../i18n/LanguageProvider";
import API_URL from "../config/api";

const AdminEditMenu = () => {
    const { id } = useParams();
    const [form, setForm] = useState({
        menu_name: "",
    });
    const [image, setImage] = useState(false);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const { t } = useContext(LanguageContext);

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const response = await fetch(`${API_URL}/menu/${id}`);
                const data = await response.json();
                setForm({
                    menu_name: data.menu_name,
                });
                setImage(data.menu_image);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching menu:", error);
                setLoading(false);
            }
        };
        fetchMenu();
    }, [id]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = { ...form, menu_image: image };

        await fetch(`${API_URL}/menu/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        navigate("/admin/menu");
    };

    if (loading) return <p>{t("admin.loading")}</p>;

    return (
        <div className="add-product-container">
            <h2>{t("admin.edit")}</h2>

            <form className="add-product-form" onSubmit={handleSubmit}>
                <div className="add-img-upload flex-col">
                    <p>{t("admin.uploadImage")}</p>
                    <label htmlFor="menu_image">
                        <div className="upload-box">
                            {image ? (
                                <img src={image} alt="Preview" className="preview-img" />
                            ) : (
                                <div className="upload-placeholder">
                                    <span>＋</span>
                                    <p>{t("admin.clickToUpload")}</p>
                                </div>
                            )}
                        </div>
                    </label>
                    <input
                        onChange={handleImageChange}
                        type="file"
                        id="menu_image"
                        hidden
                    />
                </div>

                <input
                    name="menu_name"
                    value={form.menu_name}
                    placeholder={t("admin.placeholder.menuName")}
                    onChange={handleChange}
                    required
                />

                <button type="submit">{t("admin.edit")}</button>
            </form>
        </div>
    );
};

export default AdminEditMenu;
