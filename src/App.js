import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import ApiDoc from './pages/ApiDoc';
import * as AiIcons from 'react-icons/ai';


function App() {

  return (
    <div className="fullscreen">
      {
        // Router navigates to the pages
      }
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/api' component={ApiDoc} />
        </Switch>
      </Router>

      {
        // Footer text
      }
      <span style={{ color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>A Madhour Project <AiIcons.AiOutlineFieldTime /></span>
    </div>
  );
}

export default App;
