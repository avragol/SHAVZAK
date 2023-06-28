const { getAllUsers } = require('../../users/usersService');

const getUsersForTask = async (taskData) => {
    try {
        const usersFromDB = await getAllUsers();
        const usersForTask = creareUserForTaskList(usersFromDB, taskData.requierdRoles, taskData.rangeTime, taskData.groupId);
        return usersForTask.map(user => user._id.toString());
    } catch (err) {
        throw err;
    }
};

const selectUsers = (users, numUsers, requestedRole, taskTimeRange) => {
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

const creareUserForTaskList = (users, rolesForTask, timeRange, groupId) => {
    let groupMembers = users.filter(user => user.groupId.toString() === groupId);
    return rolesForTask.map((role) => {
        const selectedUsers = selectUsers(groupMembers, role.amount, role.title, timeRange);
        groupMembers = selectedUsers.updatedUsers;
        return selectedUsers.selectedUsers;
    }).flat();
};

module.exports = getUsersForTask;
