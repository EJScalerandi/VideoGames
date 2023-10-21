import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage'; // Importa el componente HomePage
import FormPage from './components/FormPage/FormPage'; // Importa el componente FormPage
import Detail from './components/Detail/Detail';
import LandingPage from './components/LandingPage/LandingPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/home" component={HomePage} />
        <Route path="/FormPage" component={FormPage} /> {/* Agrega una ruta para la página de creación de videojuegos */}
        <Route exact path="/" component={LandingPage} /> {/* Asegúrate de importar LandingPage si es necesario */}
        {/* Agrega una ruta para la página de detalles del videojuego */}
        <Route path="/game/:id" component={Detail} />
      </Switch>
    </Router>
  );
}

export default App;
