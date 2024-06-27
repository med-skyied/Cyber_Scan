import React from 'react';
import { Link } from 'react-router-dom';

import NavBarChild from '../components/NavBarChild';

function Contact() {
 return (
    <>
        <NavBarChild />
        <div className='main_container'>
            <p>This is the Contact us page.</p>
        </div>
        
    </>
 )
}

export default Contact;