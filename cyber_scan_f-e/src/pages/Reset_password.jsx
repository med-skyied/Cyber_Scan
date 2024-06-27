import React from 'react';
import { Link } from 'react-router-dom';

import NavBarChild from '../components/NavBarChild';
function ResetPassword() {

    function reset_password() {
        console.log('reset_password is called...');
    }
 return (
    <>
    <NavBarChild/>

        <div className='auth_container'>
            <div className='auth_form_holder'>
                <form onSubmit={reset_password()}>
                    <p>Enter your email:</p>
                    <input className='input_field' type='email' placeholder='email' id='user_email' required></input>
                    <br/> <br />

                    <button type='submit' className='authSubmitButton'>Reset</button>

                </form>

            </div>
        </div>
    </>
 )
}

export default ResetPassword;
