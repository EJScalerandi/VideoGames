import React, { useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { setSearchedGame, setGameNotFound } from '../../Redux/actions';
import styles from './SearchBar.module.css'; // Importa el archivo CSS

function SearchBar(props) {
  const { setSearchedGame, setGameNotFound } = props;
  const [searchQuery, setSearchQuery] = useState('');

  // Utiliza useSelector para acceder al estado actualizado
  const searchedGame = useSelector((state) => state.searchedGame);

  const handleSearch = () => {
    const trimmedSearchQuery = searchQuery.trim();
    if (trimmedSearchQuery === '') {
      setSearchedGame([]); // Establece searchedGame como un Array vacío
      setGameNotFound(false);
    } else {
      const lowerCaseQuery = trimmedSearchQuery.toString().toLowerCase();
      setSearchedGame(lowerCaseQuery)
        .then(() => {
          // La promesa se resolvió con éxito, no es necesario verificar el tipo
          setGameNotFound(false);
        })
        .catch((error) => {
          console.error('Error al buscar el juego:', error);
          setGameNotFound(true);
        });
    }
  };

  console.log('Nuevo estado de searchedGame en el componente SearchBar:', searchedGame); // Muestra el nuevo estado en la consola

  return (
    <div className={`${styles['search-bar']}`}> {/* Utiliza la clase definida en el archivo CSS */}
      <div className={styles['input-field']}>
        <input
          type="text"
          placeholder="Buscar un videojuego..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles['search-input']} 
        />
      </div>
      <button className={styles.buttonSmall} onClick={handleSearch}>
        Buscar
      </button>
    </div>
  );
}

const mapDispatchToProps = {
  setSearchedGame,
  setGameNotFound,
};

export default connect(null, mapDispatchToProps)(SearchBar);
