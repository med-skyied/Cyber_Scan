import React from 'react';
import { Link } from 'react-router-dom';

//importing the main components.
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
function Home() {
 return (
    <>
        <NavBar />
        <div className='Homepage'>
            <p>This is the home page.</p>
        </div>
        <Footer />
    </>
 );
}

export default Home;