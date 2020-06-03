import React, {Component} from 'react';
import {Table} from 'react-bootstrap';
import {Button, ButtonToolbar} from 'react-bootstrap';
import AddIngModal from './AddIngModal';
import EditIngModal from './EditIngModal';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';
import qs from 'querystring';

export default class Stock extends Component{

    constructor(props){
        super(props);
        this.state = {ingredient:[], stock: [], units: [], addModalShow: false, editModalShow: false};
    }

    componentDidMount(){
        axios.get(`https://localhost:44399/api/Unit/getAll`)
        .then(res=> {
            this.setState({units: res.data})
        });
        this.refreshList();
    }

    deleteIng(ingId){
        if(window.confirm('Are you sure?')){
            axios.delete(`https://localhost:44399/api/Ingredient/delete/${ingId}`)
            .then(res=> {
                console.log(res.data);
            })
            .catch(error=> {
                console.log(error);
            });
        }
    }

    refreshList(){
        axios.get(`https://localhost:44399/api/Ingredient/getAll`)
        .then(res=> {
            this.setState({ingredient: res.data})
        });
    }

    componentDidUpdate(){
        this.refreshList();
    }

    render(){
        const {ingredient, stock, units, ingId, ingName, ingAmount, ingUnit, ingFP, stTP} = this.state;
        const addModalClose=()=>this.setState({addModalShow:false});
        const editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div>
            <Table className='mt-4' size='sm'>
                <thead>
                    <tr>
                        <th>Ingredient number</th>
                        <th>Ingredient name</th>
                        <th>Amount of ingredient</th>
                        <th>Units of ingredient</th>
                        <th>First price of unit of ingredient</th>
                        <th>Total price</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {ingredient.map(ing=>
                        <tr key={ing.id}>
                            <td>{ing.id}</td>
                            <td>{ing.name}</td>
                            <td>{ing.amount}</td>
                            <td>{units.map(unit=>{if(unit.id === ing.unitId){return unit.name}})}</td>
                            <td>{ing.firstPrice}</td>
                            <td>{ing.amount * ing.firstPrice}</td>
                            <td>
                            <ButtonToolbar>
                                <Button 
                                variant="success" 
                                onClick={()=>this.setState({
                                    editModalShow: true, 
                                    ingId: ing.id,
                                    ingName: ing.name,
                                    ingAmount: ing.amount,
                                    ingUnit: ing.unitId,
                                    ingFP: ing.firstPrice,
                                    stTP: ing.amount * ing.firstPrice
                                    })}>
                                {<EditIcon/>}
                                </Button>

                                <div className="mr-2"></div>

                                <Button className="mr-2"
                                variant="secondary" 
                                onClick={()=>this.deleteIng(ing.id)}>
                                {<DeleteIcon/>}
                                </Button>

                                <EditIngModal
                                show={this.state.editModalShow}
                                onHide={editModalClose}
                                ingid={ingId}
                                ingname={ingName}
                                ingamount={ingAmount}
                                ingunit={ingUnit}
                                ingfp={ingFP}
                                sttp={stTP}
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
                    Add ingredient
                </Button>

                <AddIngModal
                show={this.state.addModalShow}
                onHide={addModalClose}/>
            </ButtonToolbar>
            </div>
        )
    }
}