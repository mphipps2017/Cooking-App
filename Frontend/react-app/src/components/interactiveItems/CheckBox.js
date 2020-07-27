import React from 'react';
import Styles from './CheckBox.module.css';

class CheckBox extends React.Component{
    constructor(props){
        super(props);
        this.state ={boxStyle : Styles.unCheckedBox};
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        if(this.state.boxStyle === Styles.unCheckedBox){
            this.setState({boxStyle: Styles.checkedBox});
        } else {
            this.setState({boxStyle: Styles.unCheckedBox});
        }
    }

    render(){
        return(
            <div className={ this.state.boxStyle } onClick={this.handleClick}>
            </div>
        );
    }
}

export default CheckBox;