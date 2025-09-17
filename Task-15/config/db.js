const Module = require('module');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({path: path.join(__dirname,"../.env")});

const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
    }
    catch(ERROR){
        console.log(error)
    }
}
module.exports={connectDB}