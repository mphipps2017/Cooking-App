import React from 'react';
import styles from './SignInBox.module.css';
import axios from 'axios';

import ListForm from '../forms/listform/ListForm';

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

    handleSubmit(logInInfo){
        console.log('Submiting request....');
        axios.post('/users/login', logInInfo)
        .then(res => {
            alert(`Successfully logged in as ${logInInfo.username}`);
        }).catch(err =>{
            console.log(err);
        })
    }

    render(){
        const component = () =>{
            return(
                <div className={styles.accountManagementLinks}>
                    <a href="a link">Forgot your password?</a>
                    <a href="a link">Sign Up</a>
                </div>
            );
        }
        return(
            <div className={styles.wrapper}>
                <h1>Logo goes here</h1>
                <ListForm values={['username', 'password']} buttonText="Sign-in" onSubmit={this.handleSubmit} component={component}/>
            </div>
        )
    }
}

export default SignInBox;