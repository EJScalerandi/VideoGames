import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Detail({ match }) {
  const [gameDetails, setGameDetails] = useState(null);

  useEffect(() => {
    const gameId = match.params.id; // Obtiene el ID del juego desde los parámetros de la URL
    const isUUID = gameId.match(/^[0-9a-fA-F-]{36}$/); // Verifica si el ID es un UUID

    // Construye la URL de la solicitud basada en el tipo de ID
    const apiUrl = isUUID
      ? `http://localhost:3001/videogames/uuid/${gameId}`
      : `http://localhost:3001/videogames/id/${gameId}`;

    axios.get(apiUrl)
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
      <p>Descripcion: {gameDetails.description}</p>
      <h3>Plataforma: {gameDetails.platform}</h3>
      <img src={gameDetails.image || 'URL_POR_DEFECTO'} alt={gameDetails.name} />
      <h3>Fecha de lanzamiento: {gameDetails.releaseDate}</h3>
      <h3>Rating: {gameDetails.rating}</h3>
      <p>Género: {gameDetails.genders && gameDetails.genders.map((genre) => genre.name).join(', ')}</p>

      {/* Agrega el resto de los detalles del juego aquí */}
    </div>
  );
}

export default Detail;
