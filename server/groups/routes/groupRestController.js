const express = require('express');
const router = express.Router();
const handleError = require('../../utils/handleError');
const groupAccessData = require('../models/groupAccessData');
const groupValidationService = require('../../validation/groupValidationService');

router.post('/', async (req, res) => {
    try {
        await groupValidationService.groupValidation(req.body);
        const dataFromDB = await groupAccessData.createGroup(req.body);
        res.json(dataFromDB);
    } catch (err) {
        handleError(res, err.message, 404);
    }
});

router.get('/', async (req, res) => {
    try {
        const dataFromDB = await groupAccessData.getAllGroups();
        res.json(dataFromDB);
    } catch (err) {
        handleError(res, err.message, 400);
    }
});

router.get('/:id', async (req, res) => {
    try {
        await groupValidationService.groupIdValidation(req.params.id);
        const dataFromDB = await groupAccessData.getGroupById(req.params.id);
        if (dataFromDB) {
            res.json(dataFromDB);
        } else {
            handleError(res, "Undefined group", 404);
        }
    } catch (err) {
        handleError(res, err.message, 400);
    }
});

router.put('/:id', async (req, res) => {
    try {
        await groupValidationService.groupIdValidation(req.params.id);
        await groupValidationService.groupValidation(req.body);
        const dataFromDB = await groupAccessData.updateGroup(
            req.params.id,
            req.body
        );
        if (dataFromDB) {
            res.json(dataFromDB);
        } else {
            handleError(res, "Undefined group", 404);
        }
    } catch (err) {
        handleError(res, err.message, 400);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await groupValidationService.groupIdValidation(req.params.id);
        const dataFromDB = await groupAccessData.deleteGroup(req.params.id);
        res.json({ message: `Group - ${dataFromDB.name} deleted` });
    } catch (err) {
        handleError(res, err.message, 400);
    }
});

module.exports = router;
