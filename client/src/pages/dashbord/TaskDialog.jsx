import React from "react";
import { useParams } from "react-router-dom";

const TaskDialog = () => {
    const { taskId } = useParams();

    return (
        <div>
            <h3>Task Dialog for task ID: {taskId}</h3>
            {/* Your Task Dialog Content */}
        </div>
    );
};

export default TaskDialog;
