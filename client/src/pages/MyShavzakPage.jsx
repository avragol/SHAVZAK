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
    }
    return (
        <div className="bg-blue-300 p-4 mt-4 rounded-xl">
            <h1 className="text-2xl"><b>User ID:</b> {userPayload && userPayload._id}</h1>
            <h1 className="text-2xl"><b>Type:</b> {userPayload && userPayload.isManger ? "manager" : "user"}</h1>
            <h1 className="text-2xl"><b>Group ID:</b> {userPayload && userPayload.groupId}</h1>
            {user && (<UserCard user={user} hover={false} />)}
            {tasks &&
                tasks
                    .sort(
                        (a, b) =>
                            new Date(b.rangeTime[0]).getTime() -
                            new Date(a.rangeTime[0]).getTime()
                    )
                    .map((task) => <TaskCard task={task} key={task._id} />)}
        </div>
    )
}

export default MyShavzakPage;