const {usersData} = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async(req ,res)=>{
    try{
        const {firstName, lastName, username, email, password} = req.body;
        if(!firstName || !lastName || !username || !email || !password){
            return res.status(400).json({message:"All feilds are required"});
        }
        const checkUser = await usersData.findOne({$or: [{usernam:username},{email:email}]});
        if(checkUser){
            if (checkUser.username === username) {
                return res.status(400).json({ message: "Username already exists" });
            } else if (checkUser.email === email) {
                return res.status(400).json({ message: "Email already exists" });
            }
        }
        if (password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters" });
        }
        const hashPassword = bcrypt.hash(password);
        const addUser = new usersData({
            firstName, lastName, username, email, 
            password:hashPassword
        });
        await addUser.save();
        const token = jwt.sign({firstName, lastName, email, role : "user"},process.env.JWT_SECRET,{expiresIn:"1m"});
        req.session.token = token;
        
    }catch(error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports={register};