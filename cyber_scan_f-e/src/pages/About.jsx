import React from 'react';
import { Link } from 'react-router-dom';

import NavBarChild from '../components/NavBarChild';

function About() {
 return (
    <>
        <NavBarChild />
        <div className='main_container'>
        <div className='about_app_holder'>
        <div className='about_app_container'>
            <p>This project is a collection of tools that can be used in information gathering. (or cyber threath analysis)</p>
            <p>This Application doesn't run nmap or any other scaning tool in our servers, we avoided that to not ingage in any act of Law vialotion.</p>
            <p>we have created and assembled a collection of tools that are helpful for a cyber security researcher.</p>
            <p>We provide the following services:</p><br/>
            <p>a list of the final services /...../</p> <br/> 
            <p>Again these are just basic checking and analysis tools. they will be useful for the initial look up in the Information gathering phase (one of the phases a cyber security Operative must go thorough)</p>
            <p>Most users will find this project helpfull. but other advanced Cyber security oriented folks won't find it very interesting.</p>
            <p>This was developed with a short time limit in mind. and it's still under development, so check it out from time to time. </p>
            <br /> <br/>
            <p>Created by Mohamed Amouch, a sotware engineering student</p> <span>creator details</span>
            </div>
            </div>
        </div>

    </>
 )
}

export default About;
