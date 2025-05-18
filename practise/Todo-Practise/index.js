const express = require("express")
const bcrypt = require("bcrypt")

const app = express();
app.use(express.json())
const user = []
const fs = require('fs');
const { json } = require("stream/consumers");

app.post("/Signup",async(req,res)=>{
const {username,password} = req.body;


// bcrypt.compare(password,fullDataExist.find((user1)=>{
    //     user1.password
    // }))
    
    const hashUsername = await bcrypt.hash(username,10)
    const hashPassword = await bcrypt.hash(password,10)
    
    user.push({Username:hashUsername , Password:hashPassword})
    const data = {Username:hashUsername,Password:hashPassword}
    const data1 = JSON.stringify(data,null,2)
    fs.appendFileSync("database.json",data1)
    const data2 = fs.readFileSync("database.json",'utf-8')
    res.json(data2)
    // const fullDataExist = fs.readFileSync("database.json",'utf-8')
    // console.log(fullDataExist)
    // fs.appendFileSync("database.json",JSON.stringify(user,null,2))
    // // const fullDataExist = JSON.parse(fullData)
    // const person = bcrypt.compare(username,fullDataExist.find((user)=>{
    //     user.username
    // }))
    // const personPassword = bcrypt.compare(password,fullDataExist.find((user)=>{
    //     user.password
    // }))
    
    // if(person && !personPassword){
    //         res.status(200).json("User already exists with this name")
    //     return
    //     }
    
    //     res.status(200).json("You are already signed up")
        
    res.status(200).json("You are Signed UP")
})
app.post("/Login",(req,res)=>{
    // const {username,password} = req.body;
    res.json(user.hashUsername)
    

})
app.post("/",(req,res)=>{
 if(!fs.existsSync("database.json")){
    fs.writeFileSync("database.json"," " )
    res.status(200).json("Database is Ready")
    return
 }
 res.status(200).json("database is already created")

})
app.listen(8080,()=>{
    console.log("Server started")
})