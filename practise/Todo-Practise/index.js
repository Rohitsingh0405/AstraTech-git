const express = require("express")
const app = express();
const user = []
const fs = require('fs')
app.post("/Signup",(req,res)=>{
const {username,password} = req.body;
const data = user.push({Username:username , Password:password})
fs.writeFileSync("database.json",data)

})
app.post("/Login",(req,res)=>{

})
app.listen(8080,()=>{
    console.log("Server started")
})