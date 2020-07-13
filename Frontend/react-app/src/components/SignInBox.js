import React from 'react';
import styles from './SignInBox.module.css';
import axios from 'axios';

class SignInBox extends React.Component{
    constructor(props){
        super(props);
        this.state = {username: '', password: ''}

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        if(event.target.placeholder === 'username'){
            this.setState({username: event.target.value});
        } else {
            this.setState({password: event.target.value});
        }
    }

    handleSubmit(event){
        console.log('Submiting request....');
        const logInInfo = {
            username: this.state.username,
            password: this.state.password
        }
        axios.post('/users/login', logInInfo)
        .then(res => {
            alert(`Successfully logged in as ${this.state.username}`);
        }).catch(err =>{
            console.log(err);
        })
        event.preventDefault();
    }

    render(){
        return(
            <div className={styles.wrapper}>
                <h1>Logo goes here</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <input type="text" value={this.state.username} onChange={this.handleChange} placeholder="username" />
                        <br />
                        <input type="password" value={this.state.password} onChange={this.handleChange} placeholder="password" />
                    </label>
                    <br />
                    <input type="submit" value="Sign In" />
                </form>
            </div>
        )
    }
}

export default SignInBox;