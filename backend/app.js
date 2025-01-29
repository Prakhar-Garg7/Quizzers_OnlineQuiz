const express = require("express");
const cookieparser = require("cookie-parser");
const cors = require("cors")
const path = require("path");
require("dotenv").config();

const db = require("./db/mongoose");

const app = express();

app.use(
    cors({
        origin:process.env.client
        ,credentials:true
    })
)

app.use(cookieparser())
app.use(express.json())
app.use(express.urlencoded({extended: true}));

app.use((err,req,res,next)=>{
    console.log(err.stack);
    res.status(500).send("Internal Server Error")
})

const routes = require("./routes/index.routes")

app.use('/api',routes);

app.listen(process.env.PORT,()=>{
    console.log("Server is on :",process.env.PORT)
})