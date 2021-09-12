const sql = require("mssql/msnodesqlv8");
const dbConnect = require("./../dbConnect")
const request = new sql.Request(dbConnect);

const actorsRoutes = (app) => {

    app.get('/actors/all', (req, res) => {
        request.query("SELECT FirstName, LastName FROM Cast").then(result => res.send(result.recordset));
    })

    app.get('/actors/:id', (req, res) => {
        let id = parseInt(req.params.id);
        request.query(`SELECT C.FirstName, LastName, M.IdCast, M.idMovie, Mo.Title FROM Cast C JOIN MovieCast M ON C.IdCast = M.IdCast JOIN Movie Mo ON M.idMovie = Mo.IdMovie WHERE C.IdCast = ${id}`).then(result => res.send(result.recordset));

    })
}

module.exports = actorsRoutes;