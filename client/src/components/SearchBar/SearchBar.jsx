import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = () => {
    // Llama a la función `onSearch` pasando el término de búsqueda
    onSearch(searchValue);
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
