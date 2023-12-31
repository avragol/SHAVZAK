const User = require('./User');

const registerUser = userData => {
    const user = new User(userData);
    return user.save();
};

const getUserByEmail = (email) => {
    return User.findOne({ email });
};

const getAllUsers = () => {
    return User.find().select(["-password"]);
}

const getUserById = id => {
    return User.findById(id).select(["-password"]);
}

const updateUser = (id, userToUpdate) => {
    return User.findByIdAndUpdate(id, userToUpdate, { new: true }).select(["-password"]);
}

const updateLastTask = (id, lastTask) => {
    return User.findByIdAndUpdate(id, { $push: { endTaskDates: lastTask } }, { new: true }).select(["-password"]);
};

const deleteSomeTask = (id, taskDate) => {
    return User.findByIdAndUpdate(id, { $pull: { endTaskDates: taskDate } }, { new: true }).select(["-password"]);
};

const deleteUser = (id) => {
    return User.findByIdAndDelete(id).select(["-password", "-createdAt", "-__v"]);
}

module.exports = {
    registerUser,
    getUserById,
    getAllUsers,
    getUserByEmail,
    updateUser,
    updateLastTask,
    deleteSomeTask,
    deleteUser,
}