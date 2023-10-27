import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import {
  setSearchGame,
  setGameNotFound,
  setAllGames,
  setSelectedGenre,
  setSelectedOrigin,
  setGenreOptions,
} from '../../Redux/actions';
import SearchBar from '../SearchBar/SearchBar';
import Card from '../Card/Card';
import Cards from '../Cards/Cards';
import { Link } from 'react-router-dom';

function HomePage(props) {
  const {
    searchedGame,
    gameNotFound,
    allGames,
    selectedGenre,
    selectedOrigin,
    genreOptions,
    setSearchGame,
    setGameNotFound,
    setAllGames,
    setSelectedGenre,
    setSelectedOrigin,
    setGenreOptions,
  } = props;

  const [currentPage, setCurrentPage] = useState(1);
  const gamesPerPage = 15;

  useEffect(() => {
    // La carga de datos se ha movido al componente LandingPage

    // ...

  }, [setAllGames, setGenreOptions]);

  const handleSearch = (searchValue) => {
    if (searchValue) {
      setGameNotFound(false);
      setSearchGame(null);
      handleSearchRequest(searchValue);
    } else {
      setGameNotFound(true);
      setSearchGame(null);
    }
  };

  const handleSearchRequest = async (searchValue) => {
    try {
      const response = await axios.get(`http://localhost:3001/videogames/${searchValue}`);
      const data = response.data;
      if (data) {
        setSearchGame(data);
      } else {
        setGameNotFound(true);
      }
    } catch (error) {
      console.error('Error al buscar videojuego:', error);
      setSearchGame(null);
      setGameNotFound(true);
    }
  };

  const isAPIGame = (game) => typeof game.id === 'number';
  const isDatabaseGame = (game) => typeof game.id === 'string';

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
          <ul className="pagination">
            {Array.from({ length: Math.ceil(allGames.length / gamesPerPage) }).map((_, index) => (
              <li key={index} className={`page-item ${index + 1 === currentPage ? 'active' : ''}`}>
                <button
                  className="page-link"
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  searchedGame: state.searchedGame,
  gameNotFound: state.gameNotFound,
  allGames: state.allGames,
  selectedGenre: state.selectedGenre,
  selectedOrigin: state.selectedOrigin,
  genreOptions: state.genreOptions,
});

export default connect(mapStateToProps, {
  setSearchGame,
  setGameNotFound,
  setAllGames,
  setSelectedGenre,
  setSelectedOrigin,
  setGenreOptions,
})(HomePage);
