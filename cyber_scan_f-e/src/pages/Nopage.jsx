import React from 'react';
import { Link } from 'react-router-dom';

import NavBarChild from '../components/NavBarChild';
function Nopage() {
 return (
    <>
        <NavBarChild />
        <div className='main_container'>
            <p>404.</p>
        </div>
        
    </>
 )
}

export default Nopage;