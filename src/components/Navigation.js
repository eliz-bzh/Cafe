import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

export default class Navigation extends Component{

    render(){
        return(
            <Navbar bg='dark' expand='sm'>
                <Navbar.Toggle aria-controls='basic-navbar-nav'/>
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='col-sm-11'>
                        <NavLink className='d-inline p-2 bg-dark text-white badge-pill' to='/home'>
                            Home
                        </NavLink>
                        <NavLink className='d-inline p-2 bg-dark text-white badge-pill' to='/waiters'>
                            List of waiters
                        </NavLink>
                        <NavLink className='d-inline p-2 bg-dark text-white badge-pill' to='/categories'>
                            Category
                        </NavLink>
                        <NavDropdown title="Menu" color='inherit'>
                            <NavDropdown.Item href='/menu/dishes'>Dishes</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href='/menu/drinks'>Drinks</NavDropdown.Item>
                        </NavDropdown>
                        <NavLink className='d-inline p-2 bg-dark text-white badge-pill' to='/units'>
                            Units
                        </NavLink>
                        
                        <NavLink className='d-inline p-2 bg-dark text-white badge-pill' to='/orders'>
                            List of orders
                        </NavLink>
                    </Nav>
                    <Nav>
                    <NavLink className='d-inline p-2 bg-dark text-white badge badge-secondary badge-pill' to='/help'>
                            {<HelpOutlineIcon/>}
                        </NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    };
};
/*
<NavLink className='d-inline p-2 bg-dark text-white badge-pill' to='/stock'>
                            Stock
                        </NavLink>

*/