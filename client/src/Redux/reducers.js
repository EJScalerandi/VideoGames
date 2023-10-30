// reducers.js
import {
    SET_SEARCHED_GAME,
    SET_GAME_NOT_FOUND,
    SET_ALL_GAMES,
    SET_SELECTED_GENRE,
    SET_SELECTED_ORIGIN,
    SET_GENRE_OPTIONS,
  } from './actions';
  
  const initialState = {
    searchedGame: [],
    gameNotFound: false,
    allGames: [],
    selectedGenre: '',
    selectedOrigin: 'Todos',
    genreOptions: [],
  };
  
  const homeReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_SEARCHED_GAME:
        return {
          ...state,
          searchedGame: action.payload,
        };
      case SET_GAME_NOT_FOUND:
        return {
          ...state,
          gameNotFound: action.payload,
        };
      case SET_ALL_GAMES:
        return {
          ...state,
          allGames: action.payload,
        };
      case SET_SELECTED_GENRE:
        return {
          ...state,
          selectedGenre: action.payload,
        };
      case SET_SELECTED_ORIGIN:
        return {
          ...state,
          selectedOrigin: action.payload,
        };
      case SET_GENRE_OPTIONS:
        return {
          ...state,
          genreOptions: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default homeReducer;
  