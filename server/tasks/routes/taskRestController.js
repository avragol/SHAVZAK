const express = require('express');
const router = express.Router();
const handleError = require('../../utils/handleError');
const taskAccessData = require('../models/taskAccessData');
const { updateLastTask } = require('../../users/models/userAccessData')
const taskValidationService = require('../../validation/taskValidationService');
const getUsersForTask = require('../helpers/getUsersForTaskService');

router.post('/', async (req, res) => {
    try {
        let taskData = req.body;
        await taskValidationService.createTaskValidation(taskData);
        taskData.members = await getUsersForTask(taskData);
        taskData.members.forEach(async memberId => await updateLastTask(memberId, taskData.rangeTime[1]));
        const dataFromDB = await taskAccessData.createTask(taskData);
        res.json(dataFromDB);
    } catch (err) {
        handleError(res, err.message, 400)
    }
});

router.get('/', async (req, res) => {
    try {
        const dataFromDB = await taskAccessData.getAllTasks();
        res.json(dataFromDB);
    } catch (err) {
        handleError(res, err.message, 400);
    }
});

router.get('/:id', async (req, res) => {
    try {
        await taskValidationService.taskIdValidation(req.params.id);
        const dataFromDB = await taskAccessData.getTaskById(req.params.id);
        if (dataFromDB) {
            res.json(dataFromDB);
        } else {
            handleError(res, "Undefind task", 404);
        }
    } catch (err) {
        handleError(res, err.message, 400);
    }
});

router.put('/:id', async (req, res) => {
    try {
        await taskValidationService.taskIdValidation(req.params.id);
        await taskValidationService.updateTaskValidation(req.body);
        const dataFromDB = await taskAccessData.updateTask(
            req.params.id,
            req.body,
        );
        //TODO - update the lastTask for the correct users considering a possible change in members and the time range
        if (dataFromDB) {
            res.json(dataFromDB);
        } else {
            handleError(res, "Undefind task", 404);
        }
    } catch (err) {
        handleError(res, err.message, 400);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await taskValidationService.taskIdValidation(req.params.id);
        const dataFromDb = await taskAccessData.deleteUser(req.params.id);
        res.json({ msg: `task - ${dataFromDb.name} deleted` })
    } catch (err) {
        handleError(res, err.message, 400);
    }
});


module.exports = router;