import React from "react";
import { useParams } from "react-router-dom";

const UserDialog = () => {
    const { userId } = useParams();

    return (
        <div>
            <h3>User Dialog for user ID: {userId}</h3>
            {/* Your User Dialog Content */}
        </div>
    );
};

export default UserDialog;
