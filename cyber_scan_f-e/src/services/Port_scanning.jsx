import React from "react";
import '../App.css'
import axios from 'axios';

import NavBarChild from '../components/NavBarChild';
import Footer from '../components/Footer';


export default function PortScanner(){

    return(
        <>
            <NavBarChild />
            <div className='main_container'>
            <div className='target_scan_container'>
              <div className='target_scan_subcontainer'>
                  <p>This web based port scanner will test whether common ports are open on a server.
                      Useful in determining if a specific service (e.g. HTTP) is up or down on a specific server.
                      Ports scanned are: 21, 22, 23, 25, 80, 110, 139, 143, 445, 1433, 1521, 3306 and 3389
                  </p>
                  <form className='port_scan_form'>
                    <p>Provide the ip address of your target, or the domain name of a web server.</p>
                    <input required id="target_to_scan"></input> <span>provide either ip address or domain name not both.</span>
                    <br/> <br/>
                    <button type='submit'>Start Scaning</button>
                    </form>
                  </div>
                  <div id='port_scan_result_holder'>the result</div>
                  </div>
              </div>
            <Footer />
        </>
    )
}
