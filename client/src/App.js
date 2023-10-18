import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage..jsx'; // Importa el componente LandingPage
import HomePage from "./components/HomePage/HomePage.jsx";
import Detail from "./components/Detail/Detail";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/home" component={HomePage} />
        <Route exact path="/" component={LandingPage} />
        {/* Agrega una ruta para la página de detalles del videojuego */}
        <Route path="/game/:id" component={Detail} />
      </Switch>
    </Router>
  );
}

export default App;
