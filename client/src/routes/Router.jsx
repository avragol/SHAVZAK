import { Navigate, Route, Routes } from "react-router-dom";

import ROUTES from "./ROUTES";
import HomePage from "../pages/HomePage";
import Users from "../pages/Users";
import RegistrationPage from "../pages/RegistrationPage";
import LoginPage from "../pages/LoginPage";

const Router = () => {
    return (
        <Routes>
            {/* pages */}
            <Route path={ROUTES.HOME} element={<HomePage />} />
            <Route path={ROUTES.FAKEHOME} element={<Navigate to={ROUTES.HOME} />} />
            <Route path={ROUTES.ABOUT} element={<h1>About Us</h1>} />
            <Route path={ROUTES.USERS} element={<Users />} />
            <Route path={ROUTES.REGISTER} element={<RegistrationPage />} />
            <Route path={ROUTES.LOGIN} element={<LoginPage />} />
            {/* 404 page */}
            <Route path="*" element={<span><h1>404</h1><p>Opsss... page not found</p></span>} />
        </Routes>
    )
}

export default Router;