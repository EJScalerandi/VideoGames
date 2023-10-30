import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import fondo from '../../fondo.jpg';
import { Link } from 'react-router-dom';
import { setAllGames } from '../../Redux/actions';
import axios from 'axios';

function LandingPage(props) {
  const backgroundStyle = {
    backgroundImage: `url(${fondo})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const buttonEntryStyle = {
    backgroundColor: 'red',
    color: 'white',
    padding: '30px 60px',
    border: 'none',
    borderRadius: '15px',
    cursor: 'pointer',
    marginTop: '20px',
    marginRight: '750px',
    fontSize: '36px',
  };

  useEffect(() => {
    // Realiza la solicitud para obtener los juegos
    axios
      .get('http://localhost:3001/videogames')
      .then((response) => {
        const data = response.data;
        props.setAllGames(data); // Almacena los juegos en el store
      })
      .catch((error) => {
        console.error('Error al obtener los juegos:', error);
      });
  }, [props.setAllGames]);

  return (
    <div className="landing-page" style={backgroundStyle}>
      <Link to="/home">
        <button style={buttonEntryStyle}>Entrar</button>
      </Link>
    </div>
  );
}

const mapDispatchToProps = {
  setAllGames,
};

export default connect(null, mapDispatchToProps)(LandingPage);
