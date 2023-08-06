import React from "react";
import { Route, Routes, Link } from "react-router-dom";
import UsersPanel from "./UsersPanel";
import UserDialog from "./UserDialog";
import TasksPanel from "./TasksPanel";
import TaskDialog from "./TaskDialog";
import CreateTaskForm from "./CreateTaskForm";

const DashboardPage = () => {
    return (
        <div>
            <h2>Dashboard</h2>
            <nav>
                <ul>
                    <li>
                        <Link to="/dashboard/users">Users Panel</Link>
                    </li>
                    <li>
                        <Link to="/dashboard/tasks">Tasks Panel</Link>
                    </li>
                </ul>
            </nav>

            <Routes >
                <Route exact path="/dashboard/users" component={UsersPanel} />
                <Route path="/dashboard/users/:userId" component={UserDialog} />
                <Route exact path="/dashboard/tasks" component={TasksPanel} />
                <Route path="/dashboard/tasks/:taskId" component={TaskDialog} />
                <Route path="/dashboard/create-task" component={CreateTaskForm} />
            </Routes>
        </div>
    );
};

export default DashboardPage;
