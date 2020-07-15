import React from 'react';
import PropTypes from 'prop-types';
import Styles from './ListForm.module.css';

/*
 * This component makes a list of form inputs
 *   values: array of placeHolder / value strings
 *     ex. ['username', 'password]
 *   buttonText: string of what will show up on the submit form button
 *     ex. 'Sign-in'
 *   onSubmit: A function that takes the values from forms as an input
 *     ex. if values = ['username', 'password'] then onsubmit
 *         will bec alled with {username: 'value', password: 'value'}
*/
class ListForm extends React.Component{
    constructor(props){
        super(props);
        let temp = {}
        let value;
        for(value of props.values){
            temp[value] = "";
        }
        this.state = temp;

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        let temp ={};
        temp[event.target.placeholder] = event.target.value;
        this.setState(temp);
    }

    render(){
        return(
            <form onSubmit={(e) => {
                e.preventDefault();
                return this.props.onSubmit(this.state)}}>
                <label>
                    {this.props.values.map(value =>
                    <div className={Styles.wrapper} key={value} >
                        <input type={value === 'password'?'password':'text'} value={this.state[value]} onChange={this.handleChange} placeholder={value} />
                        <br />
                    </div>
                    )}
                </label>
                <br />
                <input type="submit" value={this.props.buttonText}/>
            </form>
        )
    }
}

ListForm.propTypes = {
    values: PropTypes.array,
    buttonText: PropTypes.string,
    onSubmit: PropTypes.func
}

export default ListForm;