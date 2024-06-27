import React from "react";
import '../App.css'


import NavBarChild from '../components/NavBarChild';
import Footer from '../components/Footer';

export default function SecurityLevel() {



    return (
        <>
            <NavBarChild />
            <div className="main_container">
                <div className="security_level">
                    <p>This is your security level data: </p>

                    <p>
                    This will show the following entiries: <br/>

                    Security Level: <br/>
                    Risk Level: <br/>
                    Type of IP (what type my ISP / VPN / Proxy assigned to me now): <br/>
                    and a note about the over all security of the client: 
                    </p>

                </div>
            </div>
            <Footer />
        </>
    )
}
