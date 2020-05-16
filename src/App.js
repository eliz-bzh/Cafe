import React from 'react';
import './App.css';
import Home from './components/Home';
import Dishes from './components/Dishes';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Navigation from './components/Navigation';

function App() {
  return (
    <BrowserRouter>
      <div className="container">

        <h3 className='m-3 d-flex justify-content-center'>Cafe</h3>

        <Navigation/>

        <Switch>
          <Route path='/' component={Home} exact/>
          <Route path='/dishes' component={Dishes}/>
        </Switch>


      </div>
    </BrowserRouter>
  );
}

export default App;
