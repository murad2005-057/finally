import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../admin/AdminAddProduct.css";

const AdminAddProduct = () => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    image: "",
    description: "", // Yeni sahə
    category: ""    // Yeni sahə
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Qiyməti rəqəmə çevirmək (isteğe bağlı, amma data keyfiyyəti üçün yaxşıdır)
    const payload = {
      ...form,
      price: Number(form.price)
    };

    await fetch("http://localhost:3000/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    navigate("/admin/product");
  };

  return (
    <div className="add-product-container">
      <h2>Add Product</h2>

      <form className="add-product-form" onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Product name"
          onChange={handleChange}
          required
        />

        <input
          name="price"
          type="number"
          placeholder="Price"
          onChange={handleChange}
          required
        />

        <input
          name="category"
          placeholder="Category (e.g. Noodles, Salad)"
          onChange={handleChange}
          required
        />

        <input
          name="image"
          placeholder="Image path (e.g. /src/assets/food_32.png)"
          onChange={handleChange}
          required
        />

        {/* Description üçün daha geniş yazı alanı (textarea) daha yaxşı olar */}
        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          required
        ></textarea>

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AdminAddProduct;