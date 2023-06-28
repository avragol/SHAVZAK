const joiCreateTaskValidation = require('./joi/task/createTaskValidation');
const joiUpdateTaskValidation = require('./joi/task/updateTaskValidation');
const { validateIdSchema } = require('./joi/idValidation')
const config = require('config');

const validatorOption = config.get("validatorOption");

const createTaskValidation = (taskInput) => {
    switch (validatorOption) {
        case "joi":
        default:
            return joiCreateTaskValidation(taskInput);
    }
};

const taskIdValidation = (id) => {
    switch (validatorOption) {
        case "joi":
        default:
            return validateIdSchema(id);
    }
};

const updateTaskValidation = (taskInput) => {
    switch (validatorOption) {
        case "joi":
        default:
            return joiUpdateTaskValidation(taskInput);
    }
};

module.exports = {
    createTaskValidation,
    taskIdValidation,
    updateTaskValidation
}

