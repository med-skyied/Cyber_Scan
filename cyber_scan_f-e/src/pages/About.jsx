import React from 'react';
import { Link } from 'react-router-dom';

import NavBarChild from '../components/NavBarChild';

function About() {
 return (
    <>
        <NavBarChild />
        <div className='main_container'>
            <p>This is the about us page.</p>
        </div>
        
    </>
 )
}

export default About;