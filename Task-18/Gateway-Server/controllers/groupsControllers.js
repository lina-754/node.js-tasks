const { fetchPOSTREQUEST ,fetchGETREQUEST } = require('../utils/fetchServer');


const createGroup = async (req, res) => {
    try {
        const data = await fetchPOSTREQUEST('http://127.0.0.1:3002/groups/creatnew', req.body); 
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getGroups = async (req, res) => {
    try {
        const data = await fetchGETREQUEST('http://127.0.0.1:3002/groups/getall');
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getGroupById = async (req, res) => {
    try {
        const groupId = req.params.id;
        const data = await fetchGETREQUEST(`http://127.0.0.1:3002/groups//get/:id${groupId}`);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createGroup, getGroups, getGroupById };
