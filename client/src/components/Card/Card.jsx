import React from 'react';

function Card({ game }) {
  if (!game) {
    return null; // O mostrar un mensaje de error, según tus necesidades.
  }

  return (
    <div>
      <h3>{game.name}</h3>
      {/* Agrega el resto de los detalles aquí */}
    </div>
  );
}

export default Card;


