import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import toast from 'react-hot-toast';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';

import Calender from '../../components/Calender';
import TaskCard from '../../components/TaskCard';

const TasksPanel = () => {
    const payload = useSelector((bigState) => bigState.auth.payload);
    const [tasks, setTasks] = useState([]);
    const [showCalander, setShowCalander] = useState(false);
    const [showCalanderDilay, setShowCalanderDilay] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`tasks/by-group/${payload.groupId}`);
                setTasks(response.data);
                console.log(tasks);
            } catch (err) {
                toast.error(err.message);
                console.log(err);
            }
        })();
    }, [payload.groupId]);

    const handleCalanderButton = () => {
        setShowCalander((prevState) => !prevState);
        setTimeout(() => setShowCalanderDilay(prevState => !prevState), 200)
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4 text-center border-b-2 pb-1">Tasks</h1>
            <div className="hidden md:block">
                <div className={`${showCalander ? "h-min scale-y-100" : "scale-y-0"} ${showCalanderDilay ? "" : "h-0"} transition-all decoration-200 overflow-hidden`}>
                    <Calender tasks={tasks} />
                </div>
                <button
                    onClick={handleCalanderButton}
                    className="flex items-center justify-center w-full py-2 mt-4 bg-mainCustomColor dark:bg-accentColor text-white rounded-lg opacity-70 hover:opacity-90 transition-opacity duration-200"
                >
                    <FontAwesomeIcon icon={faCalendar} className="mr-2" />
                    {showCalander ? "Hide Calander" : "Show Calander"}
                </button>
            </div>

            {/* Display tasks list */}
            <div className="grid grid-cols-3 gap-4">
                {tasks.map(task => (
                    <TaskCard task={task} key={task._id} />
                ))}
            </div>
        </div>
    );
};

export default TasksPanel;
