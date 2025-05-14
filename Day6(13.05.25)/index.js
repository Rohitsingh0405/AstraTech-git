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
const {idd1,idd2,idd3} = user

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
    const {id1} = req.body;
    // res.send("Entered userroute")
    
    // res.send(id1.username)
    // res.send(password)
    // res.send(role)
    if(id1.username === idd1.username && req.body.id1.password === idd1.password){
        // res.send("User and password or correct");
        if(id1.role === idd1.role){
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
    const {id3} = req.body;
     if(id3.username === idd3.username && req.body.id3.password === idd3.password){
   
        if(idd3.role == idd3.role){

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
    const {id2} = req.body;
     if(id2.username === idd2.username && req.body.id2.password === idd2.password){
   
    if(idd2.role === idd2.role){
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
})
app.listen(8080 , ()=>{
    console.log("Server started")
})