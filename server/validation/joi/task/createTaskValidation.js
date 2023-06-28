const Joi = require('joi');

const RequierdRoleSchema = Joi.object({
    title: Joi.string().trim().min(2).max(256).required(),
    amount: Joi.number().min(1).required(),
});

const taskSchema = Joi.object({
    name: Joi.string().trim().min(2).max(256).required(),
    groupId: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
    requierdRoles: Joi.array().items(RequierdRoleSchema),
    rangeTime: Joi.array().items(Joi.date()).length(2).required(),
});

const validationTaskSchema = taskInput => taskSchema.validateAsync(taskInput);

module.exports = validationTaskSchema;
