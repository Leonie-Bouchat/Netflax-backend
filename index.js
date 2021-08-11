var dbConnect = require("./dbConnect")

var http = require('http');

var server = http.createServer(function(req, res){
    res.end("<h1>Ca marche !</h1>")
});

server.listen(3000);