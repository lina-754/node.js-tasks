const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config({path : path.join(__dirname, "./.env")})
const { checkToken } = require('./middleware/checkToken');
const {connectDB} = require('./config/connDB');
connectDB();


const app = express();

app.use(express.json())
app.use(cors())
app.use(checkToken)

const authRouter = require("./routes/authRouter");
const userRouter = require("./routes/userRouter");
const studentRouter = require("./routes/studentRouter");

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/student", studentRouter);

mongoose.connection.once('open', () => {
console.log('Database connected......');
app.listen(8000, () => {
    console.log('Server started......');
});
})


mongoose.connection.on('error', (error) => {
console.error(error);
});