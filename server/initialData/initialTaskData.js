const Task = require('../models/mongoDB/tasks/Task');
const taskData = require('./task.json');
const { getAllUsers, updateLastTask } = require('../models/mongoDB/users/usersService');

const getUsersForTask = async () => {
    try {
        const usersFromDB = await getAllUsers();
        const usersForTask = creareUserForTaskList(usersFromDB, taskData.requierdRoles, taskData.rangeTime, taskData.groupId);
        return usersForTask.map(user => user._id.toString());
    } catch (err) {
        console.log(err);
    }
};

const selectUsers = (users, numUsers, requestedRole, taskTimeRange) => {
    const filteredUsers = users.filter(user =>
        user.roles.includes(requestedRole));
    const sortedUsers = filteredUsers.sort((a, b) => a.lastTask - b.lastTask);
    const taskStartTime = taskTimeRange[0];
    const taskEndTime = taskTimeRange[1];

    const selectedUsers = sortedUsers.filter(user => user.endTaskDates.pop() < new Date(taskStartTime))
        .slice(0, numUsers);
    const updatedUsers = users.map(user => {
        if (selectedUsers.some(selectedUser => selectedUser._id === user._id)) {
            return { ...user, lastTask: taskEndTime }._doc;
        }
        return user;
    });
    return { selectedUsers, updatedUsers };
};

const creareUserForTaskList = (users, rolesForTask, timeRange, groupId) => {
    let groupMembers = users.filter(user => user.groupId.toString() === groupId);
    return rolesForTask.map((role, i) => {
        const selectedUsers = selectUsers(groupMembers, role.amount, role.title, timeRange);
        groupMembers = selectedUsers.updatedUsers;
        return selectedUsers.selectedUsers;
    }).flat();
};

const initialTaskData = async () => {
    const userIdsForTask = await getUsersForTask();
    userIdsForTask.forEach(async userId => await updateLastTask(userId, taskData.rangeTime[1]))
    const task = new Task({
        ...taskData,
        members: userIdsForTask
    });
    return task.save();
}

module.exports = initialTaskData;