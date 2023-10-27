// HomePage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Cards from '../Cards/Cards';
import Card from '../Card/Card';
import SearchBar from '../SearchBar/SearchBar';

function HomePage() {
  const [searchedGame, setSearchedGame] = useState(null);
  const [gameNotFound, setGameNotFound] = useState(false);
  const [allGames, setAllGames] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedOrigin, setSelectedOrigin] = useState('Todos');
  const [genreOptions, setGenreOptions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const gamesPerPage = 15;

  useEffect(() => {
    axios.get('http://localhost:3001/genres')
      .then((response) => {
        const data = response.data;
        setGenreOptions(data);
      })
      .catch((error) => {
        console.error('Error al obtener las opciones de género:', error);
      });

    axios.get('http://localhost:3001/videogames/')
      .then((response) => {
        const data = response.data;
        setAllGames(data);
      })
      .catch((error) => {
        console.error('Error al obtener los juegos:', error);
      });
  }, []);

  const handleSearch = (searchValue) => {
    if (searchValue) {
      setGameNotFound(false);
      setSearchedGame(null);
      handleSearchRequest(searchValue);
    } else {
      setGameNotFound(true);
      setSearchedGame(null);
    }
  };

  const handleSearchRequest = async (searchValue) => {
    try {
      const response = await axios.get(`http://localhost:3001/videogames/${searchValue}`);
      const data = response.data;
      if (data) {
        setSearchedGame(data);
      } else {
        setGameNotFound(true);
      }
    } catch (error) {
      console.error('Error al buscar videojuego:', error);
      setSearchedGame(null);
      setGameNotFound(true);
    }
  };

  const isAPIGame = (game) => typeof game.id === 'number';
  const isDatabaseGame = (game) => typeof game.id === "string";

  const paginateGames = (games) => {
    const indexOfLastGame = currentPage * gamesPerPage;
    const indexOfFirstGame = indexOfLastGame - gamesPerPage;
    return games.slice(indexOfFirstGame, indexOfLastGame);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filteredGames = paginateGames(allGames).filter((game) => {
    const genreMatch =
      !selectedGenre ||
      (game.genres && game.genres.some((genre) => genre.name === selectedGenre));

    const isAPI = isAPIGame(game);
    const isDatabase = isDatabaseGame(game);
    const isAllSelected = selectedOrigin === 'Todos';

    const originMatch =
      isAllSelected ||
      (selectedOrigin === 'API' && isAPI) ||
      (selectedOrigin === 'Base de Datos' && isDatabase);

    return genreMatch && originMatch;
  });

  return (
    <div>
      <h1>Home Page</h1>
      <SearchBar onSearch={handleSearch} />
      <div>
        <h1>Home Page</h1>
        <Link to="/formpage">
          <button>Crear un videojuego</button>
        </Link>
      </div>
      <div>
        <h2>Filtrar por Género:</h2>
        <select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)}>
          <option value="">Todos</option>
          {genreOptions.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>
      <div>
        <h2>Filtrar por Origen:</h2>
        <select value={selectedOrigin} onChange={(e) => setSelectedOrigin(e.target.value)}>
          <option value="Todos">Todos</option>
          <option value="API">API</option>
          <option value="Base de Datos">Base de Datos</option>
        </select>
      </div>
      {searchedGame ? (
        <Card game={searchedGame} />
      ) : gameNotFound ? (
        <p>Juego no encontrado.</p>
      ) : (
        <div>
          <h2>Lista de Juegos</h2>
          {Array.isArray(filteredGames) && filteredGames.length > 0 ? (
            <Cards games={filteredGames} />
          ) : (
            <p>Por favor aguarde mientras se cargan los juegos</p>
          )}
        </div>
      )}
    </div>
  );
}

export default HomePage;
