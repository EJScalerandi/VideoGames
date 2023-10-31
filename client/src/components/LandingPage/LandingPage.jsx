import React from 'react';
import { Link } from 'react-router-dom';
import fondo from '../../fondo.jpg';

function LandingPage() {
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

  return (
    <div className="landing-page" style={backgroundStyle}>
      <Link to="/home">
        <button style={buttonEntryStyle}>Entrar</button>
      </Link>
    </div>
  );
}

export default LandingPage;
