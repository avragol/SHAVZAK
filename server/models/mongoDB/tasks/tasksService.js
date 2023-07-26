const Task = require('./Task');

const createTask = taskData => {
    const task = new Task(taskData);
    return task.save();
};

const getTasksForUser = userId => {
    return Task.find({ members: userId });
}

const getAllTasks = () => {
    return Task.find();
}

const getTaskById = id => {
    return Task.findById(id);
}

const updateTask = (id, taskToUpdate) => {
    return Task.findByIdAndUpdate(id, taskToUpdate, { new: true });
}

const updateLastTask = (id, lastTask) => {
    return Task.findByIdAndUpdate(id, { $push: { endTaskDates: lastTask } }, { new: true });
};

const deleteTask = (id) => {
    return Task.findByIdAndDelete(id);
}

module.exports = {
    createTask,
    getTaskById,
    getAllTasks,
    getTasksForUser,
    updateTask,
    updateLastTask,
    deleteTask,
}