import React, {Component} from 'react';
import {Table} from 'react-bootstrap';
import {Button, ButtonToolbar} from 'react-bootstrap';
import AddCatModal from './AddCatModal';
import EditCatModal from './EditCatModal';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';

export default class Categories extends Component{

    constructor(props){
        super(props);
        this.state = {categories: [], addModalShow: false, editModalShow: false};
    }

    componentDidMount(){
        this.refreshList();
    }

    componentWillUnmount(){
        this.setState({categories: [], 
            addModalClose: false, editModalShow: false});
    }

    deleteCat(catId){
        if(window.confirm('Are you sure?')){
            axios.delete(`https://localhost:44399/api/Category/delete/${catId}`)
            .then(res=> {
                console.log(res.data);
            })
            .catch(error=> {
                console.log(error);
            });
        }
    }

    refreshList(){
        axios.get(`https://localhost:44399/api/Category/getAll`)
        .then(res=> {
            this.setState({categories: res.data})
        });
    }

    componentDidUpdate(){
        this.refreshList();
    }

    render(){
        const {categories, catId, catName} = this.state;
        const addModalClose=()=>this.setState({addModalShow:false});
        const editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div>
            <Table className='mt-4' size='sm'>
                <thead>
                    <tr>
                        <th>Category number</th>
                        <th>Category name</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map(cat=>
                        <tr key={cat.id}>
                            <td>{cat.id}</td>
                            <td>{cat.name}</td>
                            <td>
                            <ButtonToolbar>
                                <Button 
                                variant="success" 
                                onClick={()=>this.setState({
                                    editModalShow: true, 
                                    catId: cat.id,
                                    catName: cat.name
                                    })}>
                                {<EditIcon/>}
                                </Button>

                                <div className="mr-2"></div>

                                <Button className="mr-2"
                                variant="secondary" 
                                onClick={()=>this.deleteCat(cat.id)}>
                                {<DeleteIcon/>}
                                </Button>

                                <EditCatModal
                                show={this.state.editModalShow}
                                onHide={editModalClose}
                                catid={catId}
                                catname={catName}/>

                            </ButtonToolbar>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>

            <ButtonToolbar>
                <Button 
                variant="danger" 
                onClick={()=>this.setState({addModalShow: true})}>
                    {<AddIcon/>}
                    Add categoty
                </Button>

                <AddCatModal
                show={this.state.addModalShow}
                onHide={addModalClose}/>
            </ButtonToolbar>
            </div>
        )
    }
}