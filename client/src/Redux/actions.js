// action.js
export const SET_SEARCHED_GAME = 'SET_SEARCHED_GAME';
export const SET_GAME_NOT_FOUND = 'SET_GAME_NOT_FOUND';
export const SET_ALL_GAMES = 'SET_ALL_GAMES';
export const SET_SELECTED_GENRE = 'SET_SELECTED_GENRE';
export const SET_SELECTED_ORIGIN = 'SET_SELECTED_ORIGIN';
export const SET_GENRE_OPTIONS = 'SET_GENRE_OPTIONS';

export const setSearchGame = (searchedGame) => ({
  type: SET_SEARCHED_GAME,
  payload: searchedGame,
});

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

export const setGenreOptions = (genreOptions) => ({
  type: SET_GENRE_OPTIONS,
  payload: genreOptions,
});
