const axios = require('axios');
require('dotenv').config();
const { API_KEY } = process.env;
const { Videogame, Gender } = require('../db');

const getAllVideogames = async (req, res) => {
  try {
    // Obtener videojuegos de la base de datos incluyendo información de género
    const databaseVideogames = await Videogame.findAll({
      include: {
        model: Gender, // El modelo de género
        as: 'genders', // Especifica el alias 'genders'
        attributes: ['name'], // Las columnas que deseas seleccionar
        through: 'videogame_activity', // Corrige el nombre de la tabla intermedia
      },
    });

    // Obtener videojuegos de la API
    const maxGames = 250;
    const apiUrl = `https://api.rawg.io/api/games?key=${API_KEY}`;
    let allVideogames = [...databaseVideogames];
    let page = 1;
    let gamesObtained = databaseVideogames.length;

    while (gamesObtained < maxGames) {
      const response = await axios.get(apiUrl + `&page=${page}`);
      const gamesOnPage = response.data.results;

      if (gamesOnPage.length === 0) {
        break; // No more games available
      }

      // Calcular cuántos juegos podemos obtener de esta página sin superar el límite
      const gamesToAdd = Math.min(maxGames - gamesObtained, gamesOnPage.length);
      allVideogames = allVideogames.concat(gamesOnPage.slice(0, gamesToAdd));
      gamesObtained += gamesToAdd;

      page++;
    }

    res.status(200).json(allVideogames);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = getAllVideogames;
