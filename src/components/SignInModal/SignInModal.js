import React, {Component} from 'react';
import './signIn.css';
import {Modal, Row, Col, Form, Button} from 'react-bootstrap';
import { createBrowserHistory } from 'history';


export default class SignInModal extends Component{

    constructor(props){
        super(props);
        this.state = { show: true};
    }

    handleSubmit(event){
        event.preventDefault();
        const customHistory = createBrowserHistory();
        if((event.target.adminName.value === 'admin') && (event.target.password.value === 'admin')){
            return customHistory.go(customHistory.push('/home'));
        }
    }

    render(){
        const {show} = this.state;
        return(
            <div>
            <Modal show={show}
                size='sm'
                centered>
                    <Modal.Body>
                        <Row>
                            <Col>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Label className='h2 mb-3 font-weight-normal'>Please sign in</Form.Label>
                                    <Form.Group>
                                        <Form.Control
                                            type="text"
                                            size='lg'
                                            name='adminName'
                                            required
                                            autoFocus
                                            placeholder="AdminName"/>
                                        <Form.Control 
                                            type="text"
                                            size='lg'
                                            name="password"
                                            required
                                            placeholder="Password"/>
                                    </Form.Group>
                                    <Form.Group>
                                        <Button 
                                            className='btn-block mb-3'
                                            size='lg' 
                                            variant="primary" 
                                            type="submit">
                                            Sign in
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Form.Label>AdminName: admin</Form.Label>
                        <Form.Label>Password: admin</Form.Label>
                    </Modal.Footer>
                </Modal>
        </div>
        )
    }
}