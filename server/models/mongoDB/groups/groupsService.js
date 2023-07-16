const Group = require('./Group');

const createGroup = (groupData) => {
    const group = new Group(groupData);
    return group.save();
};

const getGroupById = (id) => {
    return Group.findById(id);
};

const getAllGroups = () => {
    return Group.find();
};

const updateGroup = (id, groupToUpdate) => {
    return Group.findByIdAndUpdate(id, groupToUpdate, { new: true });
};

const deleteGroup = (id) => {
    return Group.findByIdAndDelete(id);
};

module.exports = {
    createGroup,
    getGroupById,
    getAllGroups,
    updateGroup,
    deleteGroup
};
