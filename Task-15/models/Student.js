const mongoose = require('mongoose');
const students = new mongoose.Schema({
    firstName:{
        type:String,
        required:true},
    lastName:{
        type:String,
        required:true},
    username:{
        type:String,
        required:true},
    email:{
        type:String,
        required:true},
    password:{
        type:String,
        required:true},
    role:{
        type:String,
        enum:["user","admin"],
        default:'user'},
    createdAt:{
        type:Date,
        default:Date.now},
    age: Number,
    class: String,
    createdAt:{type:Date,default:Date.now}
})
module.exports= mongoose.model('students',students);