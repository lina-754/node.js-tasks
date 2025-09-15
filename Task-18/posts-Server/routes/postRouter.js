const express = require("express");
const router = express.Router();
const {addPost, getAllPosts, getPostById, deletePost} = require("../controllers/postsControllers");
const { checkAuth } = require("../middleware/checkAuth");

// Routes
router.post("/addpost", checkAuth, addPost); 
router.get("/AllPosts", checkAuth, getAllPosts);  
router.get("/addpost/:id", checkAuth, getPostById); 
router.delete("/deletePost/:id", checkAuth, deletePost); 

module.exports = router;