import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminProduct.css";
import { LanguageContext } from '../i18n/LanguageProvider'
import API_URL from "../config/api"

const ITEMS_PER_SECTION = 10;

const AdminProduct = () => {
  const [products, setProducts] = useState([]);
  const [section, setSection] = useState(0);
  const navigate = useNavigate();
  const { t } = useContext(LanguageContext);

  useEffect(() => {
    fetch(`${API_URL}/products`)
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const deleteProduct = async (id) => {
    await fetch(`${API_URL}/products/${id}`, {
      method: "DELETE"
    });

    const updatedProducts = products.filter(p => p.id !== id);
    setProducts(updatedProducts);

    // Əgər silmədən sonra cari səhifə boşalarsa, bir əvvəlki səhifəyə keç
    const newSectionsCount = Math.ceil(updatedProducts.length / ITEMS_PER_SECTION);
    if (section >= newSectionsCount && section > 0) {
      setSection(newSectionsCount - 1);
    }
  };

  const sectionsCount = Math.ceil(products.length / ITEMS_PER_SECTION);
  const start = section * ITEMS_PER_SECTION;
  const currentProducts = products.slice(start, start + ITEMS_PER_SECTION);

  return (
    <div>
      <h2>{t("admin.products")}</h2>

      {/* SECTION NAV */}
      <div className="section-nav">
        {Array.from({ length: sectionsCount }).map((_, i) => (
          <button
            key={i}
            className={section === i ? "active" : ""}
            onClick={() => setSection(i)}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* PRODUCTS GRID */}
      <div className="products-grid">
        {currentProducts.map(product => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.name} />
            <h4>{t(`product.${product.id}.name`) !== `product.${product.id}.name` ? t(`product.${product.id}.name`) : t(product.name)}</h4>
            <p>{t("currency")}{product.price}</p>

            <button
              className="edit-btn"
              onClick={() => navigate(`/admin/product/edit/${product.id}`)}
            >
              {t("admin.edit")}
            </button>

            <button
              className="delete-btn"
              onClick={() => deleteProduct(product.id)}
            >
              {t("admin.delete")}
            </button>
          </div>
        ))}

        {/* ADD PRODUCT CARD - Yalnız 4-cü səhifədə (index 3) görünür */}
        {section === 3 && (
          <div
            className="product-card add-product-card"
            onClick={() => navigate("/admin/product/add")}
          >
            <span>＋</span>
            <p>{t("admin.addProductCard")}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProduct;