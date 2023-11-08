import React, { useEffect, useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import FormPage from './components/FormPage/FormPage';
import Detail from './components/Detail/Detail';
import LandingPage from './components/LandingPage/LandingPage';
import { setGenreOptions, setAllVideogames,  } from './Redux/actions';
import { connect } from 'react-redux';
import Error from './components/Error/Error';



function App(props) {

const [error, setError] = useState(false)

useEffect(() => {
  const fetchData = async () => {
    try {
      await props.setAllVideogames();
      await props.setGenreOptions();
      } catch (error) {
      setError(true); // Set the error state when an error occurs
    }
  };

  fetchData()

}, [props.setGenreOptions, props.setAllVideogames]);
console.log(error)
  // useEffect(() => {
  //   // Cargar videojuegos y almacenar en allGamesInit y allGames
  //   try {props.setAllVideogames()
  //     props.setGenreOptions();
  //   } catch (error) {
      
  //   }
    
  // }, [props.setGenreOptions, props.setAllVideogames]);
  
  return (
    <div className="appBackground">
      {error ? (
        <Error message={error.message} />
      ) : (
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/FormPage" element={<FormPage />} />
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/game/:id" element={<Detail />} />
      </Routes>
      )}
    </div>
  );
}

const mapDispatchToProps = {
  setGenreOptions,
  setAllVideogames,
};

export default connect(null, mapDispatchToProps)(App);
