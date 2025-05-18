const express = require("express")
const bcrypt = require("bcrypt")

const app = express();
app.use(express.json())
const user = []
const fs = require('fs');
const { json } = require("stream/consumers");
app.post("/Signup",async(req,res)=>{
const {username,password} = req.body;
// const hashUsername = await bcrypt.hash(username,10)
const hashPassword = await bcrypt.hash(password,10)
user.push({Username:username , Password:hashPassword})
fs.writeFileSync("datbase.json",user)
})
app.post("/Login",(req,res)=>{
    // const {username,password} = req.body;
    res.json(user.hashUsername)
    

})
app.post("/",(req,res)=>{
 if(!fs.existsSync("database.json")){
    fs.writeFileSync("database.json","Database is Ready \n" )
    res.status(200).json("Database is Ready")
    return
 }
 res.status(200).json("database is already created")

})
app.listen(8080,()=>{
    console.log("Server started")
})