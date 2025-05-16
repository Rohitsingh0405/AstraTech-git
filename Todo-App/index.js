const express = require('express')
const fs = require('fs')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const { json } = require('stream/consumers');
const app = express();
app.use(express.json())

require('dotenv').config
const user = [];

const createDatabase = ()=>{
    fs.writeFileSync("dataBase.json",JSON.stringify(user))
}

const tokenVerify = (req,res,next)=>{

    const token1 = req.headers.authorization
    const token11 = token1.split(" ")
    console.log(token11)
    

   
   
    const verified = jwt.verify(token11[1],process.env.JWT_SECRET)
    console.log(req.userData)
    next();
    
}


app.post("/Signup",async(req,res)=>{

const {username,password} = req.body
console.log("Eror kya hai")
const hashpass =await bcrypt.hash(password,10)
user.push({username,password:hashpass})
const readData = fs.readFileSync("database.json",'utf-8')
const readDataParse = JSON.parse(readData)
const findUser = readDataParse.find((users)=>users.username == username) //Ek naam ka ek he user hoga 
console.log(readDataParse)
 if(findUser){
    res.status(200).json({Message:"User already exits"})
    return
}

// writeDataFuntion()
readDataParse.push({username,password:hashpass})
fs.writeFileSync('database.json',JSON.stringify(readDataParse,null,2))
// findUser = readDataParse.find((users)=>users.username == username) //Ek naam ka ek he user hoga 

res.json("You are now Signed Up")

})
app.post("/Login",async(req,res)=>{
    const{username,password} = req.body;
     readDataFunction()
    const hash1 = await bcrypt.compare(password,findUser.password)
    if(hash1){

        const token = jwt.sign({username},process.env.JWT_SECRET,{expiresIn:'12h'})
        res.status(200).json({Message:"You are now logged in"})

        return
    }
    
    res.status(404).json({Message:"You password is incorrect "})
})
app.get("/Access",(req,res)=>{
res.json("hi")
})

app.listen(8080,()=>{
    if(!fs.existsSync("dataBase.json")){
        createDatabase();
    }
    console.log("Server started")
})