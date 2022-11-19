import React, {Component} from 'react';
import {Link} from 'react-router-dom';
class Home extends Component {
    render() {

        let bodyText = undefined;

        if(this.props.loggedIn){
            bodyText = (<div>
                <h1>Welcome {this.props.username}!</h1>
                <h2>Check out the store!</h2>
                <button><Link to="/store" className="custom-b">
                            <span className="custom-b">Store</span>
                        </Link></button>
                
            </div>)
        } else {
            bodyText = (<div>
                <h1>Sign Up or Log in!</h1>
                <button><Link to="/signup" className="custom-b">
                            <span className="custom-b">Sign Up</span>
                        </Link></button>
                
            </div>)
        }

        return (
            <div>
                {bodyText}
            </div>
        )
    }
}

export default Home;
