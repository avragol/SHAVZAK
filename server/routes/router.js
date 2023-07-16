const express = require('express');
const router = express.Router();
const handleError = require('../utils/handleError');
const usersRouter = require('../users/routes/userRestController');
const tasksRouter = require('../tasks/routes/taskRestController');
const groupsRouter = require('../groups/routes/groupRestController');

router.use('/users', usersRouter);
router.use('/tasks', tasksRouter);
router.use('/groups', groupsRouter);

router.use((req, res) => handleError(res, 'api not found', 404));

module.exports = router;