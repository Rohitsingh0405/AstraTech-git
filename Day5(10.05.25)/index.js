const http = require('http')
http.createServer(function(req,res){
    // if(req.method=="POST" && req.url=="/hi"){
    //     res.write("THis is post ")
    // }
    res.write("rohit")

    console.log("hi")
    res.end()
}).listen(8080)