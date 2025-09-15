    const Group = require("../models/group");


    const createGroup = async (req, res) => {
    try {
        const { name, description, groupImage } = req.body;

        if (!name) return res.status(400).json({ message: "Group name is required" });

        const group = await Group.create({
        name,
        description,
        admin: req.user.id,
        members: [req.user.id], 
        groupImage
        });

        res.status(201).json({ message: "Group created successfully", group });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    };

    const getGroups = async (req, res) => {
    try {
        const groups = await Group.find()
        res.json(groups);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    };


    const getGroupById = async (req, res) => {
    try {
        const groupId = req.params.id;
        if (!groupId) return res.status(400).json({ message: "Group ID is required" });

        const group = await Group.findById(groupId);
        if (!group) return res.status(404).json({ message: "Group not found" });

        res.json(group);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    };

    module.exports = { createGroup, getGroups, getGroupById };
