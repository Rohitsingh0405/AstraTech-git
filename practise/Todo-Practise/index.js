const express = require("express")
const bcrypt = require("bcrypt")
const app = express();
const user = []
const fs = require('fs')
app.post("/Signup",(req,res)=>{
const {username,password} = req.body;
const hashPassword = bcrypt.hash(password,10)
user.push({Username:username , Password:hashPassword})
fs.writeFileSync("datbase.json",user)
})
app.post("/Login",(req,res)=>{
    
})
app.post("/",(req,res)=>{
 if(!fs.existsSync("database.json")){
    fs.writeFileSync("database.json","Database file \n")
 }
})
app.listen(8080,()=>{
    console.log("Server started")
})