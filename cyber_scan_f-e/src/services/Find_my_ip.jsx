import React from "react";
import '../App.css'


import NavBarChild from '../components/NavBarChild';
import Footer from '../components/Footer';

export default function FindMyIP() {



    return (
        <>
            <NavBarChild />
            <div className="main_container">
                <div className="find_my_ip">
                    <p>This is your IP address as seen in the internet: xxxxxxxx</p>

                    <h4>We Are planning to add the geo location service later on.</h4>

                </div>
            </div>
            <Footer />
        </>
    )
}
