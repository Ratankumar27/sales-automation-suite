import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "./Pages/Login.jsx";
import Register from "./Pages/Register.jsx";
import CustomerHomepage from "./Components/CustomerHomepage.jsx";
import Cart from "./Components/Cart.jsx";
import OrdersPage from "./Components/OrdersPage.jsx";
import AdminDashboard from "./Pages/AdminDashboard.jsx";

function App() {
  return (
    <Routes>

      <Route path="/" element={<Login />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/dashboard" element={<CustomerHomepage />} />

      <Route path="/cart" element={<Cart />} /> 

      <Route path="/orders" element={<OrdersPage />} /> 

      <Route path="/admin" element={<AdminDashboard />} />

    </Routes>
  );
}

export default App;
