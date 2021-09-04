const express = require("express");
const morgan = require('morgan');
const dotenv = require("dotenv");
const bodyparser =require('body-parser');
const path = require('path');
const { Router } = require("express");
const cnnectDB = require('./server/database/connection');
const connectDB = require("./server/database/connection");


const app = express();

dotenv.config({path:'config.env'})
const PORT = process.env.PORT || 8080
//log request
app.use(morgan('tiny'));

connectDB();


//parse request to body parser
app.use(bodyparser.urlencoded({extended:true}))

//set view engine
app.set("view engine","ejs")
//app.set("views",path.resolve(__dirname,"views/ejs"));

//load assest
app.use('/css', express.static(path.resolve(__dirname,"assets/css")))
app.use('/img', express.static(path.resolve(__dirname,"assets/img")))
app.use('/js', express.static(path.resolve(__dirname,"assets/js")))

//load Routers
app.use('/',require('./server/routes/router'));

app.listen(process.env.PORT,() =>{console.log("server is running");})
