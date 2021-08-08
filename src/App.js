import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Home from './pages/Home';
import ApiDoc from './pages/ApiDoc';
import About from './pages/About';



function App() {

  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/api' component={ApiDoc} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
