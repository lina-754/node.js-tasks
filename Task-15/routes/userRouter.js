const express = require("express");
const {
    addUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    }= require("../controllers/userController "); 

const router = express.Router();

router.post("/add-user", addUser);
router.get("/getAllUsers", getAllUsers);
router.get("/getUser/:id", getUserById);
router.put("/updateUser/:id", updateUser);
router.delete("/deleteUser/:id", deleteUser);

module.exports = router;
