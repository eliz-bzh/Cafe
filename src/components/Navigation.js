import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';

export default class Navigation extends Component{

    render(){
        return(
            <Navbar bg='dark' expand='lg'>
                <Navbar.Toggle aria-controls='basic-navbar-nav'/>
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav>
                        <NavLink className='d-inline p-2 bg-dark text-white' to='/'>
                            Home
                        </NavLink>
                        <NavLink className='d-inline p-2 bg-dark text-white' to='/waiters'>
                            List of waiters
                        </NavLink>
                        <NavLink className='d-inline p-2 bg-dark text-white' to='/categories'>
                            Category
                        </NavLink>
                        <NavDropdown title="Menu">
                            <NavDropdown.Item href='/menu/dishes'>Dishes</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href='/menu/drinks'>Drinks</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    };
};