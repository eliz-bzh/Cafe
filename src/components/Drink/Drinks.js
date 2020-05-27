import React, {Component} from 'react';
import {Table} from 'react-bootstrap';
import {Button, ButtonToolbar} from 'react-bootstrap';
import AddDrinkModal from './AddDrinkModal';
import EditDrinkModal from './EditDrinkModal';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';
import SearchPanel from '../SearchPanel/SearchPanel';

export default class Dishes extends Component{

    constructor(props){
        super(props);
        this.state = {drinks: [], addModalShow: false, editModalShow: false, search: '', min: 0, max: 100000000};
    }

    componentDidMount(){
        this.refreshList();
    }

    deleteDrink(drinkId){
        if(window.confirm('Are you sure?')){
            axios.delete(`https://localhost:44399/api/Drink/delete/${drinkId}`)
            .then(res=> {
                console.log(res.data);
            })
            .catch(error=> {
                console.log(error);
            });
        }
    }

    refreshList(){
        axios.get(`https://localhost:44399/api/Drink/getAll`)
        .then(res=> {
            this.setState({drinks: res.data});
        })
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
        const {drinks, search, min, max, drinkId, drinkName, drinkCat, drinkVolume, drinkFP, drinkMU, drinkPrice} = this.state;
        const addModalClose=()=>this.setState({addModalShow:false});
        const editModalClose=()=>this.setState({editModalShow:false});
        const filterDrinks = drinks.filter(drink =>{
            return drink.name.toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) > -1;
        });
        const filterPrice = filterDrinks.filter(drink =>{
            if(drink.price <= max && drink.price >= min){
                return drink;
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
                        <th>Drink number</th>
                        <th>Drink name</th>
                        <th>Drink category</th>
                        <th>Drink volume</th>
                        <th>Drink first price</th>
                        <th>Drink mark up</th>
                        <th>Drink price</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {filterPrice.map(drink=>
                        <tr key={drink.id}>
                            <td>{drink.id}</td>
                            <td>{drink.name}</td>
                            <td>{drink.categoryId}</td>
                            <td>{drink.volume}</td>
                            <td>{drink.firstPrice}</td>
                            <td>{drink.markUp}</td>
                            <td>{drink.price}</td>
                            <td>
                            <ButtonToolbar>
                                <Button 
                                variant="success" 
                                onClick={()=>this.setState({
                                    editModalShow: true, 
                                    drinkId: drink.id,
                                    drinkName: drink.name,
                                    drinkCat: drink.category,
                                    drinkVolume: drink.volume,
                                    drinkFP: drink.firstPrice,
                                    drinkMU: drink.markUp,
                                    drinkPrice: drink.price
                                    })}>
                                {<EditIcon/>}
                                </Button>

                                <div className="mr-2"></div>

                                <Button className="mr-2"
                                variant="secondary" 
                                onClick={()=>this.deleteDrink(drink.id)}>
                                {<DeleteIcon/>}
                                </Button>

                                <EditDrinkModal
                                show={this.state.editModalShow}
                                onHide={editModalClose}
                                drinkid={drinkId}
                                drinkname={drinkName}
                                drinkcat={drinkCat}
                                drinkvolume={drinkVolume}
                                drinkfp={drinkFP}
                                drinkmu={drinkMU}
                                drinkprice={drinkPrice}
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
                    Add drink
                </Button>

                <AddDrinkModal
                show={this.state.addModalShow}
                onHide={addModalClose}/>
            </ButtonToolbar>
            </div>
        )
    }
}