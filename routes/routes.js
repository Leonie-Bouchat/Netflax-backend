const moviesRoutes = require('./movies');
const actorsRoutes = require('./actors')

const appRouter = (app) => {
    app.get('/', (req, res) => {
        res.send("Bienvenue dans l'api !!")
    });

    moviesRoutes(app);
    actorsRoutes(app)
    
};

module.exports = appRouter;