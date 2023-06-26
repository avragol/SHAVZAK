const express = require('express');
const router = express.Router();
const handleError = require('../../utils/handleError');
const userAccessData = require('../models/userAccessData');
const userValidationService = require('../../validation/userValidationService');

router.post('/', async (req, res) => {
    try {
        await userValidationService.registerUserValidation(req.body);
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
        res.json({ msg: "done!", dataFromDB });
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

router.patch('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await userValidationService.userIdValidation(id);
        await userAccessData.updateBizUser(id);
        res.json({ msg: "done" });
    } catch (err) {
        handleError(res, err.message, 400);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await userValidationService.userIdValidation(req.params.id);
        const dataFromDb = await userAccessData.deleteUser(req.params.id);
        res.json({ msg: `user - ${dataFromDb.name.first} ${dataFromDb.name.last} deleted` })
    } catch (err) {
        handleError(res, err.message, 400);
    }
});


module.exports = router;