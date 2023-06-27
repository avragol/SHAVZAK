const mongoose = require("mongoose");

const RequierdRole = new mongoose.Schema({
    title: {
        type: String,
        maxLength: 256,
        trim: true,
        minLength: 2,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
        trim: true,
        minLength: 1,
    }
});

const schema = new mongoose.Schema({
    name: {
        type: String,
        maxLength: 256,
        trim: true,
        minLength: 2,
        required: true,
    },
    groupId: { type: mongoose.Schema.Types.ObjectId },
    requierdRoles: [RequierdRole],
    rangeTime: {
        type: [Date],
        minLength: 2,
        maxLength: 2,
        required: true
    },
    members: [String],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Task = mongoose.model("tasks", schema);

module.exports = Task;