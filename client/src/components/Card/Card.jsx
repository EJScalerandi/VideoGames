import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Card.module.css'; // Importa los estilos del módulo CSS

function Card({ game }) {
  return (
    <div className={styles.card}>
      <div>
        <img
          src={game.background_image || game.image}
          alt={game.name}
          className={styles.cardImage} // Aplica los estilos a la imagen
        />
        <Link to={`/game/${game.id}`}>
          <h3>{game.name}</h3>
        </Link>
        <p>
          Género: {game.genres ? game.genres.map((genre) => genre.name).join(', ') : game.genders.map((gender) => gender.name).join(', ')}
        </p>
        {/* Agrega el resto de los detalles aquí */}
      </div>
    </div>
  );
}

export default Card;
