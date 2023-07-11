const express = require('express');
const router = express.Router();
const handleError = require('../../utils/handleError');
const taskAccessData = require('../models/taskAccessData');
const userAccessData = require('../../users/models/userAccessData')
const taskValidationService = require('../../validation/taskValidationService');
const getUsersForTask = require('../helpers/getUsersForTaskService');
const areSameArray = require('../helpers/checkIfSameArray');

router.post('/', async (req, res) => {
    try {
        let taskData = req.body;
        await taskValidationService.createTaskValidation(taskData);
        taskData.members = await getUsersForTask(taskData);
        taskData.members.forEach(async memberId => await userAccessData.updateLastTask(memberId, taskData.rangeTime[1]));
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
        const originalTaskFromDB = await taskAccessData.getTaskById(req.params.id)
        if (originalTaskFromDB) {
            if (!areSameArray(originalTaskFromDB.members, req.body.members) ||
                !areSameArray(originalTaskFromDB.rangeTime, req.body.rangeTime)) {
                req.body.members.forEach(async memberId => {
                    const member = await userAccessData.getUserById(memberId);
                    if (member.endTaskDates.pop() > updatedTaskFromDB.rangeTime[0]) {
                        handleError(res, `the user ${member.name} in other task on that time`, 409);
                    }
                });
            };
            const updatedTaskFromDB = await taskAccessData.updateTask(
                req.params.id,
                req.body,
            );
            if (!areSameArray(originalTaskFromDB.members, req.body.members) ||
                !areSameArray(originalTaskFromDB.rangeTime, req.body.rangeTime)) {
                originalTaskFromDB.members.forEach(async memberId =>
                    await userAccessData.deleteSomeTask(memberId, originalTaskFromDB.rangeTime[1]));
                req.body.members.forEach(async memberId =>
                    await userAccessData.updateLastTask(memberId, req.body.rangeTime[1]));
            }
            res.json(updatedTaskFromDB);
        } else {
            handleError(res, "Undefind task", 404);
        }
    } catch (err) {
        handleError(res, err.message, 400);
    }
});

//Check if sould be option to change the requierd roles

router.delete('/:id', async (req, res) => {
    try {
        await taskValidationService.taskIdValidation(req.params.id);
        const dataFromDb = await taskAccessData.deleteTask(req.params.id);
        res.json({ message: `task - ${dataFromDb.name} deleted` })
    } catch (err) {
        handleError(res, err.message, 400);
    }
});


module.exports = router;