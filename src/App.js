import React from 'react';
import Temperature from './components/Temperature';
import Precipitation from './components/Precipitation';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          Weather app
        </header>
        <Switch>
          <Route exact path="/" component={ Temperature } />
          <Route exact path="/precipitation" component={ Precipitation } />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
