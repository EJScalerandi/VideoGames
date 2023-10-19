import React from 'react';
import { Link } from 'react-router-dom';

function Card({ game }) {
  if (!game) {
    return null; // O mostrar un mensaje de error, según tus necesidades.
  }

  return (
    <div>
      <Link to={`/game/${game.id}`}>
        <img src={game.background_image} alt={game.name} />
        <h3>{game.name}</h3>
        <p>Género: {game.genres.map((genre) => genre.name).join(', ')}</p>
      </Link>
      {/* Agrega el resto de los detalles aquí */}
    </div>
  );
}

export default Card;


