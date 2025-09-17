const mongoose = require('mongoose');

const otp = new mongoose.Schema({
    email: {type:String,required:true},
    otp: {type:Number,required:true},
    createdAt : {
        type : Date,
        expires : 300,
        default : Date.now
    }
    });

module.exports = mongoose.model('otps', otp);
