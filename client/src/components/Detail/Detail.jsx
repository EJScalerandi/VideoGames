import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './Detail.module.css';
import { Link } from 'react-router-dom';

function Detail() {
  const { id } = useParams();
  const [gameDetails, setGameDetails] = useState(null);
  const [isDataFromAPI, setIsDataFromAPI] = useState(false);

  useEffect(() => {
    const isUUID = id.match(/^[0-9a-fA-F-]{36}$/);
    const apiUrl = isUUID
      ? `http://localhost:3001/videogames/uuid/${id}`
      : `http://localhost:3001/videogames/id/${id}`;

    axios
      .get(apiUrl)
      .then((response) => {
        const data = response.data;
        response.data.genres = response.data.genders;
        delete response.data.genders;
        console.log(data)
        setGameDetails(data);
        setIsDataFromAPI(data.genres && data.genres.length > 0);
      })
      .catch((error) => {
        console.error('Error al obtener los detalles del juego:', error);
      });
  }, [id]);

  if (!gameDetails) {
    return <p>Cargando...</p>;
  }

  function removeHTMLTags(text) {
    return text.replace(/<p>|<\/p>|<br \/>/g, '');
  }

  function getSpanishDescription() {
    const espanolDescription = gameDetails.description.split('Español');
    return espanolDescription.length > 1
      ? removeHTMLTags(espanolDescription[1])
      : removeHTMLTags(gameDetails.description);
  }

  return (
    <div className={styles.detailsContainer}>
      <div className={styles.navigation}>
        <Link to="/home/" className={`${styles.homeLink} ${styles.buttonEntryStyle}`}>Volver al Home</Link>
      </div>
      <div className={styles.gameTitle}>
        <h1>{gameDetails.name}</h1>
      </div>
      <div className={styles.description}>
        <p>Descripción: {getSpanishDescription()}</p>
      </div>
      <div className={styles.gameImage}>
        <img
          src={gameDetails.image || 'URL_POR_DEFECTO'}
          alt={gameDetails.name}
          className={styles.gameImageSize}
        />
      </div>
      <div className={styles.additionalInfo}>
        <p className={styles.genres}>
          Género: {gameDetails.genres && gameDetails.genres.map((genre) => genre.name).join(', ')}
        </p>
        <p className={styles.releaseDate}>Fecha de lanzamiento: {gameDetails.releaseDate.substring(0, 10)}</p>
        <p className={styles.rating}>Rating: {gameDetails.rating}</p>
      </div>
    </div>
  );
}

export default Detail;

