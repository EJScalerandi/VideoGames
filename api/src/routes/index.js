const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const getAllVideogames = require('../controllers/getAllVideogames');
const getIdVideogames = require ("../controllers/getIdVideogames");
const getVideoGamesByName = require ("../controllers/getVideogamesByName");
const createVideogames = require ("../controllers/createVideogames");
const getGenres = require ("../controllers/getGenres");
const router = Router();



// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/videogames", getAllVideogames);
router.get("/videogames/:id", getIdVideogames);
router.get('/videogames/name', getVideoGamesByName);
router.post("/videogames", createVideogames)
router.get("/genres", getGenres);
module.exports = router;
