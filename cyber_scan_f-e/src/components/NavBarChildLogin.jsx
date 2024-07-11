import React, {Component} from "react";
import '../App.css';
import { Form, createBrowserRouter } from "react-router-dom";
import cyber_scan_logo from '../assets/cyber_scan_logo.png';
import { useNavigate } from "react-router-dom";

function NavBarChildLogin(){
      // logout function.
      const navigate = useNavigate();
      function Logout(){
        // nothing for now
        console.log('logging out...');
        // will set the localstoreage value to 'not-_-auth'
        // then redirect to login;
        localStorage.setItem('user_auth_state', 'cyber_scan-not-_-auth');
        navigate('/login');

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
