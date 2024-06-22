import React, {Component} from "react";
import '../App.css';
import { Form, createBrowserRouter } from "react-router-dom";
import cyber_scan_logo from '../assets/cyber_scan_logo.png';

function NavBarChild(){
        return (
        <>
            <div className="navBarChild">
                <a href="/home"><img alt="cyber_scan_logo" src={cyber_scan_logo} className="nav_logo"/></a>
            </div>
        </>
    )
    
}

export default NavBarChild;