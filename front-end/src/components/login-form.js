import React, {Component} from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios'

class LoginForm extends Component {
    constructor(){
        super();
        this.state = {
            username: '',
            password: '',
            redirectTo: null
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    
    }

    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event){
        event.preventDefault();
        console.log('handleSubmit');
        
        axios.post('./user/login', {
            username: this.state.username,
            password: this.state.password
        }).then(response => {
            console.log('login response: ');
            console.log(response);
            if(response.status === 200) {
                // update App.js state
                this.props.updateUser({
                    loggedIn: true,
                    username: response.data.username
                });

                // update the state to redirect to home
                this.setState({
                    redirectTo: '/'
                });
            }
        }).catch(error => {
            console.log('login error: ');
            console.log(error);
        });
    }

    render(){
        if(this.state.redirectTo){
            return <Navigate to={{pathname: this.state.redirectTo}}/>
        } else {
            return (
                <div>
                    <h4>Login</h4>
                    <form className="form-horizontal">
                        <div className="form-group">
                            <div className="col-ml-auto">
                                <label className="form-label" htmlFor="username">Username &nbsp;</label>
                            </div>
                            <div className="col-mr-auto">
                                <input 
                                    className="form-input" 
                                    type="text"
                                    id="username"
                                    name="username"
                                    placeholder="Username"
                                    value={this.state.username}
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-ml-auto">
                                <label className="form-label" htmlFor="password">Password &nbsp;</label>
                            </div>
                            <div className="col-mr-auto">
                                <input className="form-input"
                                    placeholder="Password"
                                    type="password"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className=""></div>
                            <button
                                className="btn btn-primary col-ml-auto col-mr-auto"
                                onClick={this.handleSubmit}
                                type="submit">Login</button>
                        </div>
                    </form>
                </div>
            )
        }
    }
}

export default LoginForm;