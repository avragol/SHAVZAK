const tasksServiceMongo = require("../../models/mongoDB/tasks/tasksService");
const config = require('config');

const dbOption = config.get("dbOption");

const createTask = (taskData) => {
    switch (dbOption) {
        case "mongo":
        default:
            return tasksServiceMongo.createTask(taskData);
    }
};

const getTaskByEmail = (email) => {
    switch (dbOption) {
        case "mongo":
        default:
            return tasksServiceMongo.getTaskByEmail(email);
    }
};
const getTaskById = (id) => {
    switch (dbOption) {
        case "mongo":
        default:
            return tasksServiceMongo.getTaskById(id);
    }
};

const getAllTasks = () => {
    switch (dbOption) {
        case "mongo":
        default:
            return tasksServiceMongo.getAllTasks();
    }
};

const updateTask = (id, taskToUpdate) => {
    switch (dbOption) {
        case "mongo":
        default:
            return tasksServiceMongo.updateTask(id, taskToUpdate);
    }
};

const updateBizTask = (id) => {
    switch (dbOption) {
        case "mongo":
        default:
            return tasksServiceMongo.updateBizTask(id);
    }
};

const deleteTask = (id) => {
    switch (dbOption) {
        case "mongo":
        default:
            return tasksServiceMongo.deleteTask(id);
    }
};

module.exports = {
    createTask,
    getTaskByEmail,
    getTaskById,
    getAllTasks,
    updateTask,
    updateBizTask,
    deleteTask
};
