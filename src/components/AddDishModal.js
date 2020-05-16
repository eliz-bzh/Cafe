import React, {Component} from 'react';
import {Modal, Row, Col, Form} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import SnackBar from '@material-ui/core/Snackbar';
import IconButton from "@material-ui/core/IconButton";

export default class AddDishModal extends Component{

    constructor(props){
        super(props);
        this.state = {snackBaropen: false, snackBarMessage: ''};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    snackBarClose=(event)=>{
        this.setState({snackBaropen: false});
    }

    handleSubmit(event){
        event.preventDefault();
        fetch(`https://localhost:44399/api/Category/create?Name=${event.target.name.value}`)
        .then((result)=>{
            this.setState({snackBaropen: true, snackBarMessage: 'Added successfully'});
        },
        (error)=>{
            this.setState({snackBaropen: true, snackBarMessage: 'Failed added'});
        })
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
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Adding dish in menu
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
              <Row>
                  <Col sm={6}>
                      <Form onSubmit={this.handleSubmit}>
                          <Form.Group controlId="name">
                              <Form.Label>Dish Name</Form.Label>
                              <Form.Control 
                                type="text"
                                name="name"
                                required
                                placeholder="Dish name"/>
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
        );
    };
}