import React, { useEffect } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import FormPage from './components/FormPage/FormPage';
import Detail from './components/Detail/Detail';
import LandingPage from './components/LandingPage/LandingPage';
import { setGenreOptions } from './Redux/actions'; // Importa setGenreOptions
import { connect } from 'react-redux'; // Importa connect

function App(props) {
  useEffect(() => {
    // Realiza la llamada a setGenreOptions solo una vez cuando se carga la aplicación
    props.setGenreOptions();
  }, [props.setGenreOptions]);

  return (
    <div className= "appBackground">
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
};

export default connect(null, mapDispatchToProps)(App);
