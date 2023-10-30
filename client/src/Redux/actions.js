// action.js

import axios from "axios";

export const SET_SEARCHED_GAME = 'SET_SEARCHED_GAME';
export const SET_GAME_NOT_FOUND = 'SET_GAME_NOT_FOUND';
export const SET_ALL_GAMES = 'SET_ALL_GAMES';
export const SET_SELECTED_GENRE = 'SET_SELECTED_GENRE';
export const SET_SELECTED_ORIGIN = 'SET_SELECTED_ORIGIN';
export const SET_GENRE_OPTIONS = 'SET_GENRE_OPTIONS';


export const setSearchGame = (searchedGame) => 
    {const endpoint = `http://localhost:3001/videogames/${searchedGame}`;
    return async (dispatch) => {
      try {
        const { data } = await axios.get(endpoint);
        return dispatch({
          type: SET_SEARCHED_GAME,
          payload: data,
        });
      } catch (error) {
         }
    }};
  

export const setGameNotFound = (gameNotFound) => ({
  type: SET_GAME_NOT_FOUND,
  payload: gameNotFound,
});

export const setAllGames = (allGames) => ({
  type: SET_ALL_GAMES,
  payload: allGames,
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
