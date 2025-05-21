const express = require("express")
const app = express();

app.get("/",(req,res)=>{
    res.json({Message:"Rohit singh"})
})
app.listen(8080,()=>{
    console.log("Server start")
})

