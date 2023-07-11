const mongoose = require("mongoose");
const config = require("config");

const connectToMongo = () => {
    return mongoose.connect(process.env.MONGODB_CONFIG);
};

module.exports = connectToMongo;