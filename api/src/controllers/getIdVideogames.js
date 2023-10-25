const axios = require('axios');
require('dotenv').config();
const { API_KEY } = process.env;

const getIdVideogames = async (req, res) => {
  const { id } = req.params;

  try {
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
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = getIdVideogames;
