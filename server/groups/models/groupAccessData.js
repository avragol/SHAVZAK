const groupsServiceMongo = require("../../models/mongoDB/groups/groupsService");
const config = require('config');

const dbOption = config.get("dbOption");

const createGroup = (groupData) => {
    switch (dbOption) {
        case "mongo":
        default:
            return groupsServiceMongo.createGroup(groupData);
    }
};

const getGroupById = (id) => {
    switch (dbOption) {
        case "mongo":
        default:
            return groupsServiceMongo.getGroupById(id);
    }
};

const getAllGroups = () => {
    switch (dbOption) {
        case "mongo":
        default:
            return groupsServiceMongo.getAllGroups();
    }
};

const updateGroup = (id, groupToUpdate) => {
    switch (dbOption) {
        case "mongo":
        default:
            return groupsServiceMongo.updateGroup(id, groupToUpdate);
    }
};

const deleteGroup = (id) => {
    switch (dbOption) {
        case "mongo":
        default:
            return groupsServiceMongo.deleteGroup(id);
    }
};

module.exports = {
    createGroup,
    getGroupById,
    getAllGroups,
    updateGroup,
    deleteGroup
};
