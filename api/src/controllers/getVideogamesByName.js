const { Op } = require('sequelize');
const { Videogame, Gender } = require('../db');
const axios = require('axios');
require('dotenv').config();
const { API_KEY } = process.env;

const getVideoGamesByName = async (req, res) => {
  try {
    const { name } = req.params;
 
    if (!name) {
      return res.status(400).json({ message: 'El parámetro "name" es obligatorio.' });
    }

    // Convierte el valor a minúsculas
    const lowerCaseName = name.toLowerCase();

    // Busca en la base de datos
    const databaseVideogames = await Videogame.findAll({
      where: {
        name: {
          [Op.iLike]: `%${lowerCaseName}%`, // Realiza una búsqueda insensible a mayúsculas y minúsculas
        },
      },
      limit: 15,
      include: {
        model: Gender,
        as: 'genders',
        attributes: ['name'],
        through: 'videogame_activity',
      },
    });

    // Busca en la API
    const apiUrl = `https://api.rawg.io/api/games?key=${API_KEY}&search=${encodeURIComponent(lowerCaseName)}`;
    const response = await axios.get(apiUrl);
    const apiVideogames = response.data.results.slice(0, 15);

    if (databaseVideogames.length === 0 && apiVideogames.length === 0) {
      return res.status(404).json({ message: 'No se encontraron videojuegos con ese nombre.' });
    }

    // Combina los resultados de la base de datos y la API
    const mergedVideogames = [...databaseVideogames, ...apiVideogames];
    res.status(200).json(mergedVideogames);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getVideoGamesByName;
