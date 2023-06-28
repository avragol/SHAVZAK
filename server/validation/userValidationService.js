const joiRegisterValidation = require('./joi/user/registerValidation');
const joiloginValidation = require('./joi/user/loginValidation');
const joiuserIdValidation = require('./joi/idValidation');
const joiUpdateUserValidation = require('./joi/user/updateUserValidation');
const config = require('config');

const validatorOption = config.get("validatorOption");

const registerUserValidation = (userInput) => {
    switch (validatorOption) {
        case "joi":
        default:
            return joiRegisterValidation.validateRegisterSchema(userInput);
    }
    throw new Error('validator undefind');
};

const loginUserValidation = (userInput) => {
    switch (validatorOption) {
        case "joi":
        default:
            return joiloginValidation.validateLoginSchema(userInput);
    }
    throw new Error('validator undefind');
};

const userIdValidation = (userInput) => {
    switch (validatorOption) {
        case "joi":
        default:
            return joiuserIdValidation.validateIdSchema(userInput);
    }
    throw new Error('validator undefind');
};

const updateUserValidation = (userInput) => {
    switch (validatorOption) {
        case "joi":
        default:
            return joiUpdateUserValidation.validateUpdateUserSchema(userInput);
    }
    throw new Error('validator undefind');
};

module.exports = {
    registerUserValidation,
    loginUserValidation,
    userIdValidation,
    updateUserValidation
}