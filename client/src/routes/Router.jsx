import { Navigate, Route, Routes } from "react-router-dom";

import ROUTES from "./ROUTES";
import HomePage from "../pages/HomePage";
import Users from "../pages/Users";
import RegistrationPage from "../pages/RegistrationPage";
import LoginPage from "../pages/LoginPage";
import AboutPage from "../pages/AboutPage";
import MyShavzakPage from "../pages/MyShavzakPage";
import DashboardPage from '../pages/dashbord/DashboardPage';
import LoggedProtectedRoute from "./protectedRoutes/LoggedProtectedRoute";
import PayloadProtectedRoute from './protectedRoutes/PayloadProtectedRoute';
import UsersPanel from "../pages/dashbord/UsersPanel";
import TasksPanel from "../pages/dashbord/TasksPanel";
import CreateTaskForm from "../pages/dashbord/CreateTaskForm";



const Router = () => {

    return (
        <Routes>
            {/* pages for all */}
            <Route path={ROUTES.HOME} element={<HomePage />} />
            <Route path={ROUTES.FAKEHOME} element={<Navigate to={ROUTES.HOME} />} />
            <Route path={ROUTES.ABOUT} element={<AboutPage />} />
            <Route path={ROUTES.USERS} element={<Users />} />
            <Route path={ROUTES.REGISTER} element={<RegistrationPage />} />
            <Route path={ROUTES.LOGIN} element={<LoginPage />} />
            {/* pagesfor connected users */}
            <Route path={ROUTES.MYSHVZAK} element={<LoggedProtectedRoute
                element={<MyShavzakPage />} />} />
            {/* pages for managers */}
            <Route path={ROUTES.DASHBOARD} element={<PayloadProtectedRoute
                element={<DashboardPage />} isManager={true} />} >
                <Route path="users" element={<UsersPanel />} />
                <Route path="tasks" element={<TasksPanel />} />
                <Route path="create-task" element={<CreateTaskForm />} />
            </Route>
            {/* 404 page */}
            <Route path="*" element={<span><h1>404</h1><p>Opsss... page not found</p></span>} />
        </Routes>
    )
}

export default Router;