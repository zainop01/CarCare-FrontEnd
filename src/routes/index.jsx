import React from 'react'
import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard"
import Login from "../pages/Login"
import Customer from "../pages/Customer"
import Remainder from "../pages/Remainder"
import Vehicle from "../pages/Vehicle"
import Expense from "../pages/Expense"
import Services from "../pages/Services"
import Products from "../pages/Products"
import CustomerDetails from "../pages/CustomerDetails"
import Order from "../pages/Order"
// Protected-routes
import  PrivateRoute from "./PrivateRoute";
// Local-Storages
// import { tokenStorage } from "../localStorage";



const Router = () => {
  // console.log("tokenStorage", tokenStorage());
  return (
    <>
      <Routes>
      <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute Component={Dashboard} />} />
        <Route path="/customer" element={<PrivateRoute Component={Customer} />} />
        <Route path="/remainder" element={<PrivateRoute Component={Remainder} />} />
        <Route path="/vehicle" element={<PrivateRoute Component={Vehicle} />} />
        <Route path="/expense" element={<PrivateRoute Component={Expense} />} />
        <Route path="/services" element={<PrivateRoute Component={Services} />} />
        <Route path="/product" element={<PrivateRoute Component={Products} />} />
        <Route path="/customer/details" element={<PrivateRoute Component={CustomerDetails} />} />
        <Route path="/order" element={<PrivateRoute Component={Order} />} />
      </Routes>
    </>
  )
}

export default Router
