import React from 'react';
import { Link } from 'react-router-dom';

import NavBarChild from '../components/NavBarChild';

function Contact() {
 return (
    <>
        <NavBarChild />
        <div className='main_container'>
        <div className='contact_container'>
            <p>You can contact us via this email: <span><a href='mailto:skyied.med2023@gmail.com' > skyied.med2023@gmail.com </a></span> </p>
            <p>Or you can talk to me on my socials: /.my socials./</p>
            
            </div>
        </div>

    </>
 )
}

export default Contact;
