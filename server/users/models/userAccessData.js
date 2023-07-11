const usersServiceMongo = require("../../models/mongoDB/users/usersService");
const config = require('config');

const dbOption = config.get("dbOption");

const registerUser = (userData) => {
    switch (dbOption) {
        case "mongo":
        default:
            return usersServiceMongo.registerUser(userData);
    }
};

const getUserByEmail = (email) => {
    switch (dbOption) {
        case "mongo":
        default:
            return usersServiceMongo.getUserByEmail(email);
    }
};
const getUserById = (id) => {
    switch (dbOption) {
        case "mongo":
        default:
            return usersServiceMongo.getUserById(id);
    }
};

const getAllUsers = () => {
    switch (dbOption) {
        case "mongo":
        default:
            return usersServiceMongo.getAllUsers();
    }
};

const updateUser = (id, userToUpdate) => {
    switch (dbOption) {
        case "mongo":
        default:
            return usersServiceMongo.updateUser(id, userToUpdate);
    }
};

const updateLastTask = (id, lastTask) => {
    switch (dbOption) {
        case "mongo":
        default:
            return usersServiceMongo.updateLastTask(id, lastTask);
    }
};

const deleteSomeTask = (id, taskDate) => {
    switch (dbOption) {
        case "mongo":
        default:
            return usersServiceMongo.deleteSomeTask(id, taskDate);
    }
};

const deleteUser = (id) => {
    switch (dbOption) {
        case "mongo":
        default:
            return usersServiceMongo.deleteUser(id);
    }
};

module.exports = {
    registerUser,
    getUserByEmail,
    getUserById,
    getAllUsers,
    updateUser,
    updateLastTask,
    deleteSomeTask,
    deleteUser
};
