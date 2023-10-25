import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Card.module.css'; // Asegúrate de que la ruta del archivo CSS Modules sea correcta

function Card({ game }) {
  if (game.genres) {
    // Este es un juego de la API externa
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
  } else {
    // Este es un juego de tu base de datos
    return (
      <div className={styles.card}>
        <img src={game.image} alt={game.name} />
        <Link to={`/game/${game.id}`}>
          <h3>{game.name}</h3>
        </Link>
        <p>Género: {game.genders.map((gender) => gender.name).join(', ')}</p>
        {/* Agrega el resto de los detalles aquí */}
      </div>
    );
  }
}

export default Card;



