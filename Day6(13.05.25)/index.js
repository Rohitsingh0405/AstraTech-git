// const e = require('express')
const express = require("express");
const { userRoute} = require("./middleware/authMiddleware");
const app = express();
app.use(express.json());
app.use(express.text());

app.use(userRoute)


app.post("/user",(req, res, next) => {
    const b = req.user.role;
    // const c = b.role
    if(b== 'Admin'){
        res.send("you are admin")
    }
    if(b== "User"){
        res.send("you are user")
    }
    if(b == "Employee"){
        res.send("You are employee")
    }
  res.send("user route");
});
// app.post("/admin",(req, res, next) => {
//   res.send("Admin Route");

// });
// app.post("/employee",(req, res, next) => {
//   res.send("Employee Route");
// });
app.get("/a", (req, res) => {
  console.log("hello");
  res.send("Hello ");
});
app.listen(8080, () => {
  console.log("Server started");
});
