import { useEffect, useState } from "react";
import axios from "axios";

import UserCard from "../components/UserCard";

const Users = () => {

    const [users, setUsers] = useState(null);

    useEffect(() => {
        // Fetch users data from the server
        (async () => {
            try {
                const { data } = await axios.get("/users");
                setUsers(data);
            } catch (err) {
                console.log(err);
            }
        })();
    }, []);

    return (
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {users ?
                users.map((user, i) => <UserCard user={user} key={i} />) : ""
            }
        </div>
    )
}
export default Users;