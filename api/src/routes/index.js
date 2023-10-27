const { Router } = require('express');
const getAllVideogames = require('../controllers/getAllVideogames');
const getIdVideogames = require("../controllers/getIdVideogames");
const getVideoGamesByName = require("../controllers/getVideogamesByName"); // Asegúrate de importar el controlador correcto
const getVideogamesByUUID = require("../controllers/getVideogamesByUUID"); // Importa el nuevo controlador
const createVideogames = require("../controllers/createVideogames");
const getGenres = require("../controllers/getGenres");

const router = Router();

router.get("/videogames", getAllVideogames);
router.get("/videogames/id/:id", getIdVideogames); // Maneja búsquedas por ID
router.get('/videogames/:name', getVideoGamesByName); // Maneja búsquedas por nombre
router.get('/videogames/uuid/:uuid', getVideogamesByUUID); // Nueva ruta para búsquedas por UUID
router.post("/videogames", createVideogames);
router.get("/genres", getGenres);

module.exports = router;
