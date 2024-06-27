import React from "react";
import '../App.css'


import NavBarChild from '../components/NavBarChild';
import Footer from '../components/Footer';

export default function DomainInfos() {



    return (
        <>
            <NavBarChild />
            <div className="main_container">
                <div className="domain_infos">
                    <p>These are the domain informations. enter the desired domain name or ip address</p>



                </div>
            </div>
            <Footer />
        </>
    )
}
