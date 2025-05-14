// const e = require('express')
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

// LEVEL 0 BEGINS

const user = {
    id1:{
        username:"Rohit",
        password:"Rohit",
        role:"User"
    },
    
    id2:{
        username:"Amit",
        password:"Amit",
        role:"Employee"
    },
    id3:{  
        username:"Aniket",
        password:"Aniket",
        role:"Admin"
    }
}
const {id1,id2,id3} = user

// const authRoute =(req,res,next)=>{
//     if(req.body.user.id.username === user.id.username && req.body.user.id.username === user.id.password){
//         res.send("yes")
//         next()
//     }
//     else{
//         res.send("Username or password does not match")
//     }
// }

const userRoute = (req,res,next)=>{
    // const {id1} = req.body;
    // res.send("Entered userroute")
    // res.send(req.body.id1.username)
    // res.send(id1.username)
    // res.send(password)
    // res.send(role)
    if(req.body.id1.username === id1.username && req.body.id1.password === id1.password){
        // res.send("User and password or correct");
        if(req.body.id1.role === id1.role){
            // res.send("Role is correct")
            
            next()
        }
        else{
            res.send("does not match")
        }
    }
    else{
        res.send("User does not found")
    }

}
const adminRoute = (req,res,next)=>{
    // const {id3} = req.body;
     if(req.body.id3.username === id3.username && req.body.id3.password === id3.password){
   
        if(req.body.id3.role == id3.role){

        // res.send("yes")
        next()
        
     } 
     else{
         res.send("does not match")
        }
    }
    else{
        res.send("user not found")
    }


}

const EmployeeRoute = (req,res,next)=>{
    // const {id2} = req.body;
     if(req.body.id2.username === id2.username && req.body.id2.password === id2.password){
   
    if(req.body.id2.role === id2.role){
        // res.send("yes")
        next()
        
    }
    else{
        res.send("does not match")
        }
    }
    else{
        res.send("User not found  ")
    }
}
app.post("/user",userRoute,(req,res,next)=>{
    // userRoute()
    // next()
    res.send("user route")

    

})
app.post("/admin",adminRoute,(req,res,next)=>{
    // next()
    res.send("Admin Route")

    // adminRoute()
})
app.post("/employee",EmployeeRoute,(req,res,next)=>{
    // EmployeeRoute()
    // next()
    res.send("Employee Route")
})
app.get("/a",(req,res)=>{
    console.log("hello")
    res.send("Hello ")
})
app.listen(8080 , ()=>{
    console.log("Server started")
})