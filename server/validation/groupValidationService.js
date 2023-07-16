const joiGroupValidation = require('./joi/group/groupValidation');
const { validateIdSchema } = require('./joi/idValidation');
const config = require('config');

const validatorOption = config.get("validatorOption");

const groupValidation = (groupData) => {
    switch (validatorOption) {
        case "joi":
        default:
            return joiGroupValidation(groupData);
    }
};

const groupIdValidation = (groupId) => {
    switch (validatorOption) {
        case "joi":
        default:
            return validateIdSchema(groupId);
    }
};

module.exports = {
    groupValidation,
    groupIdValidation,
};
