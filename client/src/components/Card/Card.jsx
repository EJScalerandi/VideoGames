import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Card.module.css';

function Card({ game }) {
  return (
    <div className={styles.card}>
      {game.genres ? (
        <div>
          <img src={game.background_image} alt={game.name} />
          <Link to={`/game/${game.id}`}>
            <h3>{game.name}</h3>
          </Link>
          <p>Género: {game.genres.map((genre) => genre.name).join(', ')}</p>
          {/* Agrega el resto de los detalles aquí */}
        </div>
      ) : (
        <div>
          <img src={game.image} alt={game.name} />
          <Link to={`/game/${game.id}`}>
            <h3>{game.name}</h3>
          </Link>
          <p>Género: {game.genders.map((gender) => gender.name).join(', ')}</p>
          {/* Agrega el resto de los detalles aquí */}
        </div>
      )}
    </div>
  );
}

export default Card;



