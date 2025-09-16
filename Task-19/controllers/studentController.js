    const { studentSchema } = require("../models/studentSchema"); 
    
    const addStudent = async (req, res) => {
    try {
        const { firstName, lastName, username, email, password, role } = req.body;
        if (!firstName || !lastName || !username || !email || !password || !role) {
            return res.status(400).json({ message: "All inputs are required" })
        }
        const newStudent = new studentSchema({
        firstName,
        lastName,
        username,
        email,
        password,
        role,
        });

        await newStudent.save();
        res.status(201).json({message: "Student added successfully"});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
    };


    const getAllStudents = async (req, res) => {
    try {
        const students = await studentSchema.find();
        res.json(students);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
    };

    const getStudentById = async (req, res) => {
    try {
        const student = await studentSchema.findById(req.params.id);
        if (!student)
        return res.status(404).json({ message: "Student not found" });
        res.json(student);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
    };

    const updateStudent = async (req, res) => {
    try {
        const student = await studentSchema.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        });
        if (!student)
        return res.status(404).json({ message: "Student not found" });
        res.json({ message: "Student updated successfully", student });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
    };

    const deleteStudent = async (req, res) => {
    try {
        const student = await studentSchema.findByIdAndDelete(req.params.id);
        if (!student)
        return res.status(404).json({ message: "Student not found" });
        res.json({ message: "Student deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
    };

    module.exports = {
    addStudent,
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent,
    };
