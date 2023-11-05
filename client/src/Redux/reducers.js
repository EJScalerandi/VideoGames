import {
  SET_SEARCHED_GAME,
  SET_GAME_NOT_FOUND,
  SET_ALL_GAMES,
  SET_SELECTED_GENRE,
  SET_SELECTED_ORIGIN,
  SET_GENRE_OPTIONS,
  SORT_GAMES_BY_NAME,
  SORT_GAMES_BY_RATING,
  SET_ALL_GAMES_INIT, // Agrega esta importación
} from './actions';

const initialState = {
  allGamesInit: [], // Nuevo estado para guardar la copia inicial de allGames
  searchedGame: [],
  gameNotFound: false,
  allGames: [],
  selectedGenre: '',
  selectedOrigin: 'Todos',
  genreOptions: [],
  sortOrder: '',
};

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCHED_GAME:
      return {
        ...state,
        searchedGame: action.payload,
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
    case SORT_GAMES_BY_NAME:
      return {
        ...state,
        sortOrder: action.payload,
      };
    case SORT_GAMES_BY_RATING:
      return {
        ...state,
        sortOrder: action.payload,
      };
    case SET_ALL_GAMES_INIT: // Nuevo case para SET_ALL_GAMES_INIT
      return {
        ...state,
        allGamesInit: action.payload,
      };
    default:
      return state;
  }
};

export default reducers;
