import React from 'react';
import { Link } from 'react-router-dom';
import AuthBackground from '../assets/auth_background.jpg'

import NavBarChild from '../components/NavBarChild';
function Login() {

    function login_handler() {
        console.log('auth login handlere is called...');
    }
 return (
    <>
    <NavBarChild/>

        <div className='auth_container'
        
        /*style={{ backgroundImage : `url(${AuthBackground})`,
        backgroundRepeat: 'no-repeat',
        height:'100vh',
        width: '100%',
        objectFit: 'cover'}}*/
        >
            <div className='auth_form_holder' >
                <form onSubmit={login_handler()}>
                    <p>Enter your email:</p>
                    <input className='input_field' type='email' placeholder='email' id='user_email' required></input>
                    <p>Enter your password:</p>
                    <input className='input_field' type='password'  id='user_password' required placeholder='password'></input>
                    <br/> <br />

                    <button type='submit' className='authSubmitButton'>Log in</button>
                    <br /> <br />
                    <Link to='/reset_password'>Reset your password</Link>
                    <Link className='to_link' to='/register'>or Register new account</Link>
                </form>

            </div>
        </div>
    </>
 )
}

export default Login;
