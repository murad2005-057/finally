import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../admin/AdminAddProduct.css";
import { LanguageContext } from "../i18n/LanguageProvider";
import API_URL from "../config/api";

const AdminAddProduct = () => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
  });
  const [image, setImage] = useState(false);

  const navigate = useNavigate();
  const { t } = useContext(LanguageContext);

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

    await fetch(`${API_URL}/products`, {
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
            required
          />
        </div>

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