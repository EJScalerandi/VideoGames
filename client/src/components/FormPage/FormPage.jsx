import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setGenreOptions } from '../../Redux/actions';
import axios from 'axios';
import styles from './FormPage.module.css'; // Importa los estilos

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

  const { genreOptions } = props;

  const [successMessage, setSuccessMessage] = useState('');

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
    return true; // Implementa tu lógica de validación de URL
  }

  const isValidDate = (date) => {
    return true; // Implementa tu lógica de validación de fecha
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (typeof formData.name !== 'string') {
      alert('El nombre debe ser una cadena de texto.');
      return;
    }

    if (typeof formData.description !== 'string') {
      alert('La descripción debe ser una cadena de texto.');
      return;
    }

    if (typeof formData.platform !== 'string') {
      alert('La plataforma debe ser una cadena de texto.');
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

    if (isNaN(formData.rating) || formData.rating <= 0) {
      alert('La calificación debe ser un número válido y mayor que cero.');
      return;
    }

    axios
      .post('http://localhost:3001/videogames/', formData)
      .then((response) => {
        console.log('Videojuego creado:', response.data);
        setSuccessMessage('El juego se creó exitosamente.');

        // Mostrar una ventana emergente con el mensaje de éxito
        window.alert('El juego se creó exitosamente.');

        // Redirigir al usuario al "home" u otra página después de aceptar el mensaje
        window.location.href = 'http://localhost:3000/home/'; // Reemplaza '/' con la URL de tu página principal
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
          <label className={styles.cardText}>Nombre:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>

        <div className={styles['form-group']}>
          <label className={styles.cardText}>Descripción:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className={styles['entry-field-description']} // Agrega esta línea
          />
        </div>

        <div className={styles['form-group']}>
          <label className={styles.cardText}>Plataforma:</label>
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
            <option value="" disabled hidden>Seleccione un género</option>
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
        </div>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => ({
  genreOptions: state.genreOptions,
});

export default connect(mapStateToProps)(FormPage);

