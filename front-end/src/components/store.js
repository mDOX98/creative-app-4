import React, {Component} from 'react';
import axios from 'axios';
import StoreIcon from './store-icon';


class Store extends Component{
    constructor(){
        super();
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
        axios.get('./user/store').then( response =>{
            //console.log(response.data)
            this.setState({itemArray: response.data});
            
        }
        ).catch(error => {
            console.log('get error: ');
            console.log(error);
        });
        
    }
    
    handleSubmit(event, id){
        event.preventDefault();
        //console.log("ID===",id)
        if(this.props.loggedIn){
            axios.post(`./user/store/buy`, {
                username: this.props.username,
                itemId: id
            }).then(response => {
                console.log('store response: ');
                //console.log(response);
                if(response.status === 200) {
                    // update App.js state
                    this.props.updateUser({
                        items: response.data.items
                    });
    
                }
            }).catch(error => {
                console.log('store error: ');
                console.log(error);
            });

        }
    }


    render(){
        
        const listItems = this.state.itemArray.map((p, index) =>{ 
            return(
                <li key={index} className="card"><StoreIcon p={p} handleSubmit={this.handleSubmit}/></li>
                );
            }
        );
        //console.log(listItems)

        return (
            <div>
                <h1>STORE</h1>
                <ul>
                    {listItems}
                </ul>
            </div>
        );
    }
    


}

export default Store;