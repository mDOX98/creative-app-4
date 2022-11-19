import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import logo from '../logo.svg';
import titleImg from '../icons/Title.png'
import '../App.css';
import axios from 'axios'

class Navbar extends Component {
    constructor(){
        super();
        this.logout = this.logout.bind(this);
    }

    logout(event){
        event.preventDefault();
        console.log('logging out');
        axios.post('/user/logout').then(response => {
            console.log(response.data);
            if(response.status === 200){
                this.props.updateUser({
                    loggedIn: false,
                    username: null
                })
            }
        }).catch(error => {
            console.log('Logout error');
        })
    }

    render(){
        const loggedIn = this.props.loggedIn;
        console.log('navbar render, props: ');
        console.log(this.props);

        return(
            <div>
                <header className="navbar App-header custom-navbar" id="nav-container">
                    
                        {/*<div id="top-filler"></div>*/}
                        {/*<h1 className="App-title"></h1>*/}
                        
                       
                   
                        <ul>
                        {loggedIn ? (
                            <section>
                                <li><Link to="/" className="custom-a">
                                    <span className="text-secondary">Home</span>
                                </Link></li>
                                <li><Link to="/inventory" className="custom-a">
                                    <span className="text-secondary">Inventory</span>
                                </Link></li>
                                <li><Link to="/store" className="custom-a">
                                    <span className="text-secondary">Store</span>
                                </Link></li>
                                <li><Link to="/" className="custom-a" onClick={this.logout}>
                                    <span className="text-secondary">Logout</span>
                                </Link></li>
                                

                        </section>
                        ) : (
                            <section>
                                
                                <li><Link to="/" className="custom-a">
                                    <span className="text-secondary">Home</span>
                                </Link></li>
                                <li><Link to="/login" className="custom-a">
                                    <span className="text-secondary">Login</span>
                                </Link></li>
                                <li><Link to="/signup" className="custom-a">
                                    <span className="text-secondary">Sign Up</span>
                                </Link></li>
                                
                            </section>
                        )}

                        <li className="App-logo-container"><img src={titleImg} className="App-logo" alt="Gauntlet Arena"/></li>
                        </ul>
                    
                   
                    {/**/}
                    
                    
                </header>
            </div>
        );
    }
}

export default Navbar;