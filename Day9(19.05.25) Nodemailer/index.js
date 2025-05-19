var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'rs21rohit@gmail.com',
    pass: 'rgar vjfp kvzq mkmm'}
});

var mailOptions = {
  from: 'rs21rohit@gmail.com',
  to: 'aniketofficial2003@gmail.com',
  subject: 'ab ek project banayenge jiske baad log mail bhejne ke liye gmail use krna band kr dega',
  text: 'Aur bhaiya kya haal chal mail aana suru ho gaya'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
