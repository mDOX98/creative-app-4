import React, {Component} from 'react';
import axios from 'axios';

class Signup extends Component {
    constructor(){
        super();
        this.state = {
            username: '',
            password: '',
            confirmPassword: '',
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    handleSubmit(event){
        console.log('sign-up handleSubmit, username:')
        console.log(this.state.username);
        event.preventDefault();

        // request to server to add a new username/password
        axios.post('/user/signup',{
            username: this.state.username,
            password: this.state.password
        }).then(response => {
            console.log(response);
            if(!response.data.error){
                console.log('successful signup');
                this.setState({ // redirect to login page
                    redirectTo: '/login'
                })

                this.setState({
                    username: "",
                    password: "",
                    confirmPassword: ""
                });
            } else {
                console.log('username already taken');
                this.setState({
                    username: "--NAME TAKEN--",
                    password: "",
                    confirmPassword: ""
                });
            }
        }).catch(error => {
            console.log('signup error: ');
            console.log(error);

            this.setState({
                username: "ERROR",
                password: "",
                confirmPassword: ""
            });
        });

        

    }
    render(){
        return (
            <div className="SignupForm">
                <h4>Sign up</h4>
                <form className="form-horizontal">
                    <div className="form-group">
                        <div className="col-ml-auto">
                            <label className="form-label" htmlFor="username">Username &nbsp;</label>
                        </div>
                        <div className="col-mr-auto">
                            <input className="form-input"
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
                        <div className=' col-ml-auto'>
                            <label className="form-label" htmlFor="password">Password &nbsp;</label>
                        </div>
                        <div className=" col-mr-auto">
                            <input className='form-input'
                                placeholder="Password"
                                type="password"
                                name="password"
                                value={this.state.password}
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className=''></div>
                        <button 
                            className="btn btn-primary col-ml-auto col-mr-auto"
                            onClick={this.handleSubmit}
                            type="submit"
                            >Sign up</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default Signup;