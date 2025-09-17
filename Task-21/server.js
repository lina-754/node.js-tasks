const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const cors = require('cors');

const { connectDB } = require('./config/connectDB');
const { usersData } = require('./models/user')
const {checkAuth} = require('./middleware/checkAuth');
const {SendEmailToUser} = require('./utils/mailSender');
const {otpData} = require('./models/otp');



const app = express();
const server = http.createServer(app);
const io = new Server(server);




app.use(express.json());
app.use(cors())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 5,
        httpOnly: true
    }
}))
app.set('view engine' , 'ejs')
app.set('views', path.join(__dirname, '/views'))
app.use(express.static(path.join(__dirname, '/public')))
connectDB();
