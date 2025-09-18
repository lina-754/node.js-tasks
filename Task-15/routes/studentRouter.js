const express = require("express");
const {
    addStudent,
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent,
} = require("../controllers/studentController"); 

const router = express.Router();

router.post("/addStudent", addStudent);
router.get("/getAllStudents", getAllStudents);
router.get("/getStudent/:id", getStudentById);
router.put("/updateStudent/:id", updateStudent);
router.delete("/deleteStudent/:id", deleteStudent);

module.exports = router;
