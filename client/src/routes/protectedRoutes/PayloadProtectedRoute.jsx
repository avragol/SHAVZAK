import React from "react";
import { useSelector } from "react-redux";

import NoAccessPage from "../../pages/NoAccessPage";

const PayloadProtectedRoute = ({ element, isManager }) => {
  const isLoggedIn = useSelector((bigState) => bigState.auth.isLoggedIn);
  const payload = useSelector((bigState) => bigState.auth.payload);
  return isLoggedIn && payload && payload.isManger && isManager ? element : <NoAccessPage />
};

export default PayloadProtectedRoute;
