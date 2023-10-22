import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FormPage() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    platform: '',
    image: '',
    releaseDate: '',
    rating: '',
    genres: '',
  });

  const [genreOptions, setGenreOptions] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    axios.get('http://localhost:3001/genres')
      .then((response) => {
        const data = response.data;
        setGenreOptions(data);
      })
      .catch((error) => {
        console.error('Error al obtener las opciones de género:', error);
      });
  }, []);

  const isValidURL = (url) => {
    // Implementa una lógica para validar que sea una URL válida
    // Devuelve true si es una URL válida, false en caso contrario
    return true;
  };

  const isValidDate = (date) => {
    // Implementa una lógica para validar que sea una fecha válida (AAAA-MM-DD)
    // Devuelve true si es una fecha válida, false en caso contrario
    return true;
  };

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

    // Resto del código para enviar la solicitud POST
    axios
      .post('http://localhost:3001/videogames/', formData)
      .then((response) => {
        console.log('Videojuego creado:', response.data);
        setSuccessMessage('El juego se creó exitosamente.');
        // Aquí puedes redirigir al usuario a la página de inicio u otras acciones
      })
      .catch((error) => {
        console.error('Error al crear el videojuego:', error);
      });
  };

  return (
    <div>
      <h1>Crear Nuevo Videojuego</h1>
      {successMessage && <p>{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Descripción:
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Plataforma:
          <input
            type="text"
            name="platform"
            value={formData.platform}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Imagen (URL):
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Fecha de Lanzamiento (AAAA-MM-DD):
          <input
            type="text"
            name="releaseDate"
            value={formData.releaseDate}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Calificación:
          <input
            type="number"
            name="rating"
            value={formData.rating}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Género:
          <select
            name="genres"
            value={formData.genres}
            onChange={handleInputChange}
          >
            <option value="">Selecciona un género</option>
            {genreOptions.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </label>

        <button type="submit">Crear Videojuego</button>
      </form>
    </div>
  );
}

export default FormPage;
