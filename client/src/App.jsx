import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import OrderSuccess from "./pages/OrderSuccess/OrderSuccess";
import NotFound from "./pages/NotFound/NotFound";
import Footer from "./components/Footer/Footer";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import AdminLayout from "./admin/AdminLayout";


import AdminProduct from "./admin/AdminProduct";
import AdminAddProduct from "./admin/AdminAddProduct";
import AdminMenu from "./admin/AdminMenu";
import AdminAddMenu from "./admin/AdminAddMenu";
import AdminEditProduct from "./admin/AdminEditProduct";
import AdminEditMenu from "./admin/AdminEditMenu";

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
          <Route path="*" element={<NotFound />} />

          {/* 🔐 ADMIN ROUTES */}
          <Route path="/admin" element={<AdminLayout />}>

            <Route path="product" element={<AdminProduct />} />
            <Route path="product/add" element={<AdminAddProduct />} />
            <Route path="menu" element={<AdminMenu />} />
            <Route path="menu/add" element={<AdminAddMenu />} />
            <Route path="product/edit/:id" element={<AdminEditProduct />} />
            <Route path="menu/edit/:id" element={<AdminEditMenu />} />
          </Route>
        </Routes>
      </div>

      <Footer />
    </>
  );
};

export default App;
