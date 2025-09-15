const express = require("express");
const router = express.Router();
const { createGroup, getGroups, getGroupById } = require("../controllers/groupsControllers");
const { checkAuth } = require("../middleware/checkAuth");


router.post("/creatnew", checkAuth, createGroup);
router.get("/getall", getGroups);
router.get("/get/:id", getGroupById);

module.exports = router;
