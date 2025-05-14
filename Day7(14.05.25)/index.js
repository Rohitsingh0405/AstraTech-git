const express = require('express')
const dotenv = require("dotenv").config()
const app = express();

app.post("/Signup",(req,res)=>{

    res.send("Sign up")
})

app.post("/Login",(req,res)=>{
    console.log("Login endpoint")
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

