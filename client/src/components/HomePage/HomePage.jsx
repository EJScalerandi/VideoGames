import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from '../SearchBar/SearchBar';
import Cards from '../Cards/Cards'; // Importa el componente Cards en lugar de GameList
import Card from "../Card/Card";

function HomePage() {
  const [searchedGame, setSearchedGame] = useState(null);
  const [gameNotFound, setGameNotFound] = useState(false);
  const [allGames, setAllGames] = useState([]);
  
  useEffect(() => {
    // Realiza la petición a la API para obtener los primeros 15 juegos al cargar la página
    axios.get('http://localhost:3001/videogames/')
      .then((response) => {
        const data = response.data;
        setAllGames(data.slice(0, 15)); // Limita a los primeros 15 juegos
      })
      .catch((error) => {
        console.error('Error al obtener los juegos:', error);
      });
  }, []);
  
  const handleSearch = (searchValue) => {
    axios.get(`http://localhost:3001/videogames/${searchValue}`)
      .then((response) => {
        const data = response.data;
        if (data) {
          setSearchedGame(data);
          setGameNotFound(false);
        } else {
          setSearchedGame(null);
          setGameNotFound(true);
        }
      })
      .catch((error) => {
        console.error('Error al buscar videojuego:', error);
        setSearchedGame(null);
        setGameNotFound(true);
      });
  };

  return (
    <div>
      <h1>Home Page</h1>
      <SearchBar onSearch={handleSearch} />
      {searchedGame ? (
        <Card game={searchedGame} />
      ) : gameNotFound ? (
        <p>Juego no encontrado.</p>
      ) : (
        <div>
          <h2>Lista de Juegos</h2>
          {Array.isArray(allGames) && allGames.length > 0 ? (
            <Cards games={allGames} />
          ) : (
            <p>No hay juegos disponibles.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default HomePage;

