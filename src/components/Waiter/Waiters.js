import React, {Component} from 'react';
import {Table} from 'react-bootstrap';
import {Button, ButtonToolbar} from 'react-bootstrap';
import AddWaiterModal from './AddWaiterModal';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';

export default class Waiters extends Component{

    constructor(props){
        super(props);
        this.state = {waiters: [], addModalShow: false};
    }

    componentDidMount(){
        this.refreshList();
    }

    deleteWaiter(waiterId){
        if(window.confirm('Are you sure?')){
            axios.delete(`https://localhost:44399/api/Waiter/delete/${waiterId}`)
            .then(res=> {
                console.log(res.data);
            })
            .catch(error=> {
                console.log(error);
            });
        }
    }

    refreshList(){
        axios.get(`https://localhost:44399/api/Waiter/getAll`)
        .then(res=> {
            this.setState({waiters: res.data})
        });
    }

    componentDidUpdate(){
        this.refreshList();
    }

    render(){
        const {waiters} = this.state;
        const addModalClose=()=>this.setState({addModalShow:false});
        return(
            <div>
                <Table className='mt-4' size='sm'>
                <thead>
                    <tr>
                        <th>Waiter number</th>
                        <th>Waiter name</th>
                        <th>Waiter surname</th>
                        <th>Waiter patronymic</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {waiters.map(waiter=>
                        <tr key={waiter.id}>
                            <td>{waiter.id}</td>
                            <td>{waiter.name}</td>
                            <td>{waiter.surname}</td>
                            <td>{waiter.patronymic}</td>
                            <td>
                            <ButtonToolbar>
                                <Button className="mr-2"
                                variant="secondary" 
                                onClick={()=>this.deleteWaiter(waiter.id)}>
                                {<DeleteIcon/>}
                                </Button>
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
                    Add waiter
                </Button>

                <AddWaiterModal
                show={this.state.addModalShow}
                onHide={addModalClose}/>
            </ButtonToolbar>
            </div>
        )
    }
}