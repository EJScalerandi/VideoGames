const axios = require('axios');
const { Op } = require('sequelize');
const { Videogame } = require('../db');
require('dotenv').config();
const { API_KEY } = process.env;

const getVideoGamesByName = async (req, res) => {
  try {
    const { name } = req.query;

    // Realiza una búsqueda en la base de datos por nombre
    const databaseVideogames = await Videogame.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`, // Realiza una búsqueda insensible a mayúsculas y minúsculas
        },
      },
      limit: 15, // Limita el resultado a 15 videojuegos
    });

    // Realiza una solicitud a la API externa para buscar videojuegos por nombre
    const apiUrl = `https://api.rawg.io/api/games?key=${API_KEY}&search=${encodeURIComponent(name)}`;
    const response = await axios.get(apiUrl);
    const apiVideogames = response.data.results.slice(0, 15); // Limita el resultado a 15 videojuegos

    if (databaseVideogames.length === 0 && apiVideogames.length === 0) {
      // Si no se encontraron videojuegos en la base de datos ni en la API
      res.status(404).json({ message: 'No se encontraron videojuegos con ese nombre.' });
    } else {
      // Combina los resultados de la base de datos y la API
      const mergedVideogames = [...databaseVideogames, ...apiVideogames];
      res.status(200).json(mergedVideogames);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getVideoGamesByName;
