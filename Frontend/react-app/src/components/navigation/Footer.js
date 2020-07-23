import React from 'react';
import Styles from './Footer.module.css';
// Probably will need to replace all the hrefs with this in future
// import {Link, withRouter} from 'react-router-dom';
// TODO proptypes if I use em
class Footer extends React.Component{
    render(){
        return(
            <div className={Styles.wrapper}>
                <div className={Styles.leftItems}>
                    <a href="a link">F.A.Q</a>
                    <a href="a link">About</a>
                </div>

                <div className={Styles.rightItems}>
                    <p>Contact Us</p>
                    <hr className={Styles.line}></hr>
                    <p>555-555-5555</p>
                    <p>support@thisapp.com</p>
                </div>
            </div>
        );
        
    }
}

export default Footer;