import React, { useEffect } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import FormPage from './components/FormPage/FormPage';
import Detail from './components/Detail/Detail';
import LandingPage from './components/LandingPage/LandingPage';
import { setGenreOptions, setAllVideogames, setAllGamesInit, setAllGames } from './Redux/actions';
import { connect } from 'react-redux';

function App(props) {
  useEffect(() => {
    // Cargar videojuegos y almacenar en allGamesInit y allGames
    props.setAllVideogames();
    props.setGenreOptions();
  }, [props.setGenreOptions, props.setAllVideogames]);
  
  return (
    <div className="appBackground">
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/FormPage" element={<FormPage />} />
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/game/:id" element={<Detail />} />
      </Routes>
    </div>
  );
}

const mapDispatchToProps = {
  setGenreOptions,
  setAllVideogames,
  setAllGamesInit,
  setAllGames,
};

export default connect(null, mapDispatchToProps)(App);
