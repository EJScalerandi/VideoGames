const axios = require('axios');

require('dotenv').config();
const {API_KEY } = process.env;



const getAllVideogames = async (req, res) => { 
    try {
        const apiUrl = `https://api.rawg.io/api/games?key=${API_KEY}`;
        const response = await axios.get(apiUrl)      
        const allVideogames = response.data.results;
        res.status(200).json(allVideogames); 
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

module.exports = getAllVideogames;
