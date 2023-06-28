const joiCreateTaskValidation = require('./joi/createTaskValidation');
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

module.exports = {
    createTaskValidation,
    taskIdValidation
}

