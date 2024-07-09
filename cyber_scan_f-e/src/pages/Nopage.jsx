import React from 'react';
import { Link } from 'react-router-dom';

import NavBarChild from '../components/NavBarChild';
import NavBarChildLogin from '../components/NavBarChildLogin';

function Nopage() {

  let user_authenticated = false;

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
            <p>404.</p>
        </div>

    </>
 )
}

export default Nopage;
