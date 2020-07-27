import React from 'react';
import './App.css';
import SignInBox from './components/pages/SignInBox';
import CheckBox from './components/interactiveItems/CheckBox';

class App extends React.Component{
  constructor(){
    super();
    this.state = {loggedIn: false};
  }

  callbackFunction = (result) =>{
    this.setState({loggedIn: result});
  }
  render(){
    return (
      <div className="App">
        <SignInBox retrieveLogInStatus={this.callbackFunction}/>
        <p>{this.state.loggedIn ? ('Logged in'):('Not logged in')}</p>
        <CheckBox />
      </div>
    );
  }
}

export default App;
