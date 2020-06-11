import React, {Component} from 'react';
import {Table} from 'react-bootstrap';
import {Button, ButtonToolbar} from 'react-bootstrap';
import AddUnitModal from './AddUnitModal';
import EditUnitModal from './EditUnitModal';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';

export default class Units extends Component{

    constructor(props){
        super(props);
        this.state = {units: [], addModalShow: false, editModalShow: false};
    }

    componentDidMount(){
        this.refreshList();
    }

    deleteUnit(uId){
        if(window.confirm('Are you sure?')){
            axios.delete(`https://localhost:44399/api/Unit/delete/${uId}`)
            .then(res=> {
                console.log(res.data);
            })
            .catch(error=> {
                console.log(error);
            });
        }
    }

    refreshList(){
        axios.get(`https://localhost:44399/api/Unit/getAll`)
        .then(res=> {
            this.setState({units: res.data})
        });
    }

    componentDidUpdate(){
        this.refreshList();
    }

    render(){
        const {units, uId, uName} = this.state;
        const addModalClose=()=>this.setState({addModalShow:false});
        const editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div>
            <Table className='mt-4' size='sm'>
                <thead>
                    <tr>
                        <th>Unit number</th>
                        <th>Unit name</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {units.map(unit=>
                        <tr key={unit.id}>
                            <td>{unit.id}</td>
                            <td>{unit.name}</td>
                            <td>
                            <ButtonToolbar>
                                <Button 
                                variant="success" 
                                onClick={()=>this.setState({
                                    editModalShow: true, 
                                    uId: unit.id,
                                    uName: unit.name
                                    })}>
                                {<EditIcon/>}
                                </Button>

                                <div className="mr-2"></div>

                                <Button className="mr-2"
                                variant="secondary" 
                                onClick={()=>this.deleteUnit(unit.id)}>
                                {<DeleteIcon/>}
                                </Button>

                                <EditUnitModal
                                show={this.state.editModalShow}
                                onHide={editModalClose}
                                uid={uId}
                                uname={uName}/>

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
                    Add unit
                </Button>

                <AddUnitModal
                show={this.state.addModalShow}
                onHide={addModalClose}/>
            </ButtonToolbar>
            </div>
        )
    }
}