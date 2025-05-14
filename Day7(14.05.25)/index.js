const express = require('express')
require("dotenv").config()
const bycrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const app = express();
app.use(express.json())
const user = []


app.post("/Signup",async(req,res)=>{
    const {username,password} = req.body
    const hashPass =await bycrypt.hash(password,10)
    user.push({username,password:hashPass})
    res.json("You are Signedup")
})

app.post("/Login",async(req,res)=>{
    console.log("Login endpoint")
    try{
    const {username,password} = req.body
    console.log(password)
    const myuser = user.find((i)=>i.username == username)
    // console.log(myuser.password)
    const hash1 = await bycrypt.compare(password,myuser.password)
    console.log(myuser.password)
    console.log(hash1)
        if(!myuser){
            res.status(404).json("user does not Exists")
        }
        if(hash1){
            const token = jwt.sign({username},process.env.JWT_SECRET,{expiresIn:'12h'})
            console.log("password match")
            res.status(200).json({token,success:hash1})
            return
        }
        res.status(400).json("Wrong password")
        
    }
    catch(err){
        res.status(500).send(err)
    }
})

app.get("/Access",(req,res)=>{
    console.log("Access after login")
})

app.post("/reset",(req,res)=>{
    console.log("Reset password")
})

app.listen(8080,()=>{
console.log("Server started")
})

