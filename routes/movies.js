const sql = require("mssql/msnodesqlv8");
const dbConnect = require("./../dbConnect");


const moviesRoutes = (app) => {

    app.get('/movies/all', (req, res) => {
        let request = new sql.Request(dbConnect);
        request.query("SELECT IdMovie, Title, Picture FROM Movie ORDER BY Title").then(result => res.send(result.recordset));
    });

    app.get('/movies/date', (req, res) => {
        let request = new sql.Request(dbConnect);
        request.query("SELECT IdMovie, Title, ReleaseDate FROM Movie ORDER BY ReleaseDate DESC").then(result => res.send(result.recordset));
    });

    app.get('/movies/:id', (req, res) => {
        let request = new sql.Request(dbConnect);
        let id = parseInt(req.params.id)
        request.query(`SELECT IdMovie, Title, ReleaseDate, Summary, Picture, Trailer FROM Movie WHERE IdMovie = ${id}`).then(result => res.send(result.recordset[0]));
    });

    app.get('/movies/:id/types', (req, res) => {
        let request = new sql.Request(dbConnect);
        let id = parseInt(req.params.id);
        request.query(`SELECT Label, Genre.IdGenre FROM Genre JOIN MovieGenre ON MovieGenre.IdGenre = Genre.IdGenre WHERE IdMovie = ${id}`).then(result => res.send(result.recordset));
    });

    app.get('/movies/:id/actors', (req, res) => {
        let request = new sql.Request(dbConnect);
        let id = parseInt(req.params.id);
        request.query(`SELECT Cast.IdCast, FirstName, LastName FROM Cast JOIN MovieCast ON MovieCast.IdCast = Cast.IdCast WHERE IdMovie = ${id}`).then(result => res.send(result.recordset));
    });

    app.get('/movies/types/all', (req, res) => {
        let request = new sql.Request(dbConnect);
        request.query("SELECT IdGenre, Label FROM Genre ORDER BY Label").then(result => res.send(result.recordset));
    });

    app.get('/movies/types/:id', (req, res) => {
        let request = new sql.Request(dbConnect);
        let id = parseInt(req.params.id);
        request.query(`SELECT Label, IdGenre FROM Genre WHERE IdGenre = ${id}`).then(result => res.send(result.recordset[0]));
    });

    app.get('/movies/types/:id/movies', (req, res) => {
        let request = new sql.Request(dbConnect);
        let id = parseInt(req.params.id);
        request.query(`SELECT Title, Movie.IdMovie, Picture, IdGenre FROM Movie JOIN MovieGenre ON Movie.IdMovie = MovieGenre.IdMovie WHERE IdGenre = ${id} ORDER BY Title`).then(result => res.send(result.recordset));
    });

    app.get('/actors/all', (req, res) => {
        let request = new sql.Request(dbConnect);
        request.query(`SELECT IdCast, FirstName, LastName FROM Cast ORDER BY LastName`).then(result => res.send(result.recordset))
    })

    app.get('/actors/:id', (req, res) => {
        let request = new sql.Request(dbConnect);
        let id = parseInt(req.params.id);
        request.query(`SELECT IdCast, FirstName, LastName FROM Cast WHERE IdCast = ${id} ORDER BY LastName`).then(result => res.send(result.recordset[0]));
    })

    app.get('/actors/:id/movies', (req, res) => {
        let request = new sql.Request(dbConnect);
        let id = parseInt(req.params.id);
        request.query(`SELECT Movie.IdMovie, Title FROM Movie JOIN MovieCast ON Movie.IdMovie = MovieCast.IdMovie WHERE IdCast = ${id} ORDER BY Title`).then(result => res.send(result.recordset))
    })
}

module.exports = moviesRoutes;

