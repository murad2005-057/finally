import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../admin/AdminAddProduct.css";
import { LanguageContext } from "../i18n/LanguageProvider";

const AdminAddProduct = () => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
    category: "",
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

    const payload = { ...form, price: Number(form.price) };

    await fetch("http://localhost:3000/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    navigate("/admin/product");
  };

  return (
    <div className="add-product-container">
      <h2>{t("admin.addProduct.title")}</h2>

      <form className="add-product-form" onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder={t("admin.placeholder.name")}
          onChange={handleChange}
          required
        />

        <input
          name="price"
          type="number"
          placeholder={t("admin.placeholder.price")}
          onChange={handleChange}
          required
        />

        <input
          name="category"
          placeholder={t("admin.placeholder.category")}
          onChange={handleChange}
          required
        />

        <input
          name="image"
          placeholder={t("admin.placeholder.image")}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder={t("admin.placeholder.description")}
          onChange={handleChange}
          required
        ></textarea>

        <button type="submit">{t("admin.addButton")}</button>
      </form>
    </div>
  );
};

export default AdminAddProduct;