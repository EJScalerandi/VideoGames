import React from 'react';
import Card from '../Card/Card';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './Cards.module.css';

function Cards({ allGames }) {
  return (
    <div className={styles.cardsContainer}>
      {allGames.map((game) => (
        <Link to={`/game/${game.id}`} key={game.id} className={styles.cardLink}>
          <Card game={game} /> 
        </Link>
      ))}
      {allGames.length === 0 && (
        <p>No existen juegos que se ajusten a la búsqueda</p>
      )}
    </div>
  );
}

export default Cards;

