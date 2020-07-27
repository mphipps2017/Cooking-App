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
 *   component: A function that should return the JSX of a component to be rendered below the form.
 *     ex. For example on the sign in page we have the "forgot your password link" and "sign-up" link
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
                <div className={Styles.wrapper}>
                    <label>
                        {this.props.values.map(value =>
                        <div className={Styles.textInputs}key={value} >
                            <input type={value === 'password'?'password':'text'} value={this.state[value]} onChange={this.handleChange} placeholder={value} />
                            <br />
                        </div>
                        )}
                    </label>
                    {this.props.component()}
                    <br />
                    <input type="submit" className={Styles.button} value={this.props.buttonText}/>
                </div>
            </form>
        )
    }
}

ListForm.propTypes = {
    values: PropTypes.array,
    buttonText: PropTypes.string,
    onSubmit: PropTypes.func,
    component: PropTypes.func
}

export default ListForm;