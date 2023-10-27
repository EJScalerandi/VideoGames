import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import FormPage from './components/FormPage/FormPage';
import Detail from './components/Detail/Detail';
import LandingPage from './components/LandingPage/LandingPage';
import { Provider } from 'react-redux'; // Importa Provider
import store from './Redux/store'; // Importa tu store

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route path="/FormPage" component={FormPage} />
          <Route exact path="/" component={LandingPage} />
          <Route path="/game/:id" component={Detail} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;

