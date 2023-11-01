import axios from "axios";

export const SET_SEARCHED_GAME = 'SET_SEARCHED_GAME';
export const SET_GAME_NOT_FOUND = 'SET_GAME_NOT_FOUND';
export const SET_ALL_GAMES = 'SET_ALL_GAMES';
export const SET_SELECTED_GENRE = 'SET_SELECTED_GENRE';
export const SET_SELECTED_ORIGIN = 'SET_SELECTED_ORIGIN';
export const SET_GENRE_OPTIONS = 'SET_GENRE_OPTIONS';
export const SORT_GAMES_BY_NAME = 'SORT_GAMES_BY_NAME';
export const SORT_GAMES_BY_RATING = 'SORT_GAMES_BY_RATING';

export const setSearchedGame = (searchedGame) => {
  // Verifica si searchedGame es una cadena vacía y devuelve un array vacío como payload
  if (searchedGame === '') {
    return {
      type: SET_SEARCHED_GAME,
      payload: [],
    };
  }

  const endpoint = `http://localhost:3001/videogames/${searchedGame}`;
  return async (dispatch) => {
    try {
      const { data } = await axios.get(endpoint);
      // Actualiza el estado usando la respuesta de la solicitud
      dispatch({
        type: SET_SEARCHED_GAME,
        payload: data,
      });
      return data; // Devuelve los datos para poder verificar el tipo de respuesta
    } catch (error) {
      console.error('Error al buscar el juego:', error);
      throw error; // Lanza el error para poder manejarlo en el componente si es necesario
    }
  };
};

  
export const setAllVideogames = (dispatch) => {
const UrlAllVideogames = "http://localhost:3001/videogames/";
  return async (dispatch) => {
  try {
    const { data } = await axios.get(UrlAllVideogames);
    dispatch({
      type: SET_ALL_GAMES,
      payload: data,
    });
    return data; // Devuelve los datos para poder verificar el tipo de respuesta
  } catch (error) {
    console.error('Error al obtener los videojuegos:', error);
    throw error; // Lanza el error para poder manejarlo en el componente si es necesario
  };
};
};
export const setAllGames = (allGames) => ({
  type: SET_ALL_GAMES,
  payload: allGames,
});

export const setGameNotFound = (gameNotFound) => ({
  type: SET_GAME_NOT_FOUND,
  payload: gameNotFound,
});
export const setSelectedGenre = (selectedGenre) => ({
  type: SET_SELECTED_GENRE,
  payload: selectedGenre,
});

export const setSelectedOrigin = (selectedOrigin) => ({
  type: SET_SELECTED_ORIGIN,
  payload: selectedOrigin,
});

export const setGenreOptions = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('http://localhost:3001/genres');
      const data = response.data;
      dispatch({
        type: SET_GENRE_OPTIONS,
        payload: data,
      });
    } catch (error) {
      console.error('Error al obtener las opciones de género:', error);
    }
  };
};

export const sortGamesByName = (order) => {
  return {
    type: SORT_GAMES_BY_NAME,
    payload: order,
  };
};

export const sortGamesByRating = (order) => {
  return {
    type: SORT_GAMES_BY_RATING,
    payload: order,
  };
};
