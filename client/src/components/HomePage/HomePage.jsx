import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Importa el componente Link
import SearchBar from '../SearchBar/SearchBar';
import Cards from '../Cards/Cards';
import Card from '../Card/Card';

function HomePage() {
  const [searchedGame, setSearchedGame] = useState(null);
  const [gameNotFound, setGameNotFound] = useState(false);
  const [allGames, setAllGames] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedOrigin, setSelectedOrigin] = useState('Todos');
  const [genreOptions, setGenreOptions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const gamesPerPage = 15; // Cantidad de juegos por página

  useEffect(() => {
    axios.get('http://localhost:3001/genres')
      .then((response) => {
        const data = response.data;
        setGenreOptions(data);
      })
      .catch((error) => {
        console.error('Error al obtener las opciones de género:', error);
      });

    // Obtener todos los juegos disponibles en la API
    axios.get('http://localhost:3001/videogames/')
      .then((response) => {
        const data = response.data;
        setAllGames(data);
        console.log(data);
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

  const isAPIGame = (id) => /^\d+$/.test(id);
  function isDatabaseGame(id) {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(id);
  }

  const paginateGames = (allGames) => {
    const indexOfLastGame = currentPage * gamesPerPage;
    const indexOfFirstGame = indexOfLastGame - gamesPerPage;
    return allGames.slice(indexOfFirstGame, indexOfLastGame);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filteredGames = paginateGames(allGames).filter((game) => {
    const genreMatch = !selectedGenre || game.genres.some((genre) => genre.name === selectedGenre);
    const isAPI = isAPIGame(game.id);
    const isDatabase = isDatabaseGame(game.id);
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
    <button>Ir a FormPage</button>
  </Link>
  {/* Resto del contenido */}
</div>

      <div>
        <h2>Filtrar por Género:</h2>
        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
        >
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
        <select
          value={selectedOrigin}
          onChange={(e) => setSelectedOrigin(e.target.value)}
        >
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
            <p>No hay juegos disponibles.</p>
          )}
        </div>
      )}

      <div className="pagination">
        {Array.from({ length: Math.ceil(allGames.length / gamesPerPage) }).map((_, index) => (
          <button key={index} onClick={() => handlePageChange(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
