import { useState, useEffect } from 'react';
import axios from 'axios';

const UserCard = ({ user, hover = true }) => {
    const [groupName, setGroupName] = useState("");
    const [showDialog, setShowDialog] = useState(false);

    useEffect(() => {
        // Fetch group data from the server
        (async () => {
            try {
                const { data } = await axios.get(`/groups/${user.groupId}`);
                setGroupName(data.name);
            } catch (err) {
                console.log(err);
            }
        })()
    }, [user.groupId]);

    //convert the endTaskDate to readability string
    const dateObj = new Date(user.endTaskDates[user.endTaskDates.length - 1]);
    const dateOptions = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
        timeZone: 'Asia/Jerusalem'
    };
    const lastTask = (dateObj > 0) ? dateObj.toLocaleDateString('en-US', dateOptions) : "There is no history";
    const uniqueTaskDates = Array.from(new Set(user.endTaskDates)).filter((date) => date !== "1970-01-01T00:00:00.000Z");

    const handleCardClick = () => {
        setShowDialog(true);
    };

    const handleCloseDialog = () => {
        setShowDialog(false);
    };

    return (
        <div>
            <div className={`mx-auto right-0 mt-2 w-60 ${hover && "opacity-95 dark:opacity-90 hover:opacity-100 dark:hover:opacity-100 hover:scale-105 duration-200"}`} >
                <div className="bg-white dark:bg-gray-800 rounded overflow-hidden shadow-lg pb-2 hover:cursor-pointer" onClick={handleCardClick}>
                    <div className="text-center p-6 bg-mainCustomColor dark:bg-accentColor border-b dark:border-gray-500">
                        <svg
                            aria-hidden="true"
                            role="img"
                            className="h-24 w-24 text-white dark:text-dark-background  rounded-full mx-auto"
                            width="32"
                            height="32"
                            preserveAspectRatio="xMidYMid meet"
                            viewBox="0 0 256 256"
                        >
                            <path
                                fill="currentColor"
                                d="M172 120a44 44 0 1 1-44-44a44 44 0 0 1 44 44Zm60 8A104 104 0 1 1 128 24a104.2 104.2 0 0 1 104 104Zm-16 0a88 88 0 1 0-153.8 58.4a81.3 81.3 0 0 1 24.5-23a59.7 59.7 0 0 0 82.6 0a81.3 81.3 0 0 1 24.5 23A87.6 87.6 0 0 0 216 128Z"
                            ></path>
                        </svg>
                        <p className="pt-2 text-lg font-semibold text-gray-50 dark:text-dark-background ">{user.name}</p>
                        <p className="text-sm text-gray-100 dark:text-dark-background ">{user.email}</p>
                    </div>
                    <div className="">
                        <div className="px-4 py-2 flex border-b dark:border-gray-500">
                            <div className="text-secondaryColor">
                                <svg
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1"
                                    viewBox="0 0 24 24"
                                    className="w-5 h-5"
                                >
                                    <path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
                                </svg>
                            </div>
                            <div className="pl-3 ">
                                <p className="text-sm font-medium text-gray-800 dark:text-gray-100 leading-none">Roles</p>
                                <p className="text-xs text-gray-500">{user.roles.join(', ') || "There is no roles yet"}</p>
                            </div>
                        </div>
                        <div className="px-4 py-2 flex border-b dark:border-gray-500">
                            <div className="text-secondaryColor">
                                <svg
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1"
                                    viewBox="0 0 24 24"
                                    className="w-5 h-5"
                                >
                                    <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                                </svg>
                            </div>
                            <div className="pl-3">
                                <p className="text-sm font-medium text-gray-800 dark:text-gray-100 leading-none">Group</p>
                                <p className="text-xs text-gray-500">{groupName}</p>
                            </div>
                        </div>
                        <div className="px-4 py-2 flex">
                            <div className="text-secondaryColor">
                                <svg
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1"
                                    viewBox="0 0 24 24"
                                    className="w-5 h-5"
                                >
                                    <path d="M12 22s-8-4.5-8-11.8C4 5.01 9.58 2 12 2s8 3 8 8.2C20 17.5 12 22 12 22z"></path>
                                </svg>
                            </div>
                            <div className="pl-3">
                                <p className="text-sm font-medium text-gray-800 dark:text-gray-100 leading-none">Last Task</p>
                                <p className="text-xs text-gray-500">
                                    {lastTask}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            {showDialog && (
                <div className="fixed inset-0 flex items-center justify-center z-40">
                    <div
                        className="fixed inset-0 bg-black opacity-75"
                        onClick={handleCloseDialog}
                    ></div>
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg opacity-100 z-50 mx-3 sm:mx-2 md:mx-0">
                        <h2 className="text-lg font-semibold mb-2">More Details</h2>
                        <p>
                            <span className="font-semibold">ID:</span> {user._id.toString()}
                        </p>
                        <p>
                            <span className="font-semibold">Registered since:</span>{' '}
                            {new Date(user.createdAt).toLocaleDateString(
                                'en-US',
                                dateOptions
                            )}
                        </p>
                        <p>
                            <span className="font-semibold">
                                Last 3 Task Completion Dates:
                            </span>{' '}
                            {uniqueTaskDates
                                .slice(-3)
                                .map(date =>
                                    new Date(date).toLocaleDateString('en-US', dateOptions)
                                )
                                .join('; ')}
                        </p>
                        <button
                            className="mt-4 bg-mainCustomColor dark:bg-accentColor text-white py-2 px-4 rounded-lg"
                            onClick={handleCloseDialog}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
export default UserCard;