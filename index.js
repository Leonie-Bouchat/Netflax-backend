var dbConnect = require("./dbConnect")
var express = require('express');
var bodyParser = require("body-parser");
var cors = require('cors');

var app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended : true}));
app.use(bodyParser.json());
app.use(cors());

const routes = require('./routes/routes.js')(app);

// app.get('/:param', function(req, res) {
//     console.dir(req.params);
//     res.status(200).end();
// })

app.all("*", (req, res) => {
    res.status(404).send("404");
})

const server = app.listen(port, console.log(`Le serveur Express écoute sur le port ${port}`))