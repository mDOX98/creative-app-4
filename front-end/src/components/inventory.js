import React, {Component} from 'react';
import axios from 'axios';
import StoreIcon from './store-icon';


class Inventory extends Component{
    constructor(){
        super();
        this.itemId = 0;
        this.handleSubmit = this.handleSubmit.bind(this);
        this.clearData = this.clearData.bind(this);
        this.state={itemArray: []}
        
    }

    clearData(){
        this.setState({itemArray: []});
    }
    componentWillUnmount(){
        this.clearData();
    }

    componentDidMount(){
        console.log("props:", this.props)
        console.log("props.username:", this.props.username)
        axios.get(`./user/inventory/${this.props.username}`).then( response =>{
            console.log(response.data)
            this.setState({itemArray: response.data});
        }
        ).catch(error => {
            console.log('get error item inventory: ');
            console.log(error);
        });
        
        
    }
    
    handleSubmit(event, id){
        event.preventDefault();
    }


    render(){
        
        const listItems = this.state.itemArray.map((p, index) =>{ 
            return(
                <li key={index} className="card"><StoreIcon p={p} handleSubmit={this.handleSubmit}/></li>
                );
            }
        );
        console.log(listItems)

        return (
            <div>
                <h1>INVENTORY</h1>
                <ul>
                    {listItems}
                </ul>
            </div>
        );
    }
    


}

export default Inventory;