import React, {Component} from 'react';
import axios from 'axios';
import {Routes, Route} from 'react-router-dom';
//components
import Signup from './components/signup';
import LoginForm from './components/login-form';
import Navbar from './components/navbar';
import Home from './components/home';
import Store from './components/store';
import Inventory from './components/inventory';

class App extends Component {
  constructor(){
    super();
    this.state = {
      loggedIn: false,
      username: null
    }

    this.getUser = this.getUser.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  componentDidMount(){
    this.getUser();
  }

  updateUser(userObject){
    this.setState(userObject);
  }

  getUser(){
    axios.get('/user').then(response => {
      console.log('Get user response: ');
      console.log(response.data);
      if(response.data.user){
        console.log('Get User: there is a user saved in the server session: ');
        this.setState({
          loggedIn: true,
          username: response.data.user.username
        })
      } else {
        console.log('Get user: no user');
        this.setState({
          loggedIn: false,
          username: null
        })
      }
    });
  }

  render() {
    return (
      <div className = "App">
        <Navbar updateUser={this.updateUser} loggedIn={this.state.loggedIn}/>
        {/* greet user if logged in: */}
        
        {/* Routes to different components */}
        <Routes>
          <Route 
            exact path="/"
            element={<Home loggedIn={this.state.loggedIn} username={this.state.username}/>}
          />
          <Route 
            exact path="/login"
            element={<LoginForm updateUser={this.updateUser}/>}
            />
          <Route 
            exact path="/signup"
            element={<Signup/>}
          />
          <Route
            exact path="/store"
            element={<Store loggedIn={this.state.loggedIn} updateUser={this.updateUser} username={this.state.username}/>}
          />
          <Route
            expact path ="/inventory"
            element={<Inventory loggedIn={this.state.loggedIn} updateUser={this.updateUser} username={this.state.username}/>}
          />
        </Routes>
        <div className="footer">https://github.com/mDOX98/creative-app-4 </div>
      </div>
    );
  }
}

export default App;
