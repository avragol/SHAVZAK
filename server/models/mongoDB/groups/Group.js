const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        maxLength: 256,
        trim: true,
        minLength: 2,
        required: true,
    },
    members: [String],
    managerId: {
        type: mongoose.Schema.Types.ObjectId,
    },
});

const Group = mongoose.model("groups", groupSchema);

module.exports = Group;
