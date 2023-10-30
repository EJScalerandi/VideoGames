import React, { useState } from 'react';

function SearchBar({ onSearch, allGames }) {
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);


  const handleSearch = (searchValue) => {
    if (searchValue) {
      setGameNotFound(false);
      setSearchGame(null);
      handleSearchRequest(searchValue);
    } else {
      setGameNotFound(true);
      setSearchGame(null);
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
      <button onClick={handleSearch} disabled={loading}>
        {loading ? 'Buscando...' : 'Buscar'}
      </button>
    </div>
  );
}

export default SearchBar;
