const express = require('express');
const router = express.Router();
const handleError = require('../../utils/handleError');
const userAccessData = require('../models/userAccessData');
const userValidationService = require('../../validation/userValidationService');
const hashService = require('../../utils/hash/hashService');
const tokenService = require('../../utils/token/tokenService');

router.post('/', async (req, res) => {
    try {
        await userValidationService.registerUserValidation(req.body);
        req.body.password = await hashService.generateHash(req.body.password);
        const dataFromDB = await userAccessData.registerUser(req.body);
        res.json(dataFromDB);
    } catch (err) {
        handleError(res, err.message, 404)
    }
});

router.post('/login', async (req, res) => {
    try {
        await userValidationService.loginUserValidation(req.body);
        let { email, password } = req.body;
        let dataFromDB = await userAccessData.getUserByEmail(email);
        if (!dataFromDB || !(await hashService.cmpHash(password, dataFromDB.password))) {
            throw new Error("Invaild email or password");
        } else {
            let token = await tokenService.generateToken({
                isManger: dataFromDB.isManager,
                groupId: dataFromDB.groupId,
                _id: dataFromDB._id
            });
            res.json({ message: "done!", token });
        }
    } catch (err) {
        handleError(res, err.message, 404)
    }
});

router.get('/', async (req, res) => {
    try {
        const dataFromDB = await userAccessData.getAllUsers();
        res.json(dataFromDB);
    } catch (err) {
        handleError(res, err.message, 400);
    }
});

router.get('/:id', async (req, res) => {
    try {
        await userValidationService.userIdValidation(req.params.id);
        const dataFromDB = await userAccessData.getUserById(req.params.id);
        if (dataFromDB) {
            res.json(dataFromDB);
        } else {
            handleError(res, "Undefind user", 404);
        }
    } catch (err) {
        handleError(res, err.message, 400);
    }
});

router.put('/:id', async (req, res) => {
    try {
        await userValidationService.userIdValidation(req.params.id);
        await userValidationService.updateUserValidation(req.body);
        const dataFromDB = await userAccessData.updateUser(
            req.params.id,
            req.body,
        );
        if (dataFromDB) {
            res.json(dataFromDB);
        } else {
            handleError(res, "Undefind user", 404);
        }
    } catch (err) {
        handleError(res, err.message, 400);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await userValidationService.userIdValidation(req.params.id);
        const dataFromDb = await userAccessData.deleteUser(req.params.id);
        res.json({ message: `user - ${dataFromDb.name} deleted` })
    } catch (err) {
        handleError(res, err.message, 400);
    }
});


module.exports = router;