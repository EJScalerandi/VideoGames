import React from 'react';
import Card from '../Card/Card';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './Cards.module.css';

function Cards({ currentPageGames }) {
  const searchedGame = useSelector((state) => state.searchedGame);
  const isSearching = searchedGame.length > 1;

  return (
    <div className={styles.cardsContainer}>
      {isSearching ? (
        searchedGame.map((game, index) => (
          <div key={`searched-game-${index}`} className={styles.searchedGameCard}>
            <Card game={game} />
          </div>
        ))
      ) : currentPageGames.map((game) => (
        <Link to={`/game/${game.id}`} key={game.id} className={styles.cardLink}>
          <Card game={game} /> 
        </Link>
      ))}
      {!isSearching && currentPageGames.length === 0 && (
        <p>No existen juegos que se ajusten a la búsqueda</p>
      )}
    </div>
  );
}

export default Cards;
