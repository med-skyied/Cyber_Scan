import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavBarChild from '../components/NavBarChild';

function Login() {
    const navigate = useNavigate();
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    async function login_handler(event) {
        event.preventDefault(); // Prevent default form submission

        // Accessing input values within the function
        const supp_email = event.target.user_email.value;
        const suppp_password = event.target.user_password.value;

        let reqst_obj = {
            hard_username: supp_email,
            hard_password: suppp_password
        };

        console.log(reqst_obj);
        const api_end_point = 'http://localhost:5000/api/v1/';
        const error_parag = document.getElementById('error_header');
        const succ_parag = document.getElementById('success_header');

        try {
            setIsButtonDisabled(true);
            const response = await axios.post(api_end_point.concat('login'), reqst_obj);
            const data = response.data;

            const auth_status = data.login_status;
            if (auth_status === 'accepted') {
                const hash_auth_value = 'YTER4341112!@#$!SDFCCYBRT_SCAN&&$$%@#$@#%TGDSF$@C%%&N)^N$%VWQCR$R';
                localStorage.setItem('user_auth_state', hash_auth_value);

                succ_parag.innerHTML = `Successful Authentication`;
                error_parag.innerHTML = ``;

                navigate('/cve_search');
            } else {
                // Show that the password or the email are incorrect.
                error_parag.textContent = `The credentials you supplied don't match any of our records`;
            }
        } catch (error) {
            console.log('Error:', error);
            alert('An error occurred during login. Please try again.');
        } finally {
            setIsButtonDisabled(false);
        }
    }

    return (
        <>
            <NavBarChild />
            <div className='auth_container'>
                <div className='login_error_holder'>
                    <span className='login_error_header' id='error_header'></span>
                        <span className='succ_header' id='success_header'></span>
                    
                </div>
                <br /> <br />
                <div className='auth_form_holder'>
                    <form onSubmit={login_handler}>
                        <p>Enter your email or username:</p>
                        <input className='input_field' placeholder='email/username' id='user_email' name='user_email' required />
                        <p>Enter your password:</p>
                        <input className='input_field' type='password' id='user_password' name='user_password' required placeholder='password' />
                        <br /> <br />
                        <button type='submit' className='authSubmitButton' disabled={isButtonDisabled}>
                            {isButtonDisabled ? 'Waiting...' : 'Log in'}
                        </button>
                        <br /> <br />
                        <Link to='/reset_password'>Reset your password</Link>
                        <Link className='to_link' to='/register'>
                            or Register new account
                        </Link>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Login;
