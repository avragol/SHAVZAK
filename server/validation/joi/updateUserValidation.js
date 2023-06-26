const Joi = require('joi');

const updateUserSchema = Joi.object({
    name: Joi.string().min(2).max(256),
    email: Joi.string().email(),
    groupId: Joi.string().optional(),
    isManager: Joi.boolean().optional(),
    roles: Joi.array().items(Joi.string()).optional(),
});

const validateUpdateUserSchema = userInput => updateUserSchema.validateAsync(userInput);

module.exports = {
    validateUpdateUserSchema
}