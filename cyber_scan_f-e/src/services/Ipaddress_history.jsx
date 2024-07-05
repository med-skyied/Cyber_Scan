import React from "react";
import '../App.css'


import NavBarChild from '../components/NavBarChild';
import Footer from '../components/Footer';

export default function IpHistory() {



    return (
        <>
            <NavBarChild />
            <div className="main_container">
                <div className="ip_history">
                  <div className='ip_history_holder'>
                    <p>It's very importtant to know the ip address history of a given host name (or domain name), this
                    is mostelly used in forensics analysis to determin the source of a given data packate at a given time in the past.</p>
                    <form className='ip_history_form'>
                    <p>Enter the domain name in question</p> <br/>
                    <input id='' required></input> <br /> <br />
                    <button type='submit'>Get ip History</button>
                    </form>

                    </div>
                    <div className='ip_history_result'>the result</div>
                </div>
            </div>
            <Footer />
        </>
    )
}
