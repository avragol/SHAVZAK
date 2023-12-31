const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('./utils/loggers/loggerService');
const cors = require('cors');
const handleError = require('./utils/handleError');
const router = require('./routes/router');
const app = express();

/* SETTINGS */
app.use(cors());
app.use(logger());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


/* ROUTER */
app.use("/api", router);
app.use((req, res) => {
    handleError(res, "page not found", 404);
});

/* ERROR HANDELER */
app.use((err, req, res, next) => {
    handleError(res, err.message, 500);
})


module.exports = app;