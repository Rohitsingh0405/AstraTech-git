const http = require('http');
http.createServer(function(req,res){
    res.write("Hello Rohit");
    if(req.method=="POST" && req.url=="/hi")
        {
            res.write("Hello world")
        }
        // res.write(req.url)
        res.write("hello world ")
        res.write("    ")
        res.write("Hello how are you ")
        res.end();
        
}).listen(8080);
