const sql = require("mssql/msnodesqlv8");
var dbConnect = require("./../dbConnect")
let request = new sql.Request(dbConnect);

const filmsRoutes = (app, fs) => {

    app.get('/films', (req, res) => {
        
        request.query("SELECT * FROM Movie")
    })

    app.get('/actors', (req, res) => {
        request.query("SELECT * FROM Cast")
    })

}

module.exports = filmsRoutes;

