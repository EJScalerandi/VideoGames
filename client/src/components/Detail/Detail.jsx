import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Detail({ match }) {
  const [gameDetails, setGameDetails] = useState(null);
  
  useEffect(() => {
    const gameId = match.params.id; // Obtiene el ID del juego desde los parámetros de la URL
    axios.get(`http://localhost:3001/videogames/${gameId}`)
      .then((response) => {
        const data = response.data;
        setGameDetails(data);
      })
      .catch((error) => {
        console.error('Error al obtener los detalles del juego:', error);
      });
  }, [match.params.id]);
  
  if (!gameDetails) {
    return <p>Cargando...</p>;
  }

  // Renderiza los detalles completos del juego aquí
  return (
    <div>
      <h1>{gameDetails.name}</h1>
      {/* Agrega el resto de los detalles del juego aquí */}
    </div>
  );
}

export default Detail;
