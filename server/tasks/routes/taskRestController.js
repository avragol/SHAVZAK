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

/* manual change */
router.put('/:id', async (req, res) => {
    try {
        await taskValidationService.taskIdValidation(req.params.id);
        await taskValidationService.updateTaskValidation(req.body);
        const originalTaskFromDB = await taskAccessData.getTaskById(req.params.id)
        if (originalTaskFromDB) {
            if (!areSameArray(originalTaskFromDB.requierdRoles, req.body.requierdRoles)) {
                handleError(res, `for generate users for other roles, use the correct API`)
            }
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


/* automtic change */
router.put('/roles/:id', async (req, res) => {
    try {
        await taskValidationService.taskIdValidation(req.params.id);
        await taskValidationService.updateTaskValidation(req.body);
        const originalTaskFromDB = await taskAccessData.getTaskById(req.params.id);
        const requierdRolesFromDB = originalTaskFromDB.requierdRoles.map(role => {
            return { title: role.title, amount: role.amount }
        });
        const requierdRolesFromClient = req.body.requierdRoles.map(role => {
            return { title: role.title, amount: role.amount }
        });
        if (originalTaskFromDB) {
            if (areSameArray(requierdRolesFromDB, requierdRolesFromClient)) {
                return handleError(res, `no change on the role array, for change other parameters manually, use the correct API`, 400);
            };
            const originalRangeTime = originalTaskFromDB.rangeTime.map(i => i.toISOString())
            if (originalTaskFromDB.name !== req.body.name ||
                originalTaskFromDB.groupId.toHexString() !== req.body.groupId ||
                !areSameArray(originalTaskFromDB.members, req.body.members) ||
                !areSameArray(originalRangeTime, req.body.rangeTime)) {
                return handleError(res, `for change other parameters manually, use the correct API`, 400);
            }
            originalTaskFromDB.members.forEach(async memberId =>
                await userAccessData.deleteSomeTask(memberId, originalTaskFromDB.rangeTime[1]));
            req.body.members = await getUsersForTask(req.body);
            req.body.members.forEach(async memberId => await userAccessData.updateLastTask(memberId, req.body.rangeTime[1]));
            const updatedTaskFromDB = await taskAccessData.updateTask(
                req.params.id,
                req.body,
            );
            res.json(updatedTaskFromDB);
        } else handleError(res, "User Undefined", 404);
    } catch (err) {
        handleError(res, err.message, 400);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await taskValidationService.taskIdValidation(req.params.id);
        const task = await taskAccessData.getTaskById(req.params.id);
        task.members.forEach(async member =>
            await userAccessData.deleteSomeTask(member, task.rangeTime[1]));
        const dataFromDb = await taskAccessData.deleteTask(req.params.id);
        res.json({ message: `task - ${dataFromDb.name} deleted and the history of the members was updated` })
    } catch (err) {
        handleError(res, err.message, 400);
    }
});


module.exports = router;