import React from 'react';
import './App.css';
import Home from './components/Home';
import Categories from './components/Category/Categories';
import Dishes from './components/Dish/Dishes';
import Drinks from './components/Drink/Drinks';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Navigation from './components/Navigation';
import Waiters from './components/Waiter/Waiters';
import Reference from './components/ReferencesSystem/References';
import SignInModal from './components/SignInModal/SignInModal';

function App() {
  return (
    <BrowserRouter>
        <div className="container">

          <h1 className='m-3 d-flex justify-content-center'>Cafe</h1>
            <Navigation/>

            <Switch>
              <Route path='/help' component={Reference}/>
              <Route path='/' component={SignInModal} exact/>
              <Route path='/home' component={Home}/>
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