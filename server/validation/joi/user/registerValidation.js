const Joi = require('joi');

const registerSchema = Joi.object({
    name: Joi.string().min(2).max(256).required(),
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    password: Joi.string().pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
    groupId: Joi.string().optional(),
    isManager: Joi.boolean().optional(),
    roles: Joi.array().items(Joi.string()).optional(),
});

const validateRegisterSchema = userInput => registerSchema.validateAsync(userInput);

module.exports = {
    validateRegisterSchema
}