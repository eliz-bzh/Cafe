import React, {Component} from 'react';
import {Modal, Row, Col, Form} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import SnackBar from '@material-ui/core/Snackbar';
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios';
import qs from 'querystring';

export default class AddCatModal extends Component{

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

        axios.post(`https://localhost:44399/api/Category/create?${qs.stringify({
            Name: event.target.name.value
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
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Adding category
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
              <Row>
                  <Col sm={6}>
                      <Form onSubmit={this.handleSubmit}>
                          <Form.Group controlId="name">
                              <Form.Label>Category name</Form.Label>
                              <Form.Control 
                                type="text"
                                name="name"
                                required
                                placeholder="Category name"/>
                          </Form.Group>
                          <Form.Group>
                            <Button variant="primary" type="submit">
                                Add category
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