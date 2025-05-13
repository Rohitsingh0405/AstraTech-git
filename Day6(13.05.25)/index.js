const e = require('express')
const express = require('express')
const app = express()
app.use(express.json())
app.use(express.text())
// let pass = "password"
// app.post("/reset",function(req,res){
//     a = req.body.newpassword;
//     pass = a;
// })
// // Basic authentication => basic data jo mere pass aayega
// let attempt = 0;
// app.use((req,res,next)=>{
// console.log(req.url)
// // express.text()(req,res,next);
// // express.raw();
// // express.json();
// if(req.body.password === pass ){
//     next()

// }
// // else if(attempt >3){
// //     res.send("You have taken 3 attempts")
// // }
// else{
//     res.send("Wrong Address bhai jaan")
//     // attempt++;
// // return
// }

// })

// app.get("/",function(req,res){
//     res.write("Hello Rohit")
// })

// app.post("/submit",(req,res)=>{
//     const a = req.body
//     // console.log(JSON.stringify(req))
//     console.log(a)
//     res.send(a)
// })

// app.listen(8080,()=>{
//     console.log("server is running")
// })