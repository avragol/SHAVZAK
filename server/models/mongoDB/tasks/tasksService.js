const Task = require('./Task');

const createTask = taskData => {
    const task = new Task(taskData);
    return task.save();
};

const getTaskByEmail = (email) => {
    return Task.findOne({ email });
};

const getAllTasks = () => {
    return Task.find().select(["-password"]);
}

const getTaskById = id => {
    return Task.findById(id).select(["-password"]);
}

const updateTask = (id, taskToUpdate) => {
    return Task.findByIdAndUpdate(id, taskToUpdate, { new: true }).select(["-password"]);
}

const updateLastTask = (id, lastTask) => {
    return Task.findByIdAndUpdate(id, { $push: { endTaskDates: lastTask } }, { new: true }).select(["-password"]);
};

const deleteTask = (id) => {
    return Task.findByIdAndDelete(id).select(["-password", "-createdAt", "-__v"]);
}

module.exports = {
    createTask,
    getTaskById,
    getAllTasks,
    getTaskByEmail,
    updateTask,
    updateLastTask,
    deleteTask,
}