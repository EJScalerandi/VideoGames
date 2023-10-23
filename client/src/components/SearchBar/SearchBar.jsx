import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = () => {
    // Validar si es un UUID o ID
    if (/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(searchValue)) {
      // Llama a la función `onSearch` pasando el término de búsqueda y un indicador de tipo (UUID o ID)
      onSearch(searchValue, 'uuid');
    } else {
      onSearch(searchValue, 'id');
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
