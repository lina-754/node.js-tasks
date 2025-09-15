const express = require("express");
const router = express.Router();
const  { createReel, getReels, getReelById } = require("../controllers/reelsController");
const { checkAuth } = require("../middleware/checkAuth");


router.post("/add", checkAuth, createReel);
router.get("/getall", getReels);
router.get("/get/:id", getReelById);

module.exports = router;
