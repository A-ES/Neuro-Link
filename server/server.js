const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const app = express();
const PORT = 3001;

//attaching middlewares to the main express app
app.use(cors());
app.use(express.json()); // incoming raw data to json 

//defining a get route
app.get('/', (req,res)=>{
    res.send("NeuroLink Running");
    console.log("NeuroLink Running");

});

//Connecting to mongodb
mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("DB connected"))
.catch((err)=>console.log(err));

//starting server
app.listen(PORT, ()=>{
    console.log("Server Running");
})
