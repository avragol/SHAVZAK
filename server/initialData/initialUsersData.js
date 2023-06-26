const userAccessData = require('../users/models/userAccessData');
const userValidationService = require('../validation/userValidationService');
const hashService = require('../utils/hash/hashService');
const handleError = require('../utils/handleError');
const users = require('./users.json');

const initialUsersData = () => {
    users.forEach(async (user) => {
        try {
            await userValidationService.registerUserValidation(user);
            user.password = await hashService.generateHash(user.password);
            const dataFromDB = await userAccessData.registerUser(user);
            console.log(dataFromDB);
        } catch (err) {
            handleError(res, err.message, 404)
        }
    });
}

module.exports = initialUsersData;