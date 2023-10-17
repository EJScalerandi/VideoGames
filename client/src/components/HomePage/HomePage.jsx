import React, { useState } from 'react';
import axios from 'axios';
import SearchBar from '../SearchBar/SearchBar.jsx';

function HomePage() {
  const [searchResult, setSearchResult] = useState(null);

  const handleSearch = (searchValue) => {
    axios.get(`http://localhost:3001/videogames/${searchValue}`)
      .then((response) => {
        const data = response.data;
        setSearchResult(data);
        console.log(data);
      })
      .catch((error) => {
        console.error('Error al buscar videojuego:', error);
        setSearchResult(null);
      });
  };

  return (
    <div>
      <h1>Home Page</h1>
      <SearchBar onSearch={handleSearch} />
      <div>
        <h2>Resultado de la búsqueda:</h2>
        {searchResult && (
          <div>
            <h3>{searchResult.name}</h3>
            <p>{searchResult.description}</p>
            <img src={searchResult.image} alt={searchResult.name} />
          Gonzalez</div>
        )}
      </div>
    </div>
  );
}

export default HomePage;


