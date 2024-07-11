import React from 'react';
import { Link } from 'react-router-dom';

import NavBarChild from '../components/NavBarChild';
import NavBarChildLogin from '../components/NavBarChildLogin';

function Nopage() {

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

          <div className='page-not-found-404'><p>404 - Page not found.</p></div>
            
        </div>

    </>
 )
}

export default Nopage;
