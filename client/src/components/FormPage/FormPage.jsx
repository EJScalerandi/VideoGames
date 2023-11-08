import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import styles from './FormPage.module.css';
import { Link } from 'react-router-dom';
import { setAddGame, setAllGames } from '../../Redux/actions';

function FormPage(props) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    platform: '',
    image: '',
    releaseDate: '',
    rating: '',
    Genders: [],
  });

  const { genreOptions, setAllGamesInit, allGamesInit, setAllGames } = props;

  const [successMessage, setSuccessMessage] = useState('');

  const homeLinkRef = useRef(null); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  const handleGenreChange = (genre) => {
    if (!formData.Genders.includes(genre)) {
      setFormData({ ...formData, Genders: [...formData.Genders, genre] });
    }
  }

  const removeGenre = (genre) => {
    const updatedGenres = formData.Genders.filter((g) => g !== genre);
    setFormData({ ...formData, Genders: updatedGenres });
  }

  const isValidURL = (url) => {
  
    const urlPattern = /^(https?:\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/;
    return urlPattern.test(url);
  }
  
  const isValidDate = (date) => {

    const datePattern = /^\d{4}\/\d{2}\/\d{2}$/;
    return datePattern.test(date);
  }
  

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!formData.name) {
      alert('El campo Nombre es obligatorio.');
      return;
    }
  
    if (formData.description.length < 20) {
      alert('La descripción debe ser una cadena de texto de al menos 20 caracteres.');
      return;
    }
    if (formData.platform.length === 0) {
      alert('Debe agregar una plataforma al menos.');
      return;
    }
    if (!isValidURL(formData.image)) {
      alert('La imagen debe ser una URL válida.');
      return;
    }
    
    if (!isValidDate(formData.releaseDate)) {
      alert('La fecha de lanzamiento debe ser una fecha válida (AAAA-MM-DD).');
      return;
    }
  
    if (isNaN(formData.rating) || formData.rating <= 0 || formData.rating > 5) {
      alert('La calificación debe ser un número entre 0 y 5.');
      return;
    }
  
    if (formData.Genders.length === 0) {
      alert('Debe seleccionar al menos un género.');
      return;
    }

    axios
      .post('http://localhost:3001/videogames/', formData)
      .then((response) => {
        response.data.genres = response.data.genders;
    delete response.data.genders;

    console.log('Videojuego creado:', response.data);
    setSuccessMessage('El juego se creó exitosamente');

    const updateAllGames = [response.data, ...allGamesInit];
    setAllGames(updateAllGames);

    window.alert('El juego se creó exitosamente');

    homeLinkRef.current.click();
      })
      .catch((error) => {
        console.error('Error al crear el videojuego:', error);
      });
  }

  return (
    <div className={styles['form-container']}>
      <h1 className={styles['form-title']}>Carga un nuevo Videojuego</h1>
      {successMessage && <p className={styles.successMessage}>{successMessage}</p>}
      <form onSubmit={handleSubmit} className={styles['form-card']}>
        <div className={styles['form-group']}>
          <label className={styles.cardText}>Nombre *:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>

        <div className={styles['form-group']}>
          <label className={styles.cardText}>Descripción *:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className={styles['entry-field-description']}
          />
        </div>

        <div className={styles['form-group']}>
          <label className={styles.cardText}>Plataforma *:</label>
          <input
            type="text"
            name="platform"
            value={formData.platform}
            onChange={handleInputChange}
          />
        </div>

        <div className={styles['form-group']}>
          <label className={styles.cardText}>Imagen (URL):</label>
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
          />
        </div>

        <div className={styles['form-group']}>
          <label className={styles.cardText}>Fecha de Lanzamiento (AAAA-MM-DD):</label>
          <input
            type="text"
            name="releaseDate"
            value={formData.releaseDate}
            onChange={handleInputChange}
          />
        </div>

        <div className={styles['form-group']}>
          <label className={styles.cardText}>Calificación:</label>
          <input
            type="number"
            name="rating"
            value={formData.rating}
            onChange={handleInputChange}
          />
        </div>

        <div className={styles['form-group']}>
          <label className={styles.cardText}>Género:</label>
          <select
            value=""
            onChange={(e) => handleGenreChange(e.target.value)}
          >
            <option value="" disabled hidden>Seleccione un género:</option>
            {genreOptions.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
          <div className={styles['selected-genres']}>
            {formData.Genders.map((genre) => (
              <div key={genre} className={styles['selected-genre']}>
                {genre}
                <button
                  className={styles['remove-genre']}
                  onClick={() => removeGenre(genre)}
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className={styles['form-group']}>
          <button type="submit" className={styles['card-button']}>
            Crear Videojuego
          </button>
          <div className={styles.navigation}>
            <Link
              to="/home/"
              className={`${styles.homeLink} ${styles.buttonEntryStyle}`}
              ref={homeLinkRef} // Agrega la referencia
              id="homeLink" // Agrega un id para que funcione como un enlace
            >
              Volver al Home
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => ({
  genreOptions: state.genreOptions,
  allGamesInit: state.allGamesInit,
  allGames: state.allGames
});
const mapDispatchToProps = (dispatch) => ({
  setAddGame: (game) => dispatch(setAddGame(game)),
  setAllGames: (games) => dispatch(setAllGames(games)), // Asegúrate de que esta línea esté presente
});

export default connect(mapStateToProps, mapDispatchToProps)(FormPage);
