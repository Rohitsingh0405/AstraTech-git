const nodemailer = require("nodemailer")
const tansporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:"rs21rohit@gmail.com",
        pass:"rgar vjfp kvzq mkmm"
    }
})

const sendMailTo = 'piyush.soni8877@gmail.com';
const mailoptions = {
    from:"rs21rohit@gmail.com",
    to:sendMailTo,
    subject:"Just testing",
    text:"I am testing"
}

tansporter.sendMail(mailoptions,function(err,info){
    if(err){
        console.log({Message:err})
    }
    else{
        console.log({message:info.response})
    }
})