const express = require("express");
const {connectDB} = require("./config/db");
const cors = require("cors");
const session = require("express-session");
const auth = require("./routes/auth");
const { checkToken } = require('./middleware/checkAuth');

const app = express();


app.use(express.json())
const ips = ['http://127.0.0.1:3000', "http://localhost:3000", "http://127.0.0.1:5500"];
app.use(cors({
    origin:(origin,callback)=>{
        try{
            if(!origin || ips.includes(origin)){
                callback(null,true);
            }
            else{
                callback("Not allowed by CORS");
            }
        }
        catch(error){
            console.log(error);
        }
    }
}))
app.use(session({

}))

connectDB()
app.use('/auth', authRouter)
