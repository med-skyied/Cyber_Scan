import React, {Component} from "react";
import '../App.css';
import { Form, createBrowserRouter } from "react-router-dom";
import cyber_scan_logo from '../assets/cyber_scan_logo.png';

function NavBarChildLogin(){
      // logout function.
      function Logout(){
        // nothing for now
        console.log('logging out...');
      }
        return (
        <>
            <div className="navBarChildLogin">
                <a  href="/home" ><img alt="cyber_scan_logo" src={cyber_scan_logo} className="nav_logo"/></a>
                <button className='button_log_out' onClick={Logout}><a className='logout_txt'>Log out</a></button>
            </div>
        </>
    )

}

export default NavBarChildLogin;
