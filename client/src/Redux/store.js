// store.js
import { createStore } from 'redux';
import rootReducer from './reducers';

const store = createStore(
  rootReducer,
  // Opcional: Aplica middleware si es necesario
);

export default store;
