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
      Genders,
    } = req.body;

  
    const newVideogame = await Videogame.create({
      name,
      description,
      platform,
      image,
      releaseDate,
      rating,
    });
  
    const defaultImageURL = 'https://as2.ftcdn.net/v2/jpg/05/41/24/61/1000_F_541246162_nfth7B8wvZF58fxnjku114DNL6L602QX.jpg';
    if(!newVideogame.image) {
      newVideogame.image = defaultImageURL;
      newVideogame.save();
    }
    
    if (Genders && Array.isArray(Genders)) {
      const genreRecords = await Gender.findAll({
        where: { name: Genders },
      });

    await newVideogame.addGenders(genreRecords);
    }

  
    const videogameWithGenres = await Videogame.findByPk(newVideogame.id, {
      include: { model: Gender, as: 'genders' },
    });



    res.status(201).json(videogameWithGenres);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el videojuego' });
  }
};

module.exports = createVideogames;
