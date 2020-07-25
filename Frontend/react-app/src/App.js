import React from 'react';
import './App.css';
import SignInBox from './components/pages/SignInBox';
import {withCookies} from 'react-cookie';

class App extends React.Component{
  constructor(){
    super();
    this.state = {loggedIn: false};
  }

  callbackFunction = (result) =>{
    this.setState({loggedIn: result});
  }
  render(){
    console.log(this.props.cookies.get('connect.sid'));
    return (
      <div className="App">
        <SignInBox retrieveLogInStatus={this.callbackFunction}/>
        <p>{this.state.loggedIn ? ('Logged in'):('Not logged in')}</p>
      </div>
    );
  }
}

export default withCookies(App);
