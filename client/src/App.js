// App.js
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage..jsx'; // Importa el componente LandingPage
import homePage from "./components/HomePage/HomePage.jsx";


function App() {
  return (
    <Router>
      <Route path="/home" component={homePage} />
      <Route exact path="/" component={LandingPage} /> 
    </Router>
  );
}

export default App;
