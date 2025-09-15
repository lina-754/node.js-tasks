const { fetchPOSTREQUEST, fetchGETREQUEST, fetchDELETEREQUEST } = require('../utils/fetchServer');


const addPost = async (req, res) => {
    try {
        const data = await fetchPOSTREQUEST('http://127.0.0.1:3001/posts/addpost', req.body);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllPosts = async (req, res) => {
    try {
        const data = await fetchGETREQUEST('http://127.0.0.1:3001/posts/AllPosts');
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getPostById = async (req, res) => {
    try {
        const postId = req.params.id;
        const data = await fetchGETREQUEST(`http://127.0.0.1:3001/posts//addpost/:id${postId}`);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deletePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const data = await fetchDELETEREQUEST(`http://127.0.0.1:3001/posts//deletePost/:id${postId}`);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { addPost, getAllPosts, getPostById, deletePost };
