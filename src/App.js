import React from 'react';
import './App.css';
import Home from './components/Home';
import Categories from './components/Category/Categories';
import Dishes from './components/Dish/Dishes';
import Drinks from './components/Drink/Drinks';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Navigation from './components/Navigation';
import Waiters from './components/Waiter/Waiters';


function App() {
  return (
    <BrowserRouter>
      <div className="container">

        <h3 className='m-3 d-flex justify-content-center'>Cafe</h3>

        <Navigation/>

        <Switch>
          <Route path='/' component={Home} exact/>
          <Route path='/categories' component={Categories}/>
          <Route path='/menu/dishes' component={Dishes}/>
          <Route path='/menu/drinks' component={Drinks}/>
          <Route path='/waiters' component={Waiters}/>
        </Switch>
        
        
      </div>
    </BrowserRouter>
  );
}

export default App;
/*
<Switch>
          <Route path='/' component={Home} exact/>
          <Route path='/categories' component={Categories}/>
          <Route path='/dishes' component={Dishes}/>
          <Route path='/drinks' component={Drinks}/>
        </Switch>
*/