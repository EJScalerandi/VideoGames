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

        return res.status(500).json({ error: 'Error al obtener los géneros.' });
      }


      const genreNames = apiGenres.map((genre) => genre.name);

  
      for (const name of genreNames) {
        await Gender.create({
          name,
        });
      }

      // Obtén nuevamente los géneros de la base de datos
      const genresFromDatabase = await Gender.findAll({
        attributes: ['name'], // Obtén solo el nombre de los géneros
      });

     
      res.status(200).json(genresFromDatabase.map((genre) => genre.name));
    } else {
     
      res.status(200).json(genresInDatabase.map((genre) => genre.name));
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los géneros.' });
  }
};

module.exports = getGenres;
