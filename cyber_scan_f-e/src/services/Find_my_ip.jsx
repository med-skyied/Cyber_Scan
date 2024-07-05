import React from "react";
import '../App.css'
import axios from 'axios';

import NavBarChild from '../components/NavBarChild';
import Footer from '../components/Footer';

export default function FindMyIP() {

    const shodan_key = process.env.SHODAN_API;
    console.log('my shodan api: ' + shodan_key);
    // the shodan demo key for client ip address
    const shodan_ip_ret = 'https://api.shodan.io/tools/myip?key='.concat(shodan_key);
    console.log(shodan_ip_ret);

        async function ip_client_retreival(){
            try {
                let ip_address = await axios.get(shodan_ip_ret);
                console.log('client ip address id: ' + ip_address.data);
                let ip_holder = document.getElementById('ip_address');
                let client_ip = ip_address.data;
                ip_holder.innerHTML = `<h3>${client_ip}</h3>`;
            }
            catch (error){
                alert('error occured,' + error);
            }
        }
    // calling the ip retreaval function.
    {ip_client_retreival()}

    return (
        <>
            <NavBarChild />
            <div className="main_container">
                <div className="find_my_ip">

                    <h4>This is your IP address as seen in the internet:</h4> <h3 id='ip_address' className="actual_ip">Retreaiving ...</h3>

                    <h4>We Are planning to add the geo location services later on.</h4>

                </div>
            </div>
            <Footer />
        </>
    )
}
