import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Card.module.css';

function Card({ game }) {
  // Calcula la puntuación promedio y redondea al número entero más cercano
  const averageRating = Math.round(game.rating);

  // Genera un array de 5 elementos, donde los primeros "averageRating" elementos son 1 (estrellas llenas) y el resto son 0 (estrellas vacías)
  const starsArray = Array(5).fill(0).map((_, index) => (index < averageRating ? 1 : 0));

  return (
    <div className={styles.card}>
      <Link to={`/game/${game.id}`}>
        <div className={styles.starRating}>
          <div className={styles.stars}>
            {starsArray.map((star, index) => (
              <span
                key={index}
                className={star ? styles.filledStar : styles.emptyStar}
              >
                &#9733;
              </span>
            ))}
          </div>
        </div>
        <img
          src={game.background_image || game.image}
          alt={game.name}
          className={styles.cardImage}
        />
        <h3>{game.name}</h3>
      </Link>
      <p>
        Género: {game.genres ? game.genres.map((genre) => genre.name).join(', ') : game.genders.map((gender) => gender.name).join(', ')}
      </p>
      {/* Agrega el resto de los detalles aquí */}
    </div>
  );
}

export default Card;

