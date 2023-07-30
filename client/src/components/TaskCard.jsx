import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskCard = ({ task }) => {
    const [users, setUsers] = useState([]);
    const [isPast, setIsPast] = useState(false);
    const [isPresent, setIsPresent] = useState(false);
    const [showAllUsers, setShowAllUsers] = useState(false);
    const startTime = new Date(task.rangeTime[0]).toLocaleString();
    const endTime = new Date(task.rangeTime[1]).toLocaleString();

    // Fetch user names by user ids
    useEffect(() => {
        const determineTaskStatus = () => {
            const now = new Date().toISOString();
            const [startTime, endTime] = task.rangeTime;
            if (now > endTime) {
                setIsPast(true);
            } else if (now >= startTime && now <= endTime) {
                setIsPresent(true);
            }
        };
        const fetchUsers = async () => {
            try {
                const promises = task.members.map(async (userId) => {
                    const { data } = await axios.get(`/users/${userId}`);
                    return data.name;
                });

                const resolvedUsers = await Promise.all(promises);
                setUsers(resolvedUsers);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        determineTaskStatus();
        fetchUsers();
    }, [task]);

    // Function to determine the task status (past, present, future) based on current date

    const handleShowAllUsers = () => {
        setShowAllUsers(!showAllUsers);
    };

    const chunkUsers = (users) => {
        const chunks = [];
        for (let i = 0; i < users.length; i += 3) {
            chunks.push(users.slice(i, i + 3));
        }
        return chunks;
    };

    return (
        <div className="mx-auto mt-2">
            <div className={`bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md border-4 ${isPresent ? "border-green-500" : isPast ? "border-red-500" : "border-gray-500"}`}>
                <div className="px-4 py-2 flex items-center justify-between bg-mainCustomColor dark:bg-accentColor">
                    <div className="text-white dark:text-dark-background font-semibold text-lg">{task.name}</div>
                    <div className={`text-xs font-medium p-2 rounded-xl ${isPresent ? 'text-green-400 bg-green-900' : isPast ? 'text-red-400 bg-red-900' : 'text-gray-400 bg-gray-900'}`}>
                        {isPresent ? 'Now' : isPast ? 'Past' : 'Future'}
                    </div>
                </div>
                <div className="p-4">
                    <p className="text-gray-600 mb-2">
                        Participants({task.members.length}):{' '}
                        {users.length > 3 ? (
                            <>
                                {showAllUsers
                                    ? chunkUsers(users).map((chunk, index) => (
                                        <span key={index}>
                                            {chunk.join(', ')}
                                            {index < chunkUsers(users).length - 1 && <br />}
                                        </span>
                                    ))
                                    : users.slice(0, 3).join(', ')}
                                {users.length > 3 && (
                                    <button
                                        className="text-blue-500 ml-1 cursor-pointer underline"
                                        onClick={handleShowAllUsers}
                                    >
                                        ...
                                    </button>
                                )}
                            </>
                        ) : (
                            users.join(', ') || "No participants"
                        )}
                    </p>
                    <p className="text-gray-600 mb-2">Starts: {startTime}</p>
                    <p className="text-gray-600 mb-2">Ends: {endTime}</p>
                </div>
            </div>
        </div>
    );
};

export default TaskCard;
