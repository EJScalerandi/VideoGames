const { Videogame, Gender } = require('../db');
require('dotenv').config();

const createVideogames = async (req, res) => {
  try {
    const {
      name,
      description,
      platform,
      image,
      releaseDate,
      rating,
      Genders, // Un arreglo con los nombres de géneros seleccionados
    } = req.body;

    // Crea el videojuego en la base de datos
    const newVideogame = await Videogame.create({
      name,
      description,
      platform,
      image,
      releaseDate,
      rating,
    });

    console.log('newVideogame:', newVideogame);

    // Busca los géneros correspondientes en la tabla "Gender"
    if (Genders && Array.isArray(Genders)) {
      const genreRecords = await Gender.findAll({
        where: { name: Genders },
      });

      console.log('genreRecords:', genreRecords);

      // Asocia los géneros al nuevo videojuego en la tabla intermedia
      await newVideogame.addGenders(genreRecords);

      console.log('Videojuego con géneros asociados:', newVideogame);
    }

    // Incluye la información de género en la respuesta
    const videogameWithGenres = await Videogame.findByPk(newVideogame.id, {
      include: { model: Gender, as: 'genders' }, // Incluye información de género
    });

    console.log('videogameWithGenres:', videogameWithGenres);

    res.status(201).json(videogameWithGenres);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el videojuego' });
  }
};

module.exports = createVideogames;
