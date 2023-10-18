import React from 'react';
import Card from '../Card/Card';

function Cards({ games }) {
  return (
    <div className="cards-container">
      {games.map((game) => (
        <Card key={game.id} game={game} />
      ))}
    </div>
  );
}

export default Cards;

