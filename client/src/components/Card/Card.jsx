import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Card.module.css';

function Card({ game }) {
  const averageRating = Math.round(game.rating);

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
        Género: {game.genres ? game.genres.map((genre) => genre.name).join(', ') : 'No hay información de género'}
      </p>
    </div>
  );
}

export default Card;
