const axios = require('axios');
const { Gender } = require('../db');
require('dotenv').config();
const { API_KEY } = process.env;

const getGenres = async (req, res) => {
  try {
    const genresInDatabase = await Gender.findAll();

    if (genresInDatabase.length === 0) {
      const apiUrl = `https://api.rawg.io/api/genres?key=${API_KEY}`;
      const response = await axios.get(apiUrl);
      const apiGenres = response.data.results;

      if (!apiGenres) {
        // Si la respuesta de la API no contiene géneros, devuelve un error
        return res.status(500).json({ error: 'Error al obtener los géneros.' });
      }

      // Obtén solo los nombres de los géneros de la API
      const genreNames = apiGenres.map((genre) => genre.name);

      // Itera sobre los nombres de géneros y guárdalos en la base de datos
      for (const name of genreNames) {
        await Gender.create({
          name,
        });
      }

      // Obtén nuevamente los géneros de la base de datos
      const genresFromDatabase = await Gender.findAll({
        attributes: ['name'], // Obtén solo el nombre de los géneros
      });

      // Devuelve la lista de nombres de géneros en la respuesta HTTP
      res.status(200).json(genresFromDatabase.map((genre) => genre.name));
    } else {
      // Si la base de datos ya tiene géneros, devuelve la lista de nombres de géneros en la respuesta HTTP
      res.status(200).json(genresInDatabase.map((genre) => genre.name));
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los géneros.' });
  }
};

module.exports = getGenres;
