const { Videogame, Gender } = require('../db');
require('dotenv').config();

const getVideogamesByUUID = async (req, res) => {
  const { uuid } = req.params;
  try {
    const databaseVideogame = await Videogame.findByPk(uuid, {
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
      res.status(404).json({ message: 'Videojuego no encontrado en la base de datos.' });
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = getVideogamesByUUID;

