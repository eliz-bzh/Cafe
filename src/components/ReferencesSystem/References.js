import React, {Component} from 'react';
import './references.css';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import {Button, ButtonToolbar} from 'react-bootstrap';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import {Modal, Row, Col, Form} from 'react-bootstrap';

export default class References extends Component{

    constructor(props){
        super(props);
        this.state = {addModalShow: false, editModalShow: false, deleteModalShow: false};
    }

    render(){
        if(this.state.deleteModalShow){
            window.confirm('Are you sure?')
        }
        const {addModalShow, editModalShow} = this.state;
        const addModalClose=()=>this.setState({addModalShow:false});
        const editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div>
                <h1>References system</h1>
                <h2>Данное приложение разработано для 
                автоматизации работы администратора кафе(рестона). С помощью данного приложения
                управляющий может с лёгкостью вести учёт своей работы.</h2>
                <div>
                <ButtonToolbar>
                    <div className='app-header'>
                    <Button onClick={()=>this.setState({addModalShow: true})}
                    variant="danger" >
                        {<AddIcon/>}
                        Add ...
                    </Button>
                    <span className='span-style'>Кнопка для функции добавления. 
                    Нажав на неё отобразиться модель для добавления нового элемента в список.</span>
                    <div>
                    <Modal
        size="lg"
        show={addModalShow}
        onHide={addModalClose}
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Adding ...
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
                <Row>
                  <Col sm={6}>
                      <Form onSubmit={this.handleSubmit}>
                          <Form.Group controlId="name">
                              <Form.Label>Label</Form.Label>
                              <Form.Control 
                                type="text"
                                placeholder="Label"/>
                          </Form.Group>
                          <Form.Group>
                            <Button variant="primary">
                                Add ...
                            </Button>
                          </Form.Group>
                      </Form>
                  </Col>
              </Row>
        </Modal.Body>
        <Modal.Footer>

        <Button variant="primary" onClick={addModalClose}>
            Close
        </Button>

      </Modal.Footer>
      </Modal>
                    </div>
                    </div>
                    
                    <div className='app-header'>
                    <Button onClick={()=>this.setState({editModalShow: true})}
                    variant="success">
                    {<EditIcon/>}
                    </Button>
                    <span className='span-style'>Кнопка для функции редактирования. 
                    Нажав на неё отобразиться модель для редактирования выбраного элемента в списоке со старыми данными.</span>
                    <div>
                    <Modal
        size="lg"
        show={editModalShow}
        onHide={editModalClose}
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Editing ...
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
                <Row>
                  <Col sm={6}>
                      <Form onSubmit={this.handleSubmit}>
                          <Form.Group controlId="name">
                              <Form.Label>Label</Form.Label>
                              <Form.Control 
                                type="text"
                                placeholder="Label"/>
                          </Form.Group>
                          <Form.Group>
                            <Button variant="primary">
                                Edit ...
                            </Button>
                          </Form.Group>
                      </Form>
                  </Col>
              </Row>
        </Modal.Body>
        <Modal.Footer>

        <Button variant="primary" onClick={editModalClose}>
            Close
        </Button>

      </Modal.Footer>
      </Modal>
                    </div>
                    </div>
                    
                    <div className='app-header'>
                    <Button onClick={()=>this.setState({deleteModalShow: true})}
                    variant="secondary">
                    {<DeleteIcon/>}
                    </Button>
                    <span className='span-style'>Кнопка для функции удаления. 
                    Нажав на неё отобразиться окно соглашения на удаление выбраного элемента из списка.</span>
                    </div>
                </ButtonToolbar>
                <div className='app-header'>
                    <h2>Панель меню:</h2>
                    <li>Home - главная страница приложения. Приветствует пользователя.</li>
                    <li>List of waiters - страница для просмотра и работы со списком обслуживающего персонала.</li>
                    <li>Category - страница для просмотра и работы со списком существующих категорий блюд и напитков.</li>
                    <li>Menu/Dishes - страница для просмотра и работы со списком существующих блюд.</li>
                    <li>Menu/Drinks - страница для просмотра и работы со списком существующих напитков.</li>
                    <li>Stock - страница для просмотра и ведения учёта наличия ингредиентов.</li>
                    <li>Order - страница для просмотра и ведения учёта сделанных заказов.</li>
                    <li>{<HelpOutlineIcon/>} - страница справочной системы.</li>
                </div>
                </div>
                
            </div>
        );
    }
};