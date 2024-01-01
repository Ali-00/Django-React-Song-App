import { Outlet, Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import React, { useContext } from "react";

const PrivateRoutes = () => {
  let { user } = useContext(AuthContext);

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;