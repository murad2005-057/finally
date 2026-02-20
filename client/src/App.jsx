import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import OrderSuccess from "./pages/OrderSuccess/OrderSuccess";
import Footer from "./components/Footer/Footer";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import AdminLayout from "./admin/AdminLayout";


import AdminProduct from "./admin/AdminProduct";
import AdminAddProduct from "./admin/AdminAddProduct";
import AdminMenu from "./admin/AdminMenu";
import AdminAddMenu from "./admin/AdminAddMenu";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}

      <div className="app">
        <Navbar setShowLogin={setShowLogin} />

        <Routes>
          {/* 🏠 PUBLIC ROUTES */}
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/order/success" element={<OrderSuccess />} />

          {/* 🔐 ADMIN ROUTES */}
          <Route path="/admin" element={<AdminLayout />}>

            <Route path="product" element={<AdminProduct />} />
            <Route path="product/add" element={<AdminAddProduct />} />
            <Route path="menu" element={<AdminMenu />} />
            <Route path="menu/add" element={<AdminAddMenu />} />
          </Route>
        </Routes>
      </div>

      <Footer />
    </>
  );
};

export default App;
