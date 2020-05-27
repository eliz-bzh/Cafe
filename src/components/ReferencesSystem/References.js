import React from 'react';
import './references.css';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import {Button, ButtonToolbar} from 'react-bootstrap';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

const References=()=>{

    /*constructor(props){
        super(props);
        this.state = {addModalShow: false, editModalShow: false};
    }

    render(){
        const {addModalShow, editModalShow} = this.state;
        const addModalClose=()=>this.setState({addModalShow:false});
        const editModalClose=()=>this.setState({editModalShow:false});*/
        return(
            <div>
                <h1>References system</h1>
                <h2>Данное приложение разработано для 
                автоматизации работы администратора кафе(рестона). С помощью данного приложения
                управляющий может с лёгкостью вести учёт своей работы.</h2>
                <div>
                <ButtonToolbar>
                    <div className='app-header'>
                    <Button
                    variant="danger" >
                        {<AddIcon/>}
                        Add ...
                    </Button>
                    <span>Кнопка для функции добавления. 
                    Нажав на неё отобразиться модель для добавления нового элемента в список.</span>
                    </div>
                    
                    <div className='app-header'>
                    <Button 
                    variant="success">
                    {<EditIcon/>}
                    </Button>
                    <span>Кнопка для функции редактирования. 
                    Нажав на неё отобразиться модель для редактирования выбраного элемента в списоке со старыми данными.</span>
                    </div>
                    
                    <div className='app-header'>
                    <Button
                    variant="secondary">
                    {<DeleteIcon/>}
                    </Button>
                    <span className='text'>Кнопка для функции удаления. 
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
    //}
};

export default References;