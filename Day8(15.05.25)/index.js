const express = require('express')
require("dotenv").config()
const bycrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const app = express();
app.use(express.json())
const user = []

const fs = require('fs');
const { json } = require('stream/consumers');
const built = ()=>{

fs.writeFileSync("database.json",JSON.stringify(user))
}



const middle = (req,res,next)=>{
    // console.log(req.url)
    // console.log(req.headers)
    try{

        // console.log(req.headers.authorization)
        const tok = req.headers.authorization
        const toke = tok.split(" ")
        // const user1 = jwt.sign(toke[1])
        const user11 = jwt.verify(toke[1],process.env.JWT_SECRET)
        console.log(user11,"ouhiuiug")
        req.userData = user11;
        // console.log(toke[1])
        next()
    }
    catch(err){
        console.log(err)
        res.status(401).json("Invalid token ")
    }

    // res.send("hi")
    // req.headers.token = token

}

app.post("/Signup",async(req,res)=>{
    const {username,password} = req.body
    const hashPass =await bycrypt.hash(password,10)
    user.push({username,password:hashPass})
    const read = fs.readFileSync("database.json",'utf-8')
    const Readparse = JSON.parse(read)
    const usr = Readparse.find((usa)=>usa.username == username)
    if(usr){
        res.status(200).json({Messge:"Congratulation You exists"})
        return
    }
Readparse.push({username,password:hashPass})

    fs.writeFileSync("database.json",JSON.stringify(Readparse,null,2))

    // fs.writeFileSync("database.json",JSON.stringify(user),'utf8')

    res.json("You are Signedup")
})

app.post("/Login",async(req,res)=>{
    console.log("Login endpoint")
    try{
    const {username,password} = req.body
    // console.log(password)
    // const myuser = user.find((i)=>i.username == username)
    // console.log(myuser.password)
    // console.log(myuser.password)
    // console.log(hash1)
    
    const read = fs.readFileSync("database.json",'utf-8')
    const Readparse = JSON.parse(read)
    const myuser = Readparse.find((usa)=>usa.username == username)
    const hash1 = await bycrypt.compare(password,myuser.password)

        if(!myuser){
            res.status(404).json("user does not Exists")
        }
        if(hash1){
            const token = jwt.sign({username},process.env.JWT_SECRET,{expiresIn:'12h'})
            // console.log("password match")
            res.status(200).json({token,success:hash1})
            return
        }
        else{
            res.status(400).json("Wrong password")

        }
        
    }
    catch(err){
        res.status(500).send(err)
    }
})

app.get("/Access",middle,(req,res)=>{
    console.log("Access after login")
    res.status(200).send(`${req.userData.username} have finally come to us`)

})

app.post("/reset",(req,res)=>{
    console.log("Reset password")
})

app.listen(8080,()=>{
if(!fs.existsSync('database.json')){
built();
}

console.log("Server started")
})

