const { fetchPOSTREQUEST, fetchGETREQUEST } = require('../utils/fetchServer');


const createReel = async (req, res) => {
    try {
        const data = await fetchPOSTREQUEST('http://127.0.0.1:3003/reels/add', req.body);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getReels = async (req, res) => {
    try {
        const data = await fetchGETREQUEST('http://127.0.0.1:3003/reels/getall');
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getReelById = async (req, res) => {
    try {
        const reelId = req.params.id;
        const data = await fetchGETREQUEST(`http://127.0.0.1:3003/reels/get/:id/${reelId}`);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createReel, getReels, getReelById };
