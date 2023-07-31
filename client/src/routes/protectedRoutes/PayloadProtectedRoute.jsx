import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import ROUTES from "../ROUTES";

const PayloadProtectedRoute = ({ element, isManeger }) => {
  const isLoggedIn = useSelector((store) => store.auth.isLoggedIn);
  const payload = useSelector((store) => store.auth.payload);

  useEffect(() => {
    if (isLoggedIn && isManeger && payload?.isManeger) return;
    toast.error("Invalid permissions");
  }, [isLoggedIn, payload, isManeger]);

  return isLoggedIn && isManeger && payload?.isManeger ? element : <Navigate to={ROUTES.HOME} />;
};

export default PayloadProtectedRoute;
