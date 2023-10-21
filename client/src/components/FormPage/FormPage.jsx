import React, { useState } from 'react';
import axios from 'axios';

function FormPage() {
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    description: '',
    platforms: '',
    releaseDate: '',
    rating: '',
    genres: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Realizar la solicitud POST
    axios
      .post('http://localhost:3001/videogames/', formData)
      .then((response) => {
        console.log('Videojuego creado:', response.data);
        // Aquí puedes redirigir al usuario a la página de inicio o realizar otras acciones
      })
      .catch((error) => {
        console.error('Error al crear el videojuego:', error);
      });
  };

  return (
    <div>
      <h1>Crear Nuevo Videojuego</h1>
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
          Imagen:
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Descripción:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Plataformas:
          <input
            type="text"
            name="platforms"
            value={formData.platforms}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Fecha de Lanzamiento:
          <input
            type="text"
            name="releaseDate"
            value={formData.releaseDate}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Rating:
          <input
            type="text"
            name="rating"
            value={formData.rating}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Géneros:
          <input
            type="text"
            name="genres"
            value={formData.genres}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Crear Videojuego</button>
      </form>
    </div>
  );
}

export default FormPage;
