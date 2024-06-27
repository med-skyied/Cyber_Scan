import React from "react";
import '../App.css'


import NavBarChild from '../components/NavBarChild';
import Footer from '../components/Footer';

export default function HttpHeaders() {



    return (
        <>
            <NavBarChild />
            <div className="main_container">
                <div className="http_headers">
                    <p>These are the http headers that your browser sends with every request to the internet.</p>

                    

                </div>
            </div>
            <Footer />
        </>
    )
}
