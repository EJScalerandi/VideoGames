import React from 'react';
import Card from '../Card/Card';
import { Link } from 'react-router-dom'; // Importa Link de react-router-dom
import styles from './Cards.module.css'; // Importa los estilos CSS Modules

function Cards({ games }) {
  return (
    <div className={styles.cardsContainer}>
      {games.map((game) => (
        <Link to={`/detail/${game.id}`} key={game.id} className={styles.cardLink}>
          <Card game={game} />
        </Link>
      ))}
    </div>
  );
}

export default Cards;
