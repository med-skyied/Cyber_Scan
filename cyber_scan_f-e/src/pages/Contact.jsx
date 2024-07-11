import React from 'react';
import { Link } from 'react-router-dom';

import NavBarChild from '../components/NavBarChild';
import NavBarChildLogin from '../components/NavBarChildLogin';

function Contact() {

  function is_user_authenticated(){
    let hard_coded_hash_value = 'YTER4341112!@#$!SDFCCYBRT_SCAN&&$$%@#$@#%TGDSF$@C%%&N)^N$%VWQCR$R';
    let auth_local_strg_value = localStorage.getItem('user_auth_state');
    if (auth_local_strg_value === hard_coded_hash_value){
      return true;
    }
    else {
      return false;
    }
  }

  let user_authenticated = is_user_authenticated();

  function userAuthState(){
    if (user_authenticated){
      return (<NavBarChildLogin />)
    } else {
      return (<NavBarChild />)
    }
  }

 return (
    <>
        {userAuthState()}
        <div className='main_container'>
        <div className='contact_container'>
            <p>You can contact us via this email: <span><a href='mailto:skyied.med2023@gmail.com' > skyied.med2023@gmail.com </a></span> </p>
            <p>Or you can talk to me on my socials:</p>
            <div className='creator_section'>
               <Link to='https://www.linkedin.com/in/mohamed-amouch/' target='_blank'> <span className='author_socials'>My linkedIn</span></Link> 
               <Link to='https://github.com/amch-med23/' target='_blank'><span className='author_socials'>My Github</span></Link>  
               <Link to='https://x.com/amouch_med' target='_blank'><span className='author_socials'>My X Account(twitter previously)</span></Link>  
              </div> 

            </div>
        </div>

    </>
 )
}

export default Contact;
