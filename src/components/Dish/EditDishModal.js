import React, {Component} from 'react';
import {Modal, Row, Col, Form} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import SnackBar from '@material-ui/core/Snackbar';
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios';
import qs from 'querystring';
import Tooltip from '@material-ui/core/Tooltip';

export default class EditDishModal extends Component{

    constructor(props){
        super(props);
        this.state = {categories:[], snackBaropen: false, snackBarMessage: ''};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        axios.get(`https://localhost:44399/api/Category/getAll`)
        .then(res=> {
            this.setState({categories: res.data})
        });
    }

    snackBarClose=(event)=>{
        this.setState({snackBaropen: false});
    }

    handleSubmit(event){
        event.preventDefault();
        axios.put(`https://localhost:44399/api/Dish/update?${qs.stringify({
            Id: event.target.id.value,
            Name: event.target.name.value,
            CategoryId: event.target.category.value,
            Weight: event.target.weight.value,
            FirstPrice: event.target.firstPrice.value,
            MarkUp: event.target.markUp.value,
            Price: event.target.price.value
        })}`)
        .then(res=> {
            console.log(res.data);
            this.setState({snackBaropen: true, snackBarMessage: 'Updated successfully'});
        })
        .catch(error=> {
            console.log(error);
            this.setState({snackBaropen: true, snackBarMessage: 'Failed to update'});
        });
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
                                            defaultValue={this.props.dishid}
                                            placeholder="Dish number"/>
                                    </Form.Group>
                                    <Form.Group controlId="name">
                                        <Form.Label>Dish name</Form.Label>
                                            <Form.Control 
                                            type="text"
                                            name="name"
                                            required
                                            defaultValue={this.props.dishname}
                                            placeholder="Dish name"/>
                                    </Form.Group>
                                    <Form.Group controlId="category">
                                        <Form.Label>Dish category</Form.Label>
                                        <Form.Control as="select"
                                            defaultValue={this.props.dishcat}>
                                            {this.state.categories.map(cat=>
                                            <Tooltip key={cat.id} title={cat.name}>
                                                <option key={cat.id}>{cat.id}</option>
                                            </Tooltip>
                                            )}
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId="weight">
                                        <Form.Label>Dish weight</Form.Label>
                                            <Form.Control 
                                            type="text"
                                            name="weight"
                                            required
                                            defaultValue={this.props.dishweight}
                                            placeholder="Dish weight"/>
                                    </Form.Group>
                                    <Form.Group controlId="firstPrice">
                                        <Form.Label>Dish first price</Form.Label>
                                            <Form.Control 
                                            type="text"
                                            name="firstPrice"
                                            required
                                            defaultValue={this.props.dishfp}
                                            placeholder="Dish first price"/>
                                    </Form.Group>
                                    <Form.Group controlId="markUp">
                                        <Form.Label>Dish mark up</Form.Label>
                                            <Form.Control 
                                            type="text"
                                            name="markUp"
                                            required
                                            defaultValue={this.props.dishmu}
                                            placeholder="Dish mark up"/>
                                    </Form.Group>
                                    <Form.Group controlId="price">
                                        <Form.Label>Dish price</Form.Label>
                                            <Form.Control 
                                            type="text"
                                            name="price"
                                            required
                                            defaultValue={this.props.dishprice}
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