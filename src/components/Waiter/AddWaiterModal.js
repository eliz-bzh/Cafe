import React, {Component} from 'react';
import {Modal, Row, Col, Form} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import SnackBar from '@material-ui/core/Snackbar';
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios';
import qs from 'querystring';

export default class AddWaiterModal extends Component{

    constructor(props){
        super(props);
        this.state = {snackBaropen: false, snackBarMessage: ''};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    snackBarClose=(event)=>{
        this.setState({snackBaropen: false});
    }

    handleSubmit=(event)=>{
        event.preventDefault();
        axios.post(`https://localhost:44399/api/Waiter/create?${qs.stringify({
            Name: event.target.name.value,
            Surname: event.target.surname.value,
            Patronymic: event.target.patronymic.value
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
                    <IconButton color="inherit" size="small"
                    onClick={this.snackBarClose}
                    ><CloseIcon/></IconButton>
                ]}/>

                <Modal
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Adding waiter
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="name">
                                        <Form.Label>Waiter name</Form.Label>
                                        <Form.Control 
                                        type="text"
                                        name="name"
                                        required
                                        placeholder="Waiter name"/>
                                    </Form.Group>
                                    <Form.Group controlId="surname">
                                        <Form.Label>Waiter surname</Form.Label>
                                        <Form.Control 
                                        type="text"
                                        name="surname"
                                        required
                                        placeholder="Waiter surname"/>
                                    </Form.Group>
                                    <Form.Group controlId="patronymic">
                                        <Form.Label>Waiter patronymic</Form.Label>
                                        <Form.Control 
                                        type="text"
                                        name="patronymic"
                                        required
                                        placeholder="Waiter patronymic"/>
                                    </Form.Group>
                                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                            Add waiter
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