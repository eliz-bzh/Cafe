import React, {Component} from 'react';
import {Table} from 'react-bootstrap';
import {Button, ButtonToolbar} from 'react-bootstrap';
import AddDishModal from './AddDishModal';
import EditDishModal from './EditDishModal';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import {Add, Edit, Delete} from '@material-ui/icons';
import IconButton from "@material-ui/core/IconButton";

export default class Dishes extends Component{

    constructor(props){
        super(props);
        this.state = {dishes: [], addModalShow: false, editModalShow: false};
    }

    componentDidMount(){
        this.refreshList();
    }

    deleteDish(dishId){
        if(window.confirm('Are you sure?')){
            fetch(`https://localhost:44399/api/Category/delete/${dishId}`)
            .then((result)=>{
                this.setState({snackBaropen: true, snackBarMessage: 'Deleted successfully'});
            },
            (error)=>{
                this.setState({snackBaropen: true, snackBarMessage: 'Failed deleted'});
            })
        }
    }

    refreshList(){
        fetch('https://localhost:44399/api/Category/getAll')
        .then(res=> res.json())
        .then(data=> {
            this.setState({dishes: data});
        });
    }

    componentDidUpdate(){
        this.refreshList();
    }

    render(){
        const {dishes, dishId, dishName} = this.state;
        const addModalClose=()=>this.setState({addModalShow:false});
        const editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div>
            <Table className='mt-4' size='sm'>
                <thead>
                    <tr>
                        <th>DishId</th>
                        <th>DishName</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {dishes.map(dish=>
                        <tr key={dish.id}>
                            <td>{dish.id}</td>
                            <td>{dish.name}</td>
                            <td>
                            <ButtonToolbar>
                                <Button 
                                variant="success" 
                                onClick={()=>this.setState({
                                    editModalShow: true, 
                                    dishId: dish.id, 
                                    dishName: dish.name
                                    })}>
                                {<EditIcon fontSize="medium"/>}
                                </Button>

                                <div className="mr-2"></div>

                                <Button className="mr-2"
                                variant="secondary" 
                                onClick={()=>this.deleteDish(dish.id)}>
                                {<DeleteIcon fontSize="medium"/>}
                                </Button>

                                <EditDishModal
                                show={this.state.editModalShow}
                                onHide={editModalClose}
                                dishId={dishId}
                                dishName={dishName}/>

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
                    {<Add fontSize="medium"/>}
                    Add Dish
                </Button>

                <AddDishModal
                show={this.state.addModalShow}
                onHide={addModalClose}/>
            </ButtonToolbar>
            </div>
        )
    }
}