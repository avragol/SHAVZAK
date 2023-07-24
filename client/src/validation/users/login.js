import Joi from 'joi';

const loginSchema = {
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    password: Joi.string().pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
        .messages({ 'string.pattern.base': `Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character from @$!%*?&.` }),
};


export default loginSchema;