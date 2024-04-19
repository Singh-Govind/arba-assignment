import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import PrivateRoute from "../components/PrivateRoute";
import MyStore from "./MyStore";
import Profile from "./Profile";
import Products from "./Products";
import Carts from "./Cart";

function AllRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/mystore"
        element={
          <PrivateRoute>
            <MyStore />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
      <Route
        path="/products"
        element={
          <PrivateRoute>
            <Products />
          </PrivateRoute>
        }
      />
      <Route
        path="/carts"
        element={
          <PrivateRoute>
            <Carts />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default AllRoutes;
