const axios = require('axios');
const { Videogame, Gender } = require('../db'); 
const { UUIDV4 } = require('sequelize');
require('dotenv').config();
const { API_KEY } = process.env;

const getIdVideogames = async (req, res) => {
  const { id } = req.params;

  // Verifica si id es un UUID válido utilizando una expresión regular
  const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
  if (uuidRegex.test(id)) {
    try {
      const databaseVideogame = await Videogame.findByPk(id, {
        include: [
          {
            model: Gender,
            attributes: ['id', 'name'], // Define las propiedades que quieres incluir del modelo Gender
          },
        ],
        attributes: [
          'id',
          'name',
          'description',
          'platform',
          'image',
          'releaseDate',
          'rating',
          // Agrega aquí las demás propiedades que deseas incluir
        ],
      });
      
      res.status(200).json(databaseVideogame);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  } else {
    try {
      const apiUrl = `https://api.rawg.io/api/games/${id}?key=${API_KEY}`;
      const response = await axios.get(apiUrl);
      const apiVideogame = response.data;
      // Filtra las propiedades que deseas incluir en la respuesta
      const filteredApiVideogame = {
        id: apiVideogame.id,
        name: apiVideogame.name,
        description: apiVideogame.description,
        platform: apiVideogame.platform,
        image: apiVideogame.background_image,
        releaseDate: apiVideogame.released,
        rating: apiVideogame.rating,
        gender: apiVideogame.genres,
        // Agrega aquí las demás propiedades que deseas incluir
      };
      res.status(200).json(filteredApiVideogame);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
};






  // try {

//     const databaseVideogame = await Videogame.findByPk({idVideogame});
//      if (databaseVideogame) {
//        return res.status(200).json(databaseVideogame);
//      }
//     const apiUrl = `https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`;
//     const response = await axios.get(apiUrl);
//     const apiVideogame = response.data;

//     res.status(200).json(apiVideogame);
//   } catch (error) {
//     res.status(404).json({ error: error.message });
//   }
// };

module.exports = getIdVideogames;
