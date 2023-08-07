import Joi from "joi";

const RequierdRoleSchema = {
    title: Joi.string().trim().min(2).max(256).required(),
    amount: Joi.number().min(1).required(),
};

const createTaskSchema = {
    name: Joi.string().trim().min(2).max(256).required(),
    groupId: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
    rangeTime: Joi.array()
        .items(Joi.date().min('now'))
        .length(2)
        .required(),
};


export { createTaskSchema, RequierdRoleSchema };