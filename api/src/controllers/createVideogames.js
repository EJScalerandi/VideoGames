const axios = require('axios');
const { Op } = require('sequelize');
const { Videogame, Gender} = require('../db');
require('dotenv').config();
const { API_KEY } = process.env;


const createVideogames = async (req, res) => {
    try {
      // Obtén los datos del body de la solicitud
      const {
        name,
        description,
        platform,
        image,
        releaseDate,
        rating,
        genres, // Un arreglo con los IDs de géneros seleccionados
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
  
      // Relaciona el videojuego con los géneros seleccionados
      if (genres && Array.isArray(genres)) {
        await newVideogame.addGenres(genres);
      }
  
      res.status(201).json(newVideogame);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al crear el videojuego' });
    }
  };
  
  module.exports = createVideogames;