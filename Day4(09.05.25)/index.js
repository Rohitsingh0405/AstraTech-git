const http = require('http');
http.createServer(function(req,res){
    res.write("Hello Rohit");
    res.end();
}).listen(8080);