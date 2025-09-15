const Post = require("../models/post");
const { usersData } = require("../models/users");

const addPost = async(req ,res)=>{
    try{
        const {content, media} = req.body;
        if (!content) {
        return res.status(400).json({ message: "Content is required" });
        }

        const user = await usersData.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const newPost = new Post({
            user: req.user.id,  
            content,
            media
    });

    const savedPost = await newPost.save();
    res.status(201).json({
        message: "Post created successfully",
        post: savedPost
    });
    }catch(error){
        console.error(error);
    }
}

const getAllPosts = async (req, res) => {
    try{
        const getPosts = await Post.find();
        return res.json({getPosts});
    }catch(error){
        console.error(error);
    }
}

const getPostById = async (req, res) => {
    try{
        const getId = req.params.id;
        if(!getId)return res.json({message:"need id"});

        const getPost = await Post.findById(getId);
        if(!getPost)return res.status(404).json({ message: "Post not found" });

        return res.json(getPost);
    }catch(error){
        console.error(error);
    }
}

const deletePost = async (req, res) => {
    try {
        const postId = req.params.id;

        if (!postId) {
            return res.status(400).json({ message: "Post ID is required" });
        }

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        if (post.user.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not authorized to delete this post" });
        }

        await post.deleteOne();
        return res.json({ message: "Post deleted successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = {addPost, getAllPosts, getPostById, deletePost}