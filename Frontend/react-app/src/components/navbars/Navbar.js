import React from 'react';
import Styles from './Navbar.module.css';
// Probably will need to replace all the hrefs with this in future
// import {Link, withRouter} from 'react-router-dom';
// TODO proptypes
class Navbar extends React.Component{
    render(){
        return(
            <div className={Styles.wrapper}>
                <div className={Styles.leftItems}>
                    <div className={Styles.tempLogoLeft} />
                    <div className={Styles.tempLogoRight} />
                    <a href="a link">About</a>
                    <a href="a link">F.A.Q</a>
                </div>

                <div className="rightLinks">
                    <a href="a link">Sign-in</a>
                    <a href="a link">Create Account</a>
                </div>
            </div>
        );
        
    }
}

export default Navbar;