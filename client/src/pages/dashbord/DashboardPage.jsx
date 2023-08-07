import React, { useEffect, useState } from "react";
import { Link, Outlet } from 'react-router-dom';
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import axios from "axios";


const DashboardPage = () => {

    const payload = useSelector(store => store.auth.payload)
    const [groupName, setGroupName] = useState("");
    const [numOfMembers, setNumOfMembers] = useState(0);
    const [numOfTasks, setNumOfTasks] = useState(0);
    useEffect(() => {
        (async () => {
            try {
                if (payload) {
                    const { data } = await axios.get(`groups/${payload.groupId}`);
                    setGroupName(data.name)
                    setNumOfMembers(data.members.length);
                    const tasksFromServer = await axios.get(`tasks/by-group/${payload.groupId}`)
                    setNumOfTasks(tasksFromServer.data.length);
                }
            } catch (err) {
                console.log(err);
                toast.error(err.message);
            }
        })()
    })

    return (
        <div className="dark:bg-gray-800 dark:text-gray-100 text-gray-800 bg-gray-200 p-5 min-h-screen flex flex-col justify-center items-center mt-2">
            {/* Sidebar */}
            <div className="p-4 w-max text-center bg-gray-100 dark:bg-gray-700">
                <h2 className="text-xl font-bold mb-2">Dashboard {groupName ? `- ${groupName}` : ""}</h2>
                <div className="flex items-baseline justify-center gap-3 w-full">

                    <Link className="bg-indigo-500 hover:bg-indigo-600 transition-colors text-white px-4 py-2 mt-4 inline-block" to="/dashboard/users">Users{numOfMembers ? ` (${numOfMembers})` : ""}</Link>

                    <Link className="bg-indigo-500 hover:bg-indigo-600 duration-100 text-white px-4 py-2 mt-4 inline-block" to="/dashboard/tasks">Tasks{numOfTasks ? ` (${numOfTasks})` : ""}</Link>

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
