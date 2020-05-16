import React, {Component} from 'react';
import {Table} from 'react-bootstrap';
import axios from 'axios';

export default class Dishes extends Component{

    constructor(props){
        super(props);
        this.state = {dishes: []};
    }

    componentDidMount(){
        this.refreshList();
    }

    refreshList(){
        fetch('https://localhost:44399/api/Dish/getAll')
        .then(res=> res.json())
        .then(data=> {
            this.setState({dishes: data});
        });
    }

    render(){
        const {dishes} = this.state;
        return(
            <Table className='mt-4' size='sm'>
                <thead>
                    <tr>
                        <th>DishId</th>
                        <th>DishName</th>
                    </tr>
                </thead>
                <tbody>
                    {dishes.map(dish=>
                        <tr key={dish.id}>
                            <td>{dish.id}</td>
                            <td>{dish.name}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        )
    }
}