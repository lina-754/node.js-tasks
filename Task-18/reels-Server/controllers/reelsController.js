    const { Reel } = require("../models/reel");


    const createReel = async (req, res) => {
    try {
        const { video, caption } = req.body;
        if(!video)return res.json({message:"video require"});

        const reel = await Reel.create({
        user: req.user.id,
        video,
        caption
        });

        res.status(201).json(reel);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    };


    const getReels = async (req, res) => {
    try {
        const reels = await Reel.find()
        res.json(reels);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    };


    const getReelById = async (req, res) => {
    try {
        const getId = req.params.id;
        if(!getId)return res.json({message:"need id"});

        const reel = await Reel.findById(getId)
        if (!reel) return res.status(404).json({ message: "Reel not found" });

        res.json(reel);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    };

    module.exports = { createReel, getReels, getReelById };
