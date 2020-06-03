import React, {Component} from 'react';
import {Modal, Row, Col, Form} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import SnackBar from '@material-ui/core/Snackbar';
import IconButton from "@material-ui/core/IconButton";
import axios from 'axios';
import qs from 'querystring';
import Tooltip from '@material-ui/core/Tooltip';

export default class EditIngModal extends Component{

    constructor(props){
        super(props);
        this.state = {units: [], snackBaropen: false, snackBarMessage: ''};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        axios.get(`https://localhost:44399/api/Unit/getAll`)
        .then(res=> {
            this.setState({units: res.data})
        });
    }

    snackBarClose=(event)=>{
        this.setState({snackBaropen: false});
    }

    handleSubmit=(event)=>{
        event.preventDefault();
        
        axios.put(`https://localhost:44399/api/Ingredient/update?${qs.stringify({
            Id: event.target.id.value,
            Name: event.target.name.value,
            Amount: event.target.amount.value,
            UnitId: event.target.unit.value,
            FirstPrice: event.target.firstPrice.value
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
            <IconButton key='close' arial-label='Close' color='inherit'
            onClick={this.snackBarClose}></IconButton>
        ]}/>
            <Modal
      {...this.props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Editing ingredient
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
              <Row>
                  <Col sm={6}>
                      <Form onSubmit={this.handleSubmit}>
                      <Form.Group controlId="id">
                              <Form.Label>Ingredient number</Form.Label>
                              <Form.Control 
                                type="text"
                                name="id"
                                required
                                disabled
                                defaultValue={this.props.ingid}
                                placeholder="Ingredient number"/>
                          </Form.Group>
                          <Form.Group controlId="name">
                              <Form.Label>Ingredient name</Form.Label>
                              <Form.Control 
                                type="text"
                                name="name"
                                required
                                defaultValue={this.props.ingname}
                                placeholder="Ingredient name"/>
                          </Form.Group>
                          <Form.Group controlId="amount">
                              <Form.Label>Ingredient amount</Form.Label>
                              <Form.Control 
                                type="text"
                                name="amount"
                                required
                                defaultValue={this.props.ingamount}
                                placeholder="Ingredient amount"/>
                          </Form.Group>
                          <Form.Group controlId="unit">
                              <Form.Label>Units of ingredient</Form.Label>
                              <Form.Control as="select"
                                defaultValue={this.props.ingunit}>
                                {this.state.units.map(unit=>
                                <Tooltip key={unit.id} title={unit.name}>
                                    <option key={unit.id}>{unit.id}</option>
                                </Tooltip>
                                )}
                            </Form.Control>
                          </Form.Group>
                          <Form.Group controlId="firstPrice">
                              <Form.Label>First price of unit of ingredient</Form.Label>
                              <Form.Control 
                                type="text"
                                name="firstPrice"
                                required
                                defaultValue={this.props.ingfp}
                                placeholder="Ingredient first price"/>
                          </Form.Group>
                          <Form.Group>
                            <Button variant="primary" type="submit">
                                Edit ingredient
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
        );
    };
}