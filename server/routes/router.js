const express = require('express');
const router = express.Router();
const handleError = require('../utils/handleError');
const usersRouter = require('../users/routes/userRestController');

router.use('/users', usersRouter)

router.use((req, res) => handleError(res, 'api not found', 404));

module.exports = router;