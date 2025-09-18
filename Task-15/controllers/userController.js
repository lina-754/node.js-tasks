    const { usersData } = require("../models/user"); 
    
    const addUser = async (req, res) => {
    try {
        const { firstName, lastName, username, email, password, role } = req.body;
        if (!firstName || !lastName || !username || !email || !password || !role) {
            return res.status(400).json({ message: "All inputs are required" })
        }
        const newUser = new usersData({
        firstName,
        lastName,
        username,
        email,
        password,
        role,
        });

        await newUser.save();
        res.status(201).json({message: "User added successfully"});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
    };


    const getAllUsers = async (req, res) => {
    try {
        const Users = await usersData.find();
        res.json(Users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
    };

    const getUserById = async (req, res) => {
    try {
        const User = await usersData.findById(req.params.id);
        if (!User)
        return res.status(404).json({ message: "User not found" });
        res.json(User);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
    };

    const updateUser = async (req, res) => {
    try {
        const User = await usersData.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        });
        if (!User)
        return res.status(404).json({ message: "User not found" });
        res.json({ message: "User updated successfully", User });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
    };

    const deleteUser = async (req, res) => {
    try {
        const User = await usersData.findByIdAndDelete(req.params.id);
        if (!User)
        return res.status(404).json({ message: "User not found" });
        res.json({ message: "User deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
    };

    module.exports = {
    addUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    };
