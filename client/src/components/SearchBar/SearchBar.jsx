import React, { useState } from 'react';
import axios from 'axios';

function SearchBar({ onSearch }) {
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = async () => {
    const isNumber = !isNaN(searchValue);
    const isUUID = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(searchValue);
  
    if (isNumber) {
      try {
        const response = await axios.get(`http://localhost:3001/videogames/id/${searchValue}`);
        onSearch([response.data]); // Pasa el resultado como un array de un solo elemento
      } catch (error) {
        console.error('Error al buscar videojuego:', error);
        onSearch([]);
      }
    } else if (isUUID) {
      try {
        const response = await axios.get(`http://localhost:3001/videogames/uuid/${searchValue}`);
        onSearch([response.data]); // Pasa el resultado como un array de un solo elemento
      } catch (error) {
        console.error('Error al buscar videojuego:', error);
        onSearch([]);
      }
    } else {
      try {
        const response = await axios.get(`http://localhost:3001/videogames/name/${searchValue}`);
        onSearch([response.data]); // Pasa el resultado como un array de un solo elemento
      } catch (error) {
        console.error('Error al buscar videojuego:', error);
        onSearch([]);
      }
    }
  };
  

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <button onClick={handleSearch}>Buscar</button>
    </div>
  );
}

export default SearchBar;

