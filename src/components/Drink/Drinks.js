import React, {Component} from 'react';
import {Table} from 'react-bootstrap';
import {Button, ButtonToolbar} from 'react-bootstrap';
import AddDrinkModal from './AddDrinkModal';
import EditDrinkModal from './EditDrinkModal';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';

export default class Dishes extends Component{

    constructor(props){
        super(props);
        this.state = {drinks: [], addModalShow: false, editModalShow: false};
    }

    componentDidMount(){
        this.refreshList();
    }

    deleteDish(drinkId){
        if(window.confirm('Are you sure?')){
            fetch('https://localhost:44385/api/Drink/'+drinkId,{
                method:'DELETE',
                header:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            })
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

    render(){
        const {drinks, drinkId, drinkName, drinkCat, drinkVolume, drinkFP, drinkMU, drinkPrice} = this.state;
        const addModalClose=()=>this.setState({addModalShow:false});
        const editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div>
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
                    {drinks.map(drink=>
                        <tr key={drink.id}>
                            <td>{drink.id}</td>
                            <td>{drink.name}</td>
                            <td>{drink.category}</td>
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
                                onClick={()=>this.deleteDish(drink.id)}>
                                {<DeleteIcon/>}
                                </Button>

                                <EditDrinkModal
                                show={this.state.editModalShow}
                                onHide={editModalClose}
                                drinkId={drinkId}
                                drinkName={drinkName}
                                drinkCat={drinkCat}
                                drinkVolume={drinkVolume}
                                drinkFP={drinkFP}
                                drinkMU={drinkMU}
                                drinkPrice={drinkPrice}
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