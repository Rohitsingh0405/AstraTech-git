 
const express = require('express')
const fs = require('fs')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
// const { json } = require('stream/consumers');
const { json } = require('stream/consumers')
const app = express();
const cors = require('cors')
const prisma = require('./prismasetup')
const { randomUUID } = require('crypto')
app.use(cors())
app.use(express.json())


require('dotenv').config()
const user = [];



const date = new Date()
const hour = date.getHours()
const min = date.getMinutes()

const ti = `${hour}:${min}`
const createDatabase = ()=>{
    fs.writeFileSync("dataBase.json",JSON.stringify(user))
}
const space = "\n"
const space1 = "\t"
const createUserDatabase = (usr,data)=>{
    console.log({user:usr})
    console.log({datas:data})
    fs.writeFileSync(`${usr}.txt`,data+space1+ti+space)
    // fs.appendFileSync(`${usr}.txt `,space)
    
    // fs.appendFileSync(`${usr}.txt`,ti)
    
}
// const tokenVerify = (req,res)=>{

//     return verified

    
// } 

app.get("/getUser",async(req,res)=>{
    const users =await prisma.user.findMany()
    res.send(users)
})

app.post("/Signup",async(req,res)=>{

const {username,password,email} = req.body
const hashpass =await bcrypt.hash(password,10)
const userCheck = async()=>{
    const userexists = await prisma.User.findMany(
    )
    console.log(userexists)
    res.json("User")

}

userCheck()
})
app.post("/Login",async(req,res)=>{
    const {username,password,email} = req.body;
    
    //  readDataFunction()
    if(username == "Aniket" && password == "Aniket"){
         const token = jwt.sign({username},process.env.JWT_SECRET,{expiresIn:'12h'})
        console.log(token)
        
        res.status(200).json({token})
       
    }
    // const readData = fs.readFileSync("database.json",'utf-8')
    // const readDataParse = JSON.parse(readData)
    // const findUser = readDataParse.find((users)=>users.username == username) //Ek naam ka ek he user hoga 
    // console.log(readDataParse)
    
    // const hash1 = await bcrypt.compare(password,findUser.password)
    
    const readData = async ()=>{
        
        const user = await prisma.User.findUnique({
            where:{email:email},
            select:{
              password:true,
            }
        })
        console.log(user)
    }
    readData()
    // console.log(readData.password)
 if(readData){
    // res.status(200).json({Message:"User already exits"})
    const a = prisma.User.findMany({
        where:{name:username} 
    })
   console.log(a)
    // const hash1 = await bcrypt.compare(password,findUser.password)
    if(hash1){
        console.log("Hash matched")
        const token = jwt.sign({username},process.env.JWT_SECRET,{expiresIn:'12h'})
        console.log(token)
        // LocalStorage.setItem("TOKEN",JSON.stringify(token))
        res.status(200).json({token,success:hash1})
        
        return
    }

}

    
    res.status(404).json({Message:"You password is incorrect "})
})
app.get("/Access",(req,res)=>{
res.json("hello")
})
app.post("/addTodo",(req,res)=>{
    // console.log("This is the add Todo api")
    const token1 = req.headers.authorization
    // console.log(token1)
    const token11 = token1.split(" ")
    // console.log(token11)
   const usr = jwt.verify(token11[1],process.env.JWT_SECRET)
    // console.log(usr.username)

    // console.log(req.userData)
//    if(!usr.username){
//     console.log("You are not sending token")
//     res.status(404).json({Message:"You are not sending the token"})
//     return
//    }
//    if(!fs.existsSync(`${usr.username}.txt`)){
//     console.log("user does not exists")
//     const {data} = req.body
//     createUserDatabase(usr.username,data)
//     // fs.writeFileSync(`${usr}.txt`,data)
//     res.status(200).json({Todo:"Your Todo is Added"})
//     return
// }
// if(fs.existsSync(`${usr.username}.txt`)){
//     const {data} = req.body
//     fs.appendFileSync(`${usr.username}.txt`,data + space + ti)
//     // fs.appendFileSync(`${usr.username}.txt`,ti)

//     res.status(200).json({Todo:"Your Todo is Added"})
//     return
// }
})
app.get("/seeTodo",(req,res)=>{
    // const usr = tokenVerify()
    const token1 = req.headers.authorization
    // console.log(token1)
    const token11 = token1.split(" ")
    // console.log(token11)
    const usr = jwt.verify(token11[1],process.env.JWT_SECRET)
    // console.log(usr.username)

    // console.log(req.userData)
    if(usr.username == "Aniket"){
        const data = fs.readFileSync("database.json",'utf-8')
        const data1 = JSON.parse(data) 
        res.json(data1)

        return
    }

   if(!usr.username){
    console.log("You are not sending token")
    res.status(404).json({Message:"You are not sending the token"})
    return
   }
    console.log(usr)
   fs.readFile(`${usr.username}.txt`,'utf-8',(err,data)=>{
    res.status(200).json({Your_todos:data})
   })
})

app.post("/deleteTodo",(req,res)=>{
    // const usr = tokenVerify()
    const token1 = req.headers.authorization
    // console.log(token1)
    const token11 = token1.split(" ")
    // console.log(token11)
    const usr = jwt.verify(token11[1],process.env.JWT_SECRET)
    // console.log(usr.username)

    // console.log(req.userData)
   if(!usr.username){
    console.log("You are not sending token")
    res.status(404).json({Message:"You are not sending the token"})
    return
   }
  const {data} = req.body;
  const readData = fs.readFileSync(`${usr.username}.txt`,'utf-8')
  const newData = readData.replace(data,'') 
  fs.writeFileSync(`${usr.username}.txt`,newData);
  res.status(200).json("You Todo is deleted")


})
app.post("/admin",(req,res)=>{
    const{del} = req.body
//     const a = fs.readFileSync("admin.json",'utf-8')
//    const b =  a.find((usr)=>usr.username == username)
    const token1 = req.headers.authorization
    // console.log(token1)
    const token11 = token1.split(" ")
    // console.log(token11)
   const usr = jwt.verify(token11[1],process.env.JWT_SECRET)
    console.log(usr.username)


   
const b  = fs.readFileSync("admin.json",'utf-8')
const d = JSON.parse(b)
    console.log(b)
    // this will be used to maintain the json doc
const w = d.map((num)=> num.username== usr)
    // console.log(a.username)
    // const ues =  a.find((usr)=>usr.username == username && usr.password == password)
    // const ues = a.username
    // console.log(username)
    // console.log(ues)
    if(!w){
        res.status(404).json({Message:"You id password for admin does not match "})
        return
    }
    // const rd = fs.readFileSync("database.json",'utf-8')
   // res.status(200).json({Message:rd})
    // res.status(200).json("Enter the name of the user to remove it ")
    // const {del} = req.body;
    fs.unlinkSync(`${del}.txt`)
    res.json({Msg:"your todo is deleted"})
    console.log("Now todo is deleted") 
    // console.error("this is error")
})

app.listen(8080,()=>{
    
    console.log("Server started")
    console.log("When the server started .")
})

// Just for the commit 
// console.log("Error log")