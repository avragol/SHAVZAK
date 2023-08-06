import React from "react";
import { Link, Outlet } from 'react-router-dom';



const DashboardPage = () => {

    return (
        <div className="dark:bg-gray-800 dark:text-gray-100 text-gray-800 bg-gray-200 p-5 min-h-screen flex flex-col justify-center items-center mt-2">
            {/* Sidebar */}
            <div className="p-4 w-max text-center bg-gray-100 dark:bg-gray-700">
                <h2 className="text-xl font-bold mb-2">Dashboard</h2>
                <div className="flex items-baseline justify-center gap-3 w-full">

                    <Link className="bg-indigo-500 hover:bg-indigo-600 transition-colors text-white px-4 py-2 mt-4 inline-block" to="/dashboard/users">Users</Link>

                    <Link className="bg-indigo-500 hover:bg-indigo-600 duration-100 text-white px-4 py-2 mt-4 inline-block" to="/dashboard/tasks">Tasks</Link>

                    <Link className="bg-indigo-500 hover:bg-indigo-600 duration-100 text-white px-4 py-2 mt-4 inline-block" to="/dashboard/create-task">
                        New Task
                    </Link>
                </div>
            </div>
            {/* Main Content */}
            <div className="p-8 flex-1 overflow-y-auto">
                <Outlet />
            </div>
        </div>
    );
};

export default DashboardPage;
