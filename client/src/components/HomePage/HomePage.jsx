import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import {
  setSearchedGame,
  setGameNotFound,
  setAllGames,
  setSelectedGenre,
  setSelectedOrigin,
  setGenreOptions,
} from '../../Redux/actions';
import Cards from '../Cards/Cards';
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import styles from './HomePage.module.css';

function HomePage(props) {
  const {
    allGames,
    selectedGenre,
    selectedOrigin,
    genreOptions,
    setAllGames,
    setSelectedGenre,
    setSelectedOrigin,
    setSearchedGame,
    searchedGame
  } = props;

  const [currentPage, setCurrentPage] = useState(1);
  const gamesPerPage = 15;

  const isAPIGame = (game) => typeof game.id === 'number';
  const isDatabaseGame = (game) => typeof game.id === 'string';

  const filteredGames = allGames.filter((game) => {
    const genreMatch =
      !selectedGenre ||
      (game.genres &&
        game.genres.some((genre) => genre.name === selectedGenre)) ||
      (game.genders &&
        game.genders.some((gender) => gender.name === selectedGenre));

    const originMatch =
      !selectedOrigin ||
      selectedOrigin === 'Todos' ||
      (selectedOrigin === 'API' && isAPIGame(game)) ||
      (selectedOrigin === 'Base de Datos' && isDatabaseGame(game));

    return genreMatch && originMatch;
  });
console.log("ESTOY EN EL HOME PAGE",searchedGame)
  const [searchGame, setSearchGame] = useState('');

  let filteredGamesWithSearch = filteredGames;

  if (searchGame.trim() !== '') {
    filteredGamesWithSearch = filteredGames.filter((game) =>
      game.name.toLowerCase().includes(searchGame.toLowerCase())
    );
  }

  const totalGames = filteredGamesWithSearch.length;
  const totalPages = Math.ceil(totalGames / gamesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getPageGames = () => {
    const indexOfLastGame = currentPage * gamesPerPage;
    const indexOfFirstGame = indexOfLastGame - gamesPerPage;
    return filteredGamesWithSearch.slice(indexOfFirstGame, indexOfLastGame);
  };

  useEffect(() => {
    axios
      .get('http://localhost:3001/videogames')
      .then((response) => {
        const data = response.data;
        setAllGames(data);
      })
      .catch((error) => {
        console.error('Error al obtener los juegos:', error);
      });
  }, [setAllGames]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedGenre, selectedOrigin]);

  return (
    <div className={styles.homePage}>
      <h1 className={styles.pageTitle}>GamesConsult</h1>
      <div className={styles.buttonContainer}>
        <Link to="/formpage">
          <button className={styles.createButton}>Crear un videojuego</button>
        </Link>
      </div>
      <div className={styles.filterContainer}>
        <SearchBar searchGame={searchGame} setSearchGame={setSearchGame} />
      </div>
      <div className={styles.filterContainer}>
        <h2 className={styles.filterTitle}>Filtrar por Género:</h2>
        <select
          className={styles.select}
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
      <div className={styles.filterContainer}>
        <h2 className={styles.filterTitle}>Filtrar por Origen:</h2>
        <select
          className={styles.select}
          value={selectedOrigin}
          onChange={(e) => setSelectedOrigin(e.target.value)}
        >
          <option value="Todos">Todos</option>
          <option value="API">API</option>
          <option value="Base de Datos">Base de Datos</option>
        </select>
      </div>
      <div>
        <h2>Lista de Juegos</h2>
        {Array.isArray(filteredGamesWithSearch) && filteredGamesWithSearch.length > 0 ? (
          <>
            <Cards allGames={allGames} currentPageGames={getPageGames()} searchedGame={searchGame} />
            <ul className={styles.pagination}>
              {Array.from({ length: totalPages }).map((_, index) => (
                <li
                  key={index}
                  className={`${styles.pageItem} ${
                    index + 1 === currentPage ? styles.activePage : ''
                  }`}
                >
                  <button
                    className={styles.pageLink}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p>Por favor aguarde mientras se cargan los juegos</p>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  allGames: state.allGames,
  selectedGenre: state.selectedGenre,
  selectedOrigin: state.selectedOrigin,
  genreOptions: state.genreOptions,
  searchedGame: state.searchedGame, // Agregado para mantener consistencia
});

export default connect(mapStateToProps, {
  setAllGames,
  setSelectedGenre,
  setSelectedOrigin,
  setSearchedGame,
  setGenreOptions,
})(HomePage);
