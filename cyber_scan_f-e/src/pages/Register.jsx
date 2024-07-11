import React from 'react';
import { Link } from 'react-router-dom';

import NavBarChild from '../components/NavBarChild';
function Register() {
    function register_handler() {
        console.log('auth register handlere is called...');
        alert('This functionaality is not yet implemented, use these hard coded credentials to login:\n   username/email: admin@cyberscanamch.com\n   password: admin20240711');
    }
 return (
    <>
        <NavBarChild />
        
        <div className='auth_container'>
            <div className='auth_form_holder'>
                <form onSubmit={register_handler}>
                    <p>Enter your email:</p>
                    <input className='input_field' type='email' placeholder='email' id='user_email' required></input>
                    <p>Enter your password:</p>
                    <input className='input_field' type='password'  id='def_password' required placeholder='password'></input>
                    <p>Re-Enter your password:</p>
                    <input className='input_field' type='password'  id='def_password_conf' required placeholder='password confirmation'></input>
                    <br/> <br />
                    <button type='submit' className='authSubmitButton'>Register</button>
                    <Link className='to_link' to='/login'>or Login</Link>
                </form>
            </div>
        </div>
    </>
 )
}

export default Register;