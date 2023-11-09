const axios = require('axios');
require('dotenv').config();
const { API_KEY } = process.env;
const { Videogame, Gender } = require('../db');

const getAllVideogames = async (req, res) => {
  try {
    // Obtener videojuegos de la base de datos incluyendo información de género
    const databaseVideogames = await Videogame.findAll({
      include: {
        model: Gender,
        as: 'genders',
        attributes: ['name'],
        through: 'videogame_activity', // Corrige el nombre de la tabla intermedia
      },
    });

    // Obtener videojuegos de la API
    const maxGames = 100;
    const apiUrl = `https://api.rawg.io/api/games?key=${API_KEY}`;
    let apiVideogames = [];
    let page = 1;
    let gamesObtained = 0;

    while (gamesObtained < maxGames) {
      const response = await axios.get(apiUrl + `&page=${page}`);
      const gamesOnPage = response.data.results;

      if (gamesOnPage.length === 0) {
        break;
      }

      // Calcular cuántos juegos podemos obtener de esta página sin superar el límite
      const gamesToAdd = Math.min(maxGames - gamesObtained, gamesOnPage.length);
      apiVideogames = apiVideogames.concat(gamesOnPage.slice(0, gamesToAdd));
      gamesObtained += gamesToAdd;

      page++;
    }

    apiVideogames = apiVideogames.filter(game => typeof game.id === 'number');
    
    apiVideogames.sort((a, b) => a.id - b.id);

    // Combinar juegos de la base de datos y de la API
    const allVideogames = [...databaseVideogames, ...apiVideogames];

    res.status(200).json(allVideogames);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = getAllVideogames;
