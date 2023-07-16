const Joi = require('joi');

module.exports = (groupData) => {
    const schema = Joi.object({
        name: Joi.string().trim().min(2).max(256).required(),
        members: Joi.array().items(Joi.string().hex().length(24)),
        managerId: Joi.string().required(),
    });

    return schema.validateAsync(groupData);
};