import React from 'react';
import Home from './components/Home';
import Eslint from './components/Eslint';
//import './App.css';
import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="/eslint">Eslint</Link>
              </li>
            </ul>
          </nav>
          <Route
            exact
            path="/"
            render={() => <Redirect to="/home" />}
          />
          <Route path="/home" exact component={Home} />
          <Route path="/eslint" component={Eslint} />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
