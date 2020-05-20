import React, {Component} from 'react';
import {Modal, Row, Col, Form} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import SnackBar from '@material-ui/core/Snackbar';
import IconButton from "@material-ui/core/IconButton";

export default class EditDishModal extends Component{

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

    handleSubmit(event){
        event.preventDefault();
        fetch('https://localhost:44399/api/Dish',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                id:event.target.id.value,
                name:event.target.name.value,
                category:event.target.category.value,
                weight:event.target.weight.value,
                firstPrice:event.target.firstPrice.value,
                markUp:event.target.markUp.value,
                price:event.target.price.value
            })
        })
        .then(res=> res.json())
        .then((result)=>{
            this.setState({snackBaropen: true, snackBarMessage: 'Updated successfully'});
        },
        (error)=>{
            this.setState({snackBaropen: true, snackBarMessage: 'Failed to update'});
        })
    }

    render(){
        return(
            <div className='container'>
                <SnackBar
                anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                open={this.state.snackBaropen}
                autoHideDuration={1000}
                onClose={this.snackBarClose}
                message={<span id='message-id'>{this.state.snackBarMessage}</span>}
                action={[
                    <IconButton key='close' arial-label='Close' color='white'
                        onClick={this.snackBarClose}></IconButton>
                ]}/>

                <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Editing dish
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="id">
                                        <Form.Label>Dish number</Form.Label>
                                            <Form.Control 
                                            type="text"
                                            name="id"
                                            required
                                            disabled
                                            defaultValue={this.props.dishId}
                                            placeholder="Dish number"/>
                                    </Form.Group>
                                    <Form.Group controlId="name">
                                        <Form.Label>Dish name</Form.Label>
                                            <Form.Control 
                                            type="text"
                                            name="name"
                                            required
                                            defaultValue={this.props.dishName}
                                            placeholder="Dish name"/>
                                    </Form.Group>
                                    <Form.Group controlId="category">
                                        <Form.Label>Dish category</Form.Label>
                                        <Form.Control as="select"
                                            defaultValue={this.props.dishCat}>
                                            {this.state.categories.map(cat=>
                                                <option key={cat.id}>{cat.name}</option>
                                            )}
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId="weight">
                                        <Form.Label>Dish weight</Form.Label>
                                            <Form.Control 
                                            type="text"
                                            name="weight"
                                            required
                                            defaultValue={this.props.dishWeight}
                                            placeholder="Dish weight"/>
                                    </Form.Group>
                                    <Form.Group controlId="firstPrice">
                                        <Form.Label>Dish first price</Form.Label>
                                            <Form.Control 
                                            type="text"
                                            name="firstPrice"
                                            required
                                            defaultValue={this.props.dishFP}
                                            placeholder="Dish first price"/>
                                    </Form.Group>
                                    <Form.Group controlId="markUp">
                                        <Form.Label>Dish mark up</Form.Label>
                                            <Form.Control 
                                            type="text"
                                            name="markUp"
                                            required
                                            defaultValue={this.props.dishMU}
                                            placeholder="Dish mark up"/>
                                    </Form.Group>
                                    <Form.Group controlId="price">
                                        <Form.Label>Dish price</Form.Label>
                                            <Form.Control 
                                            type="text"
                                            name="price"
                                            required
                                            defaultValue={this.props.dishPrice}
                                            placeholder="Dish price"/>
                                    </Form.Group>
                                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                            Edit dish
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