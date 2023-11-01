const { Router } = require('express');
const getAllVideogames = require('../controllers/getAllVideogames');
const getIdVideogames = require("../controllers/getIdVideogames");
const getVideoGamesByName = require("../controllers/getVideogamesByName"); 
const getVideogamesByUUID = require("../controllers/getVideogamesByUUID"); 
const createVideogames = require("../controllers/createVideogames");
const getGenres = require("../controllers/getGenres");

const router = Router();

router.get("/videogames", getAllVideogames);
router.get("/videogames/id/:id", getIdVideogames); 
router.get('/videogames/:name', getVideoGamesByName); 
router.get('/videogames/uuid/:uuid', getVideogamesByUUID); 
router.post("/videogames", createVideogames);
router.get("/genres", getGenres);

module.exports = router;
