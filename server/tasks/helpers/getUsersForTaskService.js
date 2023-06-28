const getUsersForTaskMongo = require("../../models/mongoDB/tasks/helpers/getUsersForTask.js");
const config = require('config');

const dbOption = config.get("dbOption");

const getUsersForTask = (taskData) => {
    switch (dbOption) {
        case "mongo":
        default:
            return getUsersForTaskMongo(taskData);
    }
};

module.exports = getUsersForTask;