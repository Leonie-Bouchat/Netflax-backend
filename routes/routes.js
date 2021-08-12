const filmsRoutes = require('./films');

const appRouter = (app, fs) => {
    app.get('/test', (req, res) => {
        res.send("Bienvenue dans l'api")
    });

    filmsRoutes(app, fs);
};

module.exports = appRouter;