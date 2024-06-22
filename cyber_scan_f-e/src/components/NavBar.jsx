import React, {Component} from "react";
import '../App.css';
import { Form, createBrowserRouter } from "react-router-dom";
import cyber_scan_logo from '../assets/cyber_scan_logo.png';
import { Link } from "react-router-dom";

function NavBar(){
        return (
        <>
            <div className="navBar">
                <img alt="cyber_scan_logo" src={cyber_scan_logo} className="nav_logo"/>
                <ul>
                    <li><Link to='/about'><a>About Us</a></Link></li>
                    <li><Link to='/contact'><a>Contact Us</a></Link></li>
                    <li><Link to='/login'><a>Login</a></Link></li>
                    <li><Link to='/register'><a>Register</a></Link></li>
                </ul>
            </div>
        </>
    )
    
}

export default NavBar;