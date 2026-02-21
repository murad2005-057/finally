import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../admin/AdminAddProduct.css";
import { LanguageContext } from "../i18n/LanguageProvider";
import API_URL from "../config/api";

const AdminEditProduct = () => {
    const { id } = useParams();
    const [form, setForm] = useState({
        name: "",
        price: "",
        description: "",
        category: "",
    });
    const [image, setImage] = useState(false);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const { t } = useContext(LanguageContext);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`${API_URL}/products/${id}`);
                const data = await response.json();
                setForm({
                    name: data.name,
                    price: data.price,
                    description: data.description,
                    category: data.category,
                });
                setImage(data.image);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching product:", error);
                setLoading(false);
            }
        };
        fetchProduct();
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

        const payload = { ...form, price: Number(form.price), image: image };

        await fetch(`${API_URL}/products/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        navigate("/admin/product");
    };

    if (loading) return <p>{t("admin.loading")}</p>;

    return (
        <div className="add-product-container">
            <h2>{t("admin.edit")}</h2>

            <form className="add-product-form" onSubmit={handleSubmit}>
                <div className="add-img-upload flex-col">
                    <p>{t("admin.uploadImage")}</p>
                    <label htmlFor="image">
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
                        id="image"
                        hidden
                    />
                </div>

                <input
                    name="name"
                    value={form.name}
                    placeholder={t("admin.placeholder.name")}
                    onChange={handleChange}
                    required
                />

                <input
                    name="price"
                    type="number"
                    value={form.price}
                    placeholder={t("admin.placeholder.price")}
                    onChange={handleChange}
                    required
                />

                <input
                    name="category"
                    value={form.category}
                    placeholder={t("admin.placeholder.category")}
                    onChange={handleChange}
                    required
                />

                <textarea
                    name="description"
                    value={form.description}
                    placeholder={t("admin.placeholder.description")}
                    onChange={handleChange}
                    required
                ></textarea>

                <button type="submit">{t("admin.edit")}</button>
            </form>
        </div>
    );
};

export default AdminEditProduct;
