import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from '../SearchBar/SearchBar';
import Cards from '../Cards/Cards';
import Card from '../Card/Card';

function HomePage() {
  const [searchedGame, setSearchedGame] = useState(null);
  const [gameNotFound, setGameNotFound] = useState(false);
  const [allGames, setAllGames] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedOrigin, setSelectedOrigin] = useState('Todos'); // Establece "Todos" como valor por defecto
  const [genreOptions, setGenreOptions] = useState([]); // Opciones de género

  useEffect(() => {
    // Realiza la petición a la URL para obtener las opciones de género
    axios.get('http://localhost:3001/genres')
      .then((response) => {
        const data = response.data;
        setGenreOptions(data);
      })
      .catch((error) => {
        console.error('Error al obtener las opciones de género:', error);
      });

    // Realiza la petición a la API para obtener todos los juegos al cargar la página
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

  // Define una función que verifica si un juego es de la API
  const isAPIGame = (id) => /^\d+$/.test(id); // Verifica si el ID es un número

  // Define una función que verifica si un juego es de la base de datos
  function isDatabaseGame(id) {
    // Verifica si el ID coincide con el formato de UUID utilizado en la base de datos
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(id);
  }

  // Filtrar la lista de juegos según el género y origen seleccionados
  const filteredGames = allGames.filter((game) => {
    const genreMatch = !selectedGenre || game.genres.some((genre) => genre.name === selectedGenre);
    const isAPI = isAPIGame(game.id);
    const isDatabase = isDatabaseGame(game.id);
    const isAllSelected = selectedOrigin === 'Todos'; // Verifica si se ha seleccionado "Todos"
    const originMatch =
      isAllSelected || // Mostrar todos los juegos si "Todos" está seleccionado
      (selectedOrigin === 'API' && isAPI) ||
      (selectedOrigin === 'Base de Datos' && isDatabase);
    return genreMatch && originMatch;
  });

  return (
    <div>
      <h1>Home Page</h1>
      <SearchBar onSearch={handleSearch} />

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
    </div>
  );
}

export default HomePage;
