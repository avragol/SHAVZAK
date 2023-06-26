const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    name: {
        type: String,
        maxLength: 256,
        trim: true,
        minLength: 2,
        required: true,
    },
    email: {
        type: String,
        require: true,
        match: RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/),
        lowercase: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        match: RegExp(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
        ),
    },
    groupId: { type: mongoose.Schema.Types.ObjectId },
    isManager: { type: Boolean, default: false },
    roles: [String],
    endTaskDates: {
        type: [Date],
        default: [new Date(0)]
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const User = mongoose.model("users", schema);

module.exports = User;