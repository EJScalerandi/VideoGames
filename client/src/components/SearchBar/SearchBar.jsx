import React, { useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { setSearchedGame, setGameNotFound } from '../../Redux/actions';

function SearchBar(props) {
  const { setSearchedGame, setGameNotFound } = props;
  const [searchQuery, setSearchQuery] = useState('');

  // Utiliza useSelector para acceder al estado actualizado
  const searchedGame = useSelector((state) => state.searchedGame);

  const handleSearch = () => {
    const trimmedSearchQuery = searchQuery.trim();
    if (trimmedSearchQuery === '') {
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
    <div className="search-bar">
      <input
        type="text"
        placeholder="Buscar un videojuego..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Buscar</button>
    </div>
  );
}

const mapDispatchToProps = {
  setSearchedGame,
  setGameNotFound,
};

export default connect(null, mapDispatchToProps)(SearchBar);
