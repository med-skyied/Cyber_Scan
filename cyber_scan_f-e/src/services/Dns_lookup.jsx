import React from "react";
import '../App.css'


import NavBarChild from '../components/NavBarChild';
import Footer from '../components/Footer';

export default function DnsLookUp() {



    return (
        <>
            <NavBarChild />
            <div className="main_container">
                <div className="dns_lookup">
                <div className='dns_lookup_container'>
                  <form className='form_dnslookup'>
                      <p>Enter the domain name to retreive it's dns Type 'A' record (Used to retreive the ip address of a domain name)</p>
                      <input id='domain name' required></input> <span>Only one domain name at a time</span> <br/><br/>
                      <button type='submit'>Look Up</button>
                  </form>
                </div>
                  <div className="dns_lookup_res"> the result</div>
                </div>
            </div>
            <Footer />
        </>
    )
}
