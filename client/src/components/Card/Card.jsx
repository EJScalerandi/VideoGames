import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Card.module.css'; // Asegúrate de que la ruta del archivo CSS Modules sea correcta

function Card({ game }) {
  if (!game || !game.genres) {
    return (
      <div className={styles.card}>
        <img src={game.background_image} alt={game.name} />
        <Link to={`/game/${game.id}`}>
          <h3>{game.name}</h3>
        </Link>
        <p>Género: No disponible</p>
        {/* Agrega el resto de los detalles aquí */}
      </div>
    );
  }

  return (
    <div className={styles.card}>
      <img src={game.background_image} alt={game.name} />
      <Link to={`/game/${game.id}`}>
        <h3>{game.name}</h3>
      </Link>
      <p>Género: {game.genres.map((genre) => genre.name).join(', ')}</p>
      {/* Agrega el resto de los detalles aquí */}
    </div>
  );
}

export default Card;


