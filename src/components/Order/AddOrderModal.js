import React, {Component} from 'react';
import {Modal, Row, Col, Form} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import SnackBar from '@material-ui/core/Snackbar';
import IconButton from "@material-ui/core/IconButton";
import Tooltip from '@material-ui/core/Tooltip';
import axios from 'axios';
import qs from 'querystring';

export default class AddOrderModal extends Component{

    constructor(props){
        super(props);
        this.state = {waiters:[], snackBaropen: false, snackBarMessage: '',
        number: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20] };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        axios.get(`https://localhost:44399/api/Waiter/getAll`)
        .then(res=> {
            this.setState({waiters: res.data})
        });
    }

    snackBarClose=(event)=>{
        this.setState({snackBaropen: false});
    }

    handleSubmit=(event)=>{
        event.preventDefault();
        axios.post(`https://localhost:44399/api/Order/create?${qs.stringify({
            Date: event.target.date.value,
            NumberTable: event.target.numberTable.value,
            WaiterId: event.target.waiter.value,
            TotalPrice: event.target.totalPrice.value
        })}`)
        .then(res=> {
            console.log(res.data);
            this.setState({snackBaropen: true, snackBarMessage: 'Added successfully'});
        })
        .catch(error=> {
            console.log(error);
            this.setState({snackBaropen: true, snackBarMessage: 'Failed added'});
        });
    }

    render(){
        return(
            <div className='container'>
                <SnackBar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                open={this.state.snackBaropen}
                autoHideDuration={1000}
                onClose={this.snackBarClose}
                message={<span id='message-id'>{this.state.snackBarMessage}</span>}
                action={[
                    <IconButton key='close' aria-label="close" color='inherit'
                    onClick={this.snackBarClose}></IconButton>
                ]}/>

                <Modal
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Adding order
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="date">
                                        <Form.Label>Order date</Form.Label>
                                        <Form.Control 
                                        type="date"
                                        name="date"
                                        required
                                        placeholder="Order date"/>
                                    </Form.Group>
                                    <Form.Group controlId="numberTable">
                                        <Form.Label>Number table</Form.Label>
                                        <Form.Control as="select">
                                            {this.state.number.map(num=>
                                                <option key={num}>{num}</option>
                                            )}
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId="waiter">
                                        <Form.Label>Number of waiter</Form.Label>
                                        <Form.Control as="select">
                                            {this.state.waiters.map(waiter=>
                                            <Tooltip key={waiter.id} title={waiter.name + ' ' + waiter.surname}>
                                                <option key={waiter.id}>{waiter.id}</option>
                                            </Tooltip>
                                            )}
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId="totalPrice">
                                        <Form.Label>Order total price</Form.Label>
                                        <Form.Control 
                                        type="text"
                                        name="totalPrice"
                                        required
                                        placeholder="Order total price"/>
                                    </Form.Group>
                                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                            Add order
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
          
                    </Modal.Body>
                    <Modal.Footer>

                        <Button variant="primary" onClick={this.props.onHide}>
                            Close
                        </Button>

                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}