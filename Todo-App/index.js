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
const createUserDatabase = (usr)=>{
    fs.writeFileSync(`${usr}.txt`)
}
const tokenVerify = (req,res,next)=>{

    const token1 = req.headers.authorization
    const token11 = token1.split(" ")
    console.log(token11)
    const verified = jwt.verify(token11[1],process.env.JWT_SECRET)
    console.log(req.userData)
    next;
    return verified
    
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
app.post("/addTodo",(req,res)=>{
   const usr =  tokenVerify()
   if(!usr){
    res.status(404).json({Message:"You are not sending the token"})
    return
   }
   if(!fs.existsSync(`${usr}.txt`)){
    createUserDatabase(usr)
   }
 const {data} = req.body
 fs.writeFile(`${usr}.txt`,data,'utf-8')
})
app.get("/seeTodo",(req,res)=>{
    const usr = tokenVerify()
     if(!usr){
    res.status(404).json({Message:"You are not sending the token"})
    return
   }
   fs.readFile(`${usr}.txt`,'utf-8',(err,data)=>{
    res.status(200).json({Your_todos:data})
   })
})

app.post("/deleteTodo",(req,res)=>{
    const usr =  tokenVerify()
   if(!usr){
    res.status(404).json({Message:"You are not sending the token"})
    return
   }
  const {del} = req.body;
  const readData = fs.readFileSync("database.json",'utf-8')
  const newData = readData.replace(del,'') 
  fs.writeFileSync(`${usr}.txt`,newData,'utf-8');


})
app.post("/admin",(req,res)=>{
    const{username,password} = req.body
    const a = fs.readFileSync("admin.json",'utf-8')
    const ues =  a.find((usr)=>usr.username == username && usr.password == password)
    // return 
    if(!ues){
        res.json({Message:"You id password for admin does not match "})
    }
    const rd = fs.readFileSync("database.json",'utf-8')

    res.status(200).json({Message:rd})
    const {del} = req.body;
    fs.unlinkSync(`${del}.txt`)
    console.log("Now todo is deleted")
})

app.listen(8080,()=>{
    if(!fs.existsSync("dataBase.json")){
        createDatabase();
    }
    console.log("Server started")
    console.log("When the server started .")
})