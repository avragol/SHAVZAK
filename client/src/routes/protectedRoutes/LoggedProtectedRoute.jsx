import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import ROUTES from "../ROUTES";

const LoggedProtectedRoute = ({ element }) => {
  const isLoggedIn = useSelector((store) => store.auth.isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      toast.error("Please login first", { duration: "200" });
    }
  }, [isLoggedIn]);

  return isLoggedIn ? element : <Navigate to={ROUTES.LOGIN} />;
};

export default LoggedProtectedRoute;

