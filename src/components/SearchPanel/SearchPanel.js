import React, {Component} from 'react';

export default class SearchPanel extends Component{
    constructor(props){
        super(props);
        this.state = {search: ''};
    }

    onLabelSearch=(event)=>{
        const search = event.target.value;
        this.setState({search});
        this.props.onLabelSearch(search);
    };

    render(){
        const {search} = this.state;
        return(
            <div>
                <input type="text" className="form-control" placeholder='Search...' value={search} onChange={this.onLabelSearch}/>
            </div>
        )
    }
}