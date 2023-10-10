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
      const apiGenres = response.data.results; //aca tengo que poner que solo me traiga los generos. Me esta trayendo una array con objetos donde tiene la propiedad name que es la que me interesa

      if (!apiGenres) {
        // Si la respuesta de la API no contiene géneros, devuelve un error
        return res.status(500).json({ error: 'Error al obtener los géneros.' });
      }

      // Itera sobre los géneros de la API y guárdalos en la base de datos
      for (const genre of apiGenres) {
        await Gender.create({
          name: genre.name,
        });
      }

      // Obtén nuevamente los géneros de la base de datos
      const genresFromDatabase = await Gender.findAll();

      // Devuelve la lista de géneros en la respuesta HTTP
      res.status(200).json(genresFromDatabase);
    } else {
      // Si la base de datos ya tiene géneros, devuelve la lista de géneros en la respuesta HTTP
      res.status(200).json(genresInDatabase);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los géneros.' });
  }
};

module.exports = getGenres;
