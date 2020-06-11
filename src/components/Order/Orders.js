import React, {Component} from 'react';
import {Table} from 'react-bootstrap';
import {Button, ButtonToolbar} from 'react-bootstrap';
import AddOrderModal from './AddOrderModal';
import EditOrderModal from './EditOrderModal';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import SnackBar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios';

export default class Orders extends Component{

    constructor(props){
        super(props);
        this.state = {orders: [], waiters: [], snackBaropen: false, snackBarMessage: '',
             addModalShow: false, editModalShow: false};
    }

    componentDidMount(){
        axios.get(`https://localhost:44399/api/Waiter/getAll`)
        .then(res=> {
            this.setState({waiters: res.data})
        });
        this.refreshList();
    }

    deleteOrder(orderId){
        if(window.confirm('Are you sure?')){
            axios.delete(`https://localhost:44399/api/Order/delete/${orderId}`)
            .then(res=> {
                console.log(res.data);
            })
            .catch(error=> {
                console.log(error);
            });
        }
    }

    refreshList(){
        axios.get(`https://localhost:44399/api/Order/getAll`)
        .then(res=> {
            console.log(res.data);
            this.setState({orders: res.data})
        });
    }

    snackBarClose=(event)=>{
        this.setState({snackBaropen: false});
    }

    export=(event)=>{
        event.preventDefault();
        axios.get(`https://localhost:44399/api/Order/excelDoc`)
        .then(res=>{
            this.setState({snackBaropen: true, snackBarMessage: `File is located ${res.data}`});
        })
        .catch(error=> {
            console.log(error);
            this.setState({snackBaropen: true, snackBarMessage: 'Failed export'});
        });
    }

    componentDidUpdate(){
        this.refreshList();
    }

    render(){
        const {orders, waiters, orderId, orderDate, orderNumberTable, orderWaiter, orderTotalPrice} = this.state;
        const addModalClose=()=>this.setState({addModalShow:false});
        const editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div>
                <SnackBar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                open={this.state.snackBaropen}
                autoHideDuration={3000}
                onClose={this.snackBarClose}
                message={<span id='message-id'>{this.state.snackBarMessage}</span>}
                action={[
                    <IconButton
                    color="inherit"
                    size="small"
                    onClick={this.snackBarClose}
                    >
                      <CloseIcon />
                  </IconButton>
                ]}/>
            
                <Table className='mt-4' size='sm'>
                <thead>
                    <tr>
                        <th>Order number</th>
                        <th>Order date</th>
                        <th>Number table</th>
                        <th>Waiter</th>
                        <th>Order total price</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order=>
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{new Date(order.date).toLocaleDateString('en-GB')}</td>
                            <td>{order.numberTable}</td>
                            <td>{waiters.map(w=>{if(w.id === order.waiterId){return w.name +' '+ w.surname}})}</td>
                            <td>{order.totalPrice}</td>
                            <td>
                            <ButtonToolbar>
                                <Button 
                                variant="success" 
                                onClick={()=>this.setState({
                                    editModalShow: true, 
                                    orderId: order.id,
                                    orderDate: order.date,
                                    orderNumberTable: order.numberTable,
                                    orderWaiter: order.waiter,
                                    orderTotalPrice: order.totalPrice
                                    })}>
                                {<EditIcon/>}
                                </Button>

                                <div className="mr-2"></div>

                                <Button className="mr-2"
                                variant="secondary" 
                                onClick={()=>this.deleteOrder(order.id)}>
                                {<DeleteIcon/>}
                                </Button>

                                <EditOrderModal
                                show={this.state.editModalShow}
                                onHide={editModalClose}
                                orderid={orderId}
                                orderdate={orderDate}
                                ordernt={orderNumberTable}
                                orderwaiter={orderWaiter}
                                ordertp={orderTotalPrice}
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
                    Add order
                </Button>

                <div className="mr-2"/>

                <Button 
                className="mr-2" 
                variant='secondary'
                type='submit'
                onClick={this.export}>
                    {<ImportExportIcon/>}
                    Export all to Excel
                </Button>

                <AddOrderModal
                show={this.state.addModalShow}
                onHide={addModalClose}/>

            </ButtonToolbar>
            </div>
        )
    }
}
/*
<Button variant='inherit'
                    onClick={this.snackBarClose}>
                        {<CloseIcon color="white"
                        />}
                    </Button >
*/