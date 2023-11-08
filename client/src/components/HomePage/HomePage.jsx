import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Cards from '../Cards/Cards';
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import styles from './HomePage.module.css';
import image1 from '../../assets/Carga1.jpg';
import image2 from '../../assets/Carga2.jpg'; 
import image3 from '../../assets/Carga3.jpg'; 
import {
  setSearchedGame,
  setAllGames,
setSelectedGenre,
setSelectedOrigin,
setGenreOptions,
sortGamesByName,
sortGamesByRating,
} from '../../Redux/actions';

function HomePage(props) {
  const {
    allGames,
    allGamesInit,
    selectedGenre,
    selectedOrigin,
    genreOptions,
    setAllGames,
    setSelectedGenre,
    setSelectedOrigin,
    searchedGame,
    sortOrder,
    sortGamesByName,
    sortGamesByRating,
    } = props;
  
 
  const isAPIGame = (game) => typeof game.id === 'number';
  const isDatabaseGame = (game) => typeof game.id === 'string';

  
  const handleResetFilters = () => {
  setSearchedGame([]);
  setSelectedGenre('');
  setSelectedOrigin('Todos');
  sortGamesByName('');
  };
  console.log(allGamesInit)
  const filteredGames = allGames.filter((game) => {
    const genreMatch =
    !selectedGenre ||
    (game.genres &&
      game.genres.some((genre) => genre.name === selectedGenre)) 
      
      
      const originMatch =
        !selectedOrigin ||
        selectedOrigin === 'Todos' ||
        (selectedOrigin === 'API' && isAPIGame(game)) ||
        (selectedOrigin === 'Base de Datos' && isDatabaseGame(game));
        
        return genreMatch && originMatch;
      });
      
      const [searchGame, setSearchGame] = useState('');
      
      let filteredGamesWithSearch = filteredGames;
      
      if (searchGame.trim() !== '') {
        filteredGamesWithSearch = filteredGames.filter((game) =>
        game.name.toLowerCase().includes(searchGame.toLowerCase())
        );
      }
      
      useEffect(() => {
        const handleSortOrderChange = () => {
          let data = allGames;
    
          if (sortOrder === 'asc') {
            data = data.sort((a, b) => a.name.localeCompare(b.name));
          } else if (sortOrder === 'desc') {
            data = data.sort((a, b) => b.name.localeCompare(a.name));
          } else if (sortOrder === 'ratingAsc') {
            data = data.sort((a, b) => a.rating - b.rating);
          } else if (sortOrder === 'ratingDesc') {
            data = data.sort((a, b) => b.rating - a.rating);
          } else if (sortOrder === "") {
            let databaseGames = allGames.filter(isDatabaseGame);
            let apiGames = allGames.filter(isAPIGame);
    
            // Ordena los juegos de la API por ID de manera creciente
            apiGames.sort((a, b) => a.id - b.id);
    
            // Combina los juegos de la Base de Datos y la API
            data = [...databaseGames, ...apiGames];
          }
    
          setAllGames(data);
          };
    
        handleSortOrderChange();
      }, [sortOrder]);
   
      
      
      
      
      const [currentPage, setCurrentPage] = useState(1);
      const gamesPerPage = 15;
      const totalGames = filteredGamesWithSearch.length;
      const totalPages = Math.ceil(totalGames / gamesPerPage);

      const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
      };
      
      useEffect(() => {
        setCurrentPage(1);
      }, [selectedGenre, selectedOrigin]);
      const getPageGames = () => {
        const indexOfLastGame = currentPage * gamesPerPage;
        const indexOfFirstGame = indexOfLastGame - gamesPerPage;
        return filteredGamesWithSearch.slice(indexOfFirstGame, indexOfLastGame);
      };
      
  const [currentImage, setCurrentImage] = useState(0);
  const images = [image1, image2, image3];

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentImage((currentImage + 1) % images.length);
  //   }, 500);

  //   return () => clearInterval(interval);
  // }, [currentImage]);

  return (
    <div className={styles.homePage}>
      <h1 className={styles.gameConsultTitle}>PAC - MANIA</h1>
      <div className={styles.buttonContainer}>
        <div>
          <button className={styles.buttonSmall} onClick={handleResetFilters}>Limpiar Filtros</button>
        </div>
        <div>
          <Link to="/formpage">
            <button className={styles.createButton}>Crear un videojuego</button>
          </Link>
        </div>
      </div>
      <div className={styles.filtersWrapper}>
        <div className={styles.filtersGroup}>
          <div className={styles.filterContainer}>
            <h2 className={styles.filterTitle}>Filtrar por Género:</h2>
            <select
              className={`${styles.select} ${styles.sortSelect}`}
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
              className={`${styles.select} ${styles.sortSelect}`}
              value={selectedOrigin}
              onChange={(e) => setSelectedOrigin(e.target.value)}
            >
              <option value="Todos">Todos</option>
              <option value="API">API</option>
              <option value="Base de Datos">Base de Datos</option>
            </select>
          </div>
        </div>
        <div className={styles.filtersGroup}>
          <div className={styles.filterContainer}>
            <h2 className={styles.filterTitle}>Filtrar por Alfabeto:</h2>
            <select
              className={`${styles.select} ${styles.sortSelect}`}
              onChange={(e) => sortGamesByName(e.target.value)}
            >
              <option value="asc">Ascendente</option>
              <option value="desc">Descendente</option>
            </select>
          </div>
          <div className={styles.filterContainer}>
            <h2 className={styles.filterTitle}>Filtrar por Rating:</h2>
            <select
              className={`${styles.select} ${styles.sortSelect}`}
              onChange={(e) => sortGamesByRating(e.target.value)}
            >
              <option value="ratingAsc">Ascendente</option>
              <option value="ratingDesc">Descendente</option>
            </select>
          </div>
        </div>
      </div>
      <div className={styles.filterContainer}>
        <SearchBar  />
      </div>
      <div>
        <h2 className={styles.pageTitle}>Lista de Juegos</h2>
        {Array.isArray(filteredGamesWithSearch) && filteredGamesWithSearch.length > 0 ? (
          <>
          
            <Cards allGames={allGames} currentPageGames={getPageGames()} searchedGame={searchedGame} />
            <ul className={styles.pagination}>
              {Array.from({ length: totalPages }).map((_, index) => (
                <li
                  key={index}
                  className={`${styles.pageItem} ${
                    index + 1 === currentPage ? styles.activePage : ''
                  }`
                }>
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
          <div>
        <img src={images[currentImage]} alt="Carga" className={styles.imageLoading} />
        <h2>Espera a que cargue........., o te las veras conmigo</h2>
      </div>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  allGamesInit: state.allGamesInit,
  allGames: state.allGames,
  selectedGenre: state.selectedGenre,
  selectedOrigin: state.selectedOrigin,
  genreOptions: state.genreOptions,
  searchedGame: state.searchedGame,
  sortOrder: state.sortOrder,
});

export default connect(mapStateToProps, {
  setAllGames,
  setSelectedGenre,
  setSelectedOrigin,
  setSearchedGame,
  setGenreOptions,
  sortGamesByName,
  sortGamesByRating,
})(HomePage);
