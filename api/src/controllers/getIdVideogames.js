const axios = require('axios');
const { Videogame, Gender } = require('../db');
require('dotenv').config();
const { API_KEY } = process.env;

const getIdVideogames = async (req, res) => {
  const { id } = req.params;

  try {
    const databaseVideogame = await Videogame.findByPk(id, {
      include: [
        {
          model: Gender,
          attributes: ['id', 'name'],
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
      ],
    });

    if (databaseVideogame) {
      res.status(200).json(databaseVideogame);
    } else {
      const apiUrl = `https://api.rawg.io/api/games/${id}?key=${API_KEY}`;
      const response = await axios.get(apiUrl);
      const apiVideogame = response.data;
      const filteredApiVideogame = {
        id: apiVideogame.id,
        name: apiVideogame.name,
        description: apiVideogame.description,
        platform: apiVideogame.platform,
        image: apiVideogame.background_image,
        releaseDate: apiVideogame.released,
        rating: apiVideogame.rating,
        genres: apiVideogame.genres,
      };
      res.status(200).json(filteredApiVideogame);
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = getIdVideogames;







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
