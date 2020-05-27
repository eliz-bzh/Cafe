import React, {Component} from 'react';
import {Table} from 'react-bootstrap';
import {Button, ButtonToolbar} from 'react-bootstrap';
import AddDishModal from './AddDishModal';
import EditDishModal from './EditDishModal';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';
import SearchPanel from '../SearchPanel/SearchPanel';

export default class Dishes extends Component{

    constructor(props){
        super(props);
        this.state = {dishes: [], categories: [],
             addModalShow: false, editModalShow: false, search: '', min: 0, max: 100000000};
    }

    componentDidMount(){
        this.refreshList();
    }

    deleteDish(dishId){
        if(window.confirm('Are you sure?')){
            axios.delete(`https://localhost:44399/api/Dish/delete/${dishId}`)
            .then(res=> {
                console.log(res.data);
            })
            .catch(error=> {
                console.log(error);
            });
        }
    }

    refreshList(){
        axios.get(`https://localhost:44399/api/Dish/getAll`)
        .then(res=> {
            this.setState({dishes: res.data})
        });
    }

    componentDidUpdate(){
        this.refreshList();
    }

    onLabelSearch=(search)=>{
        this.setState({search});
    };

    onChangeMax=(event)=>{
        this.setState({max: event.target.value});
    }

    onChangeMin=(event)=>{
        this.setState({min: event.target.value});
    }

    render(){
        const {dishes, search, min, max, dishId, dishName, dishCat, dishWeight, dishFP, dishMU, dishPrice} = this.state;
        const addModalClose=()=>this.setState({addModalShow:false});
        const editModalClose=()=>this.setState({editModalShow:false});
        const filterDishes = dishes.filter(dish =>{
            return dish.name.toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) > -1;
        });
        const filterPrice = filterDishes.filter(dish =>{
            if(dish.price <= max && dish.price >= min){
                return dish;
            }
            return null;
        });
        return(
            <div>
                <SearchPanel onLabelSearch={this.onLabelSearch}/>
                <input type="text" className="form-control" placeholder='Min price' onChange={this.onChangeMin}/>
                <input type="text" className="form-control" placeholder='Max price' onChange={this.onChangeMax}/>
                <Table className='mt-4' size='sm'>
                <thead>
                    <tr>
                        <th>Dish number</th>
                        <th>Dish name</th>
                        <th>Dish category Id</th>
                        <th>Dish weight</th>
                        <th>Dish first price</th>
                        <th>Dish mark up</th>
                        <th>Dish price</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {filterPrice.map(dish=>
                        <tr key={dish.id}>
                            <td>{dish.id}</td>
                            <td>{dish.name}</td>
                            <td>{dish.categoryId}</td>
                            <td>{dish.weight}</td>
                            <td>{dish.firstPrice}</td>
                            <td>{dish.markUp}</td>
                            <td>{dish.price}</td>
                            <td>
                            <ButtonToolbar>
                                <Button 
                                variant="success" 
                                onClick={()=>this.setState({
                                    editModalShow: true, 
                                    dishId: dish.id,
                                    dishName: dish.name,
                                    dishCat: dish.categoryId,
                                    dishWeight: dish.weight,
                                    dishFP: dish.firstPrice,
                                    dishMU: dish.markUp,
                                    dishPrice: dish.price
                                    })}>
                                {<EditIcon/>}
                                </Button>

                                <div className="mr-2"></div>

                                <Button className="mr-2"
                                variant="secondary" 
                                onClick={()=>this.deleteDish(dish.id)}>
                                {<DeleteIcon/>}
                                </Button>

                                <EditDishModal
                                show={this.state.editModalShow}
                                onHide={editModalClose}
                                dishid={dishId}
                                dishname={dishName}
                                dishcat={dishCat}
                                dishweight={dishWeight}
                                dishfp={dishFP}
                                dishmu={dishMU}
                                dishprice={dishPrice}
                                />

                            </ButtonToolbar>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>

            <ButtonToolbar>
                <Button 
                variant="danger" 
                onClick={()=>this.setState({addModalShow: true})}>
                    {<AddIcon/>}
                    Add dish
                </Button>

                <AddDishModal
                show={this.state.addModalShow}
                onHide={addModalClose}/>
            </ButtonToolbar>
            </div>
        )
    }
}