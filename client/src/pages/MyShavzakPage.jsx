import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from 'axios';

import UserCard from '../components/UserCard';

const MyShavzakPage = () => {
    const userPayload = useSelector(store => store.auth.payload);
    const [user, setUser] = useState(null);
    useEffect(() => { fetchUser() }, []);

    const fetchUser = async () => {
        try {
            const { data } = await axios.get(`/users/${userPayload._id}`);
            setUser(data);
        } catch (err) {
            console.log("error when fetching user: ", err);
        }
    }
    return (
        <div className="bg-blue-300 p-4 mt-4 rounded-xl">
            <h1 className="text-2xl"><b>User ID:</b> {userPayload._id}</h1>
            <h1 className="text-2xl"><b>Type:</b> {userPayload.isManger ? "manager" : "user"}</h1>
            <h1 className="text-2xl"><b>Group ID:</b> {userPayload.groupId}</h1>
            {user && (<UserCard user={user} />)}
        </div>
    )
}

export default MyShavzakPage;