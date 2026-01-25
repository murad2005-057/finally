import React, { useEffect, useState } from "react";
import FoodItem from "../components/FoodItem/FoodItem";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(stored);
  }, []);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "20px", padding: "30px" }}>
      {products.map((item) => (
        <FoodItem
          key={item.id}
          id={item.id}
          name={item.name}
          price={item.price}
          description={item.description}
          image={item.image}
        />
      ))}
    </div>
  );
};

export default Products;
