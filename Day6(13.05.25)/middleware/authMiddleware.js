const user = require("../lib/data/user");

const userRoute = (req, res, next) => {
  const { id, password } = req.body;

  const myuser = user[id];
  console.log(myuser);
  
  if (!myuser) {
    res.send("User Does not exist", myuser);
    return
  }

  if(myuser.password !== password ){
    res.send("wronge password")
    return 
  }

//   if(myuser.role.toLowerCase() !== "user"){
//     res.send("Not have correct permissions")
//     return
//   }
console.log("finally we are logged in")
req.user = myuser
  next()
  return
};
const adminRoute = (req, res, next) => {};

const EmployeeRoute = (req, res, next) => {};

module.exports = {
    adminRoute,
    userRoute,
    EmployeeRoute
}