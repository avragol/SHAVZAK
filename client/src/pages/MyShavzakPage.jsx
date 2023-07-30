import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from 'axios';

import UserCard from '../components/UserCard';
import TaskCard from "../components/TaskCard";

const MyShavzakPage = () => {
    const userPayload = useSelector(store => store.auth.payload);
    const [user, setUser] = useState(null);
    const [tasks, setTasks] = useState(null);
    useEffect(() => { fetchData(userPayload._id) }, [userPayload]);

    const fetchData = async (id) => {
        try {

            const userResponse = await axios.get(`/users/${id}`);
            setUser(userResponse.data);

            const tasksResonse = await axios.get(`/tasks/by-user/${id}`);
            setTasks(tasksResonse.data);

        } catch (err) {
            console.log("error when fetching user: ", err);
        }
    };

    const now = new Date().toISOString();
    let currentTask = null;
    let futureTasks = [];
    let pastTasks = [];

    if (tasks) {
        // Find currently happening task
        currentTask = tasks.find(task =>
            now >= task.rangeTime[0] && now <= task.rangeTime[1]
        );

        // Filter future tasks and sort them in ascending chronological order
        futureTasks = tasks
            .filter(task => now < task.rangeTime[0])
            .sort((a, b) => new Date(a.rangeTime[0]).getTime() - new Date(b.rangeTime[0]).getTime());

        // Filter past tasks and sort them in ascending chronological order
        pastTasks = tasks
            .filter(task => now > task.rangeTime[1])
            .sort((a, b) => new Date(a.rangeTime[0]).getTime() - new Date(b.rangeTime[0]).getTime());
    }
    return (
        <div className="bg-blue-300 dark:bg-blue-900 p-4 mt-8 max-w-xs sm:max-w-sm md:max-w-3xl rounded-xl">
            <div className="flex justify-start md:justify-between mb-2">
                <h3 className="hidden md:block text-md"><b>User ID:</b> {userPayload && userPayload._id}</h3>
                <h3 className="text-md"><b>type:</b> {userPayload && userPayload.isManger ? "manager" : "user"}</h3>
            </div>
            <div class="border-t border-textColor dark:border-dark-text my-2 mx-[-1rem]"></div>
            <div className="md:flex gap-5">
                <div className="flex-1 mt-5">
                    {user && (<UserCard user={user} hover={false} />)}
                </div>
                <div className="flex-2">
                    {currentTask && <TaskCard task={currentTask} key={currentTask._id} />}
                    {futureTasks.map((task) => <TaskCard task={task} key={task._id} />)}
                    {pastTasks.map((task) => <TaskCard task={task} key={task._id} />)}
                </div>
            </div>
        </div>
    )
}

export default MyShavzakPage;