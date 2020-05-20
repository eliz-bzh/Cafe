import React, {Component} from 'react';
import {Modal, Row, Col, Form} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import SnackBar from '@material-ui/core/Snackbar';
import IconButton from "@material-ui/core/IconButton";
import axios from 'axios';
import qs from 'querystring';

export default class AddDishModal extends Component{

    constructor(props){
        super(props);
        this.state = {categories:[], snackBaropen: false, snackBarMessage: ''};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        fetch('https://localhost:44399/api/Category/getAll')
        .then(res=> res.json())
        .then(data=>{
            this.setState({categories: data});
        })
    }

    snackBarClose=(event)=>{
        this.setState({snackBaropen: false});
    }

    handleSubmit=(event)=>{
        event.preventDefault();

        axios.post(`https://localhost:44399/api/Dish/create?${qs.stringify({
            Name: event.target.name.value,
            CategoryId: event.target.category.value,
            Weight: event.target.weight.value,
            FirstPrice: event.target.firstPrice.value,
            MarkUp: event.target.markUp.value,
            Price: event.target.price.value
        })}`)
        .then(res=> {
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
                            Adding dish
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="name">
                                        <Form.Label>Dish name</Form.Label>
                                        <Form.Control 
                                        type="text"
                                        name="name"
                                        required
                                        placeholder="Dish name"/>
                                    </Form.Group>
                                    <Form.Group controlId="category">
                                        <Form.Label>Dish category</Form.Label>
                                        <Form.Control as="select">
                                            {this.state.categories.map(cat=>
                                                <option key={cat.id}>{cat.id}</option>
                                            )}
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId="weight">
                                        <Form.Label>Dish weight</Form.Label>
                                        <Form.Control 
                                        type="text"
                                        name="weight"
                                        required
                                        placeholder="Dish weight"/>
                                    </Form.Group>
                                    <Form.Group controlId="firstPrice">
                                        <Form.Label>Dish first price</Form.Label>
                                        <Form.Control 
                                        type="text"
                                        name="firstPrice"
                                        required
                                        placeholder="Dish first price"/>
                                    </Form.Group>
                                    <Form.Group controlId="markUp">
                                        <Form.Label>Dish mark up</Form.Label>
                                        <Form.Control 
                                        type="text"
                                        name="markUp"
                                        required
                                        placeholder="Dish mark up"/>
                                    </Form.Group>
                                    <Form.Group controlId="price">
                                        <Form.Label>Dish price</Form.Label>
                                        <Form.Control 
                                        type="text"
                                        name="price"
                                        required
                                        placeholder="Dish price"/>
                                    </Form.Group>
                                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                            Add dish
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