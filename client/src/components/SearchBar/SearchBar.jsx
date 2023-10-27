// SearchBar.js
import React, { useState } from 'react';
import axios from 'axios';

function SearchBar({ onSearch }) {
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3001/videogames/${searchValue}`);
      onSearch(response.data);
    } catch (error) {
      console.error('Error al buscar videojuego:', error);
      onSearch([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <button onClick={handleSearch} disabled={loading}>
        {loading ? 'Buscando...' : 'Buscar'}
      </button>
    </div>
  );
}

export default SearchBar;
