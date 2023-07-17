import { Navigate, Route, Routes } from "react-router-dom";

import ROUTES from "./ROUTES";

const Router = () => {
    return (
        <Routes>
            {/* pages */}
            <Route path={ROUTES.HOME} element={<h1>Home Page</h1>} />
            <Route path={ROUTES.FAKEHOME} element={<Navigate to={ROUTES.HOME} />} />
            <Route path={ROUTES.ABOUT} element={<h1>About Us</h1>} />
            <Route path={ROUTES.REGISTER} element={<h1>Register</h1>} />
            <Route path={ROUTES.LOGIN} element={<h1>Login</h1>} />
            {/* 404 page */}
            <Route path="*" element={<span><h1>404</h1><p>Opsss... page not found</p></span>} />
        </Routes>
    )
}

export default Router;