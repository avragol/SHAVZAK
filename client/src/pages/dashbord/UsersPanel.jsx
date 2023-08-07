import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-hot-toast";

import UserCard from "../../components/UserCard";

const UsersPanel = () => {
    const payload = useSelector((bigState) => bigState.auth.payload);
    const [users, setUsers] = useState([]);
    useEffect(() => {
        (async () => {
            try {
                const usersIds = (await axios.get(`/groups/${payload.groupId}`)).data.members;
                const usersPromises = usersIds.map(id => axios.get(`users/${id}`))
                const usersFromServer = await Promise.all(usersPromises);
                const usersDataFromServer = usersFromServer.map(res => res.data);
                setUsers(usersDataFromServer);
            } catch (err) {
                toast.error(err.message)
                console.log(err);
            }
        })()
    }, [payload]);
    return (
        <div>
            <h1 className="text-2xl text-center border-b-2 pb-1 font-extrabold dark:font-bold mb-4">Users</h1>

            {/* Display users list */}
            <div className="grid grid-cols-3 gap-4">
                {users.map(user => (
                    <UserCard user={user} key={user._id} />
                ))}
            </div>

        </div>
    );
};

export default UsersPanel;