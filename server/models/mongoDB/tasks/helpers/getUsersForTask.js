const { getAllUsers } = require('../../users/usersService');

const getUsersForTask = async (taskData) => {
    try {
        const usersFromDB = await getAllUsers();
        const usersForTask = await creareUserForTaskList(usersFromDB, taskData.requierdRoles, taskData.rangeTime, taskData.groupId);
        return usersForTask.map(user => user._id.toString());
    } catch (err) {
        throw err;
    }
};

const selectUsers = async (users, numUsers, requestedRole, taskTimeRange) => {
    const filteredUsers = users.filter(user =>
        user.roles.includes(requestedRole));
    const sortedUsers = filteredUsers.sort((a, b) => a.lastTask - b.lastTask);
    const taskStartTime = new Date(taskTimeRange[0]);
    const taskEndTime = taskTimeRange[1];

    const selectedUsers = sortedUsers.filter(user => user.endTaskDates.pop() < taskStartTime)
        .slice(0, numUsers);
    const updatedUsers = users.map(user => {
        if (selectedUsers.some(selectedUser => selectedUser._id === user._id)) {
            return { ...user, lastTask: taskEndTime }._doc;
        }
        return user;
    });
    return { selectedUsers, updatedUsers };
};

const creareUserForTaskList = async (users, rolesForTask, timeRange, groupId) => {
    let groupMembers = users.filter(user => user.groupId.toString() === groupId);
    const selectedUsersPromises = rolesForTask.map(async (role) => {
        const selectedUsers = await selectUsers(groupMembers, role.amount, role.title, timeRange);
        groupMembers = selectedUsers.updatedUsers;
        return selectedUsers.selectedUsers;
    });
    const selectedUsers = await Promise.all(selectedUsersPromises);
    return selectedUsers.flat();
};

module.exports = getUsersForTask;
