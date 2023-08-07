import Joi from 'joi';

const CreateTaskSchema = {
    name: Joi.string().min(2).max(256).required(),
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    password: Joi.string().pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
        .messages({ 'string.pattern.base': `Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character from @$!%*?&.` }),
    groupId: Joi.string().optional(),
    roles: Joi.array().items(Joi.string()).optional(),
};


export default CreateTaskSchema;