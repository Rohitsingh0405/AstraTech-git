const express = require('express')
const nodemailer = require('nodemailer')
let otp 
const app = express();
app.use(express.json())
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'rs21rohit@gmail.com',
    pass: 'rgar vjfp kvzq mkmm'}
});



app.post("Signup",(req,res)=>{
    const{username,password} = req.body;

    
})
app.post("/Login",(req,res)=>{
    const{username,password} = req.body;
     otp = Math.floor(Math.random()*10000)
     var mailOptions = {
       from: 'rs21rohit@gmail.com',
       to: username,
       subject:"OTP FOR LOGIN",
       text: `${otp}`,
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});

res.json(otp)
})

app.post("/otp",(req,res)=>{
  const {otp1} = req.body;
  const otp2 =otp.toString()
  if(otp1 == otp2){
    res.json({
      Welcome:"OTP is verified",
    })
    return
  }
  res.json({Message:"OTP is incorrect"})
})

app.listen(8080,()=>{
    console.log("Server Started")
})