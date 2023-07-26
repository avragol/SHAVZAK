import { Navigate, Route, Routes } from "react-router-dom";

import ROUTES from "./ROUTES";
import HomePage from "../pages/HomePage";
import Users from "../pages/Users";
import RegistrationPage from "../pages/RegistrationPage";
import LoginPage from "../pages/LoginPage";
import AboutPage from "../pages/AboutPage";
import MyShavzakPage from "../pages/MyShavzakPage";

const Router = () => {
    return (
        <Routes>
            {/* pages */}
            <Route path={ROUTES.HOME} element={<HomePage />} />
            <Route path={ROUTES.FAKEHOME} element={<Navigate to={ROUTES.HOME} />} />
            <Route path={ROUTES.ABOUT} element={<AboutPage />} />
            <Route path={ROUTES.USERS} element={<Users />} />
            <Route path={ROUTES.REGISTER} element={<RegistrationPage />} />
            <Route path={ROUTES.LOGIN} element={<LoginPage />} />
            <Route path={ROUTES.MYSHVZAK} element={<MyShavzakPage />} />
            {/* 404 page */}
            <Route path="*" element={<span><h1>404</h1><p>Opsss... page not found</p></span>} />
        </Routes>
    )
}

export default Router;