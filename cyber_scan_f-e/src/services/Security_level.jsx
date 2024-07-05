import React from "react";
import '../App.css'
import axios from 'axios';
import { useState } from "react";

import NavBarChild from '../components/NavBarChild';
import Footer from '../components/Footer';

export default function SecurityLevel() {

    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    async function get_client_ip() {
        let shodan_ip_ret = 'https://api.shodan.io/tools/myip?key=Q5Ig4SGZltKo2QcnTGoVavmYvnmsqbbM';
        try {
            let res = await axios.get(shodan_ip_ret);
            let client_ip_address = res.data;
            return client_ip_address;
            
        } catch(error) {
            console.log('error occured: ' + error);
        }
    }
    
    async function security_risk_level(){
        try{
            setIsButtonDisabled(true) // disabling the button
            let sec_details_elem = document.getElementById('security_details_holder');
            sec_details_elem.innerHTML = ``;
            let client_pub_ip = await get_client_ip();
            let server_api_endpoint = 'http://localhost:5000/api/v1/';

            let client_data = {'client_pub_ip': client_pub_ip};
            let res = await axios.post(server_api_endpoint.concat('security_level'), client_data);
            

            let security_res = res.data['security_details']; // this is the data from the server response

            let sec_note = "";
            let security_level = "";
            let risk_level = "";
            let overall_status = "";
            let ip_type = "";

            if (security_res['riskLevel'] === 0) {
                sec_note = "It seems that you are not using any proxy/vpn. your conection won't be flagged by most web services. you have a resedential / business ip address assigned to you.";
                security_level = "You have a normal conection. We didn't detect any VPN or overlay proxies. We do not advise you to use this network conection for offensive security ops. <span style='color: red'>(You are Exposed)</span>";
                risk_level = "You have been assigned a safe IP, so there is no risk of flagging you by other web services online.";
                ip_type = "You were assigned a Residential or a business IP.";
                overall_status = "<span style='color: green'>Risk Level is Low</span>, <span style='color: red'>Security Level is Bad</span>";
            }
            else if (security_res['riskLevel'] === 1) {
                sec_note = 'We have detected that your network uses a proxy, your conection is covered. but there is a high chance you will be flagged by other web services.';
                security_level = "You have a proxied conection. We detected that your network uses a proxy or a VPN. It would be fine to proceed with Penetration testing OPS using this network. but pay attention for DNS leaks. <span style='color: green'>(You are Covered)  </span> <span style='cursor: pointer'><a href='https://www.dnsleaktest.com/' target='_blank'>Check for DNS leaks</a></span>";
                risk_level = "You will be flagged by most web services that uses advanced fraud protection. i.e: don't use this for online banking and other sensitive online acounts";
                ip_type= "You were assigned a Non-residential IP (hosting provider, proxy, etc...).";
                overall_status = "<span style='color: red'>Risk Level is High</span>, <span style='color: green'>Security Level is Good</span>";
            }
            else if (security_res['riskLevel'] === 2) {
                sec_note = 'We have detected that your network jumps between a proxied and a non-proxied connection, you might raise a false positive in some systems, so be careful, if you are using a proxy or vpn this mostely means that you have a dns leak.  <span style="cursor: pointer"><a href="https://www.dnsleaktest.com/" target="_blank">Check for DNS leaks</a></span>';
                security_level = "Your network jumps between a proxied and a non-proxied connection. this means that you identity will be revealed at some point. if you are using a VPN or a proxy, we advise you to change the node or the VPN relay. <span style='color: blue'>(Don't trust this conection)</span>";
                risk_level = "Because of the nature of your IP, you might be flagged by some online web services. The chance of false positive is high.";
                ip_type="Non-residential & residential IP (warning, Web services may flag innocent people)."
                overall_status = "<span style='color: blue'>Risk Level is Normal</span>, <span style='color: blue'>Security Level is Normal</span>. You might need to check for dns leaks.";
            }

            else{
                sec_note = "Your risk level is not defined, there for we can't determin the security level of your conection. The error must be from you ISP or that our systems are down. please try again later.";
                security_level = "Not Defined";
                ip_type="Not Defined"
                risk_level = "Not Defined";
                overall_status = "Not Defined";
            }
            
            
            sec_details_elem.innerHTML = `<div class="security_result_div">
             <div class="sec_res_holder">
                <p class="sec_res_title">We Got the following Details about you:</p>
                <span style="margin-buttom: 12px"> <span class="security_res_headers">Your public ip Address:</span> <span>${security_res['ipAddress']}</span> </span> <br> <br>
                <span class="security_res_headers">Your assigned Ip address Type (this is important to determin your risk level): </span> <span>${ip_type}</span><br> <br>
                <span class="security_res_headers">Security Level (this indicates your network Overlay protection level): </span> <span>${security_level}</span><br> <br>
                <span class="security_res_headers">Risk Level (this indicates how likelly you are to be flaggd from the web services online): </span> <span>${risk_level} </span><br> <br>
                <span class="security_res_headers">ISP (internet service provider): </span> <span>${security_res['isp']}</span><br> <br>
                <span class="security_res_headers">Country Code: </span> <span>${security_res['countryCode']} </span><br> <br>
                <span class="security_res_headers">Country Name: </span> <span>${security_res['countryName']}</span><br> <br>
                <span class="security_res_headers">ASN: </span> <span>${security_res['asn']}</span><br> <br>
                <span class="security_res_headers">OverAll Status: </span> <span>${overall_status}</span> <br> <br> <br>
                <span class="security_res_headers">General Note: </span> <span>${sec_note}</span>
                
                </div>
                
            </div>`;
            setIsButtonDisabled(false) // reenabling the button
        } catch(error){
            alert('errors occured: ' + error);
        }
        //the post script: let res = await axios.post(apiEndPoint.concat('login'), login_obj);
                            // actual_data = res.data; 

        // first we post the client ip address to the server.
        // second we get the data returned by the server, and we parse it.
    }

    // here we call the main model function.
    //{security_risk_level()}

    return (
        <>
            <NavBarChild />
            <div className="main_container">
                <div className="security_level">
                    <button onClick={security_risk_level} disabled = {isButtonDisabled} className='security_check_btn'><span className="sec_div_btn_text">{ isButtonDisabled ? 'Checking...' : 'Start the Security Check'} </span></button>
                    <div id="security_details_holder" className='security_details_holder'></div>

                        
                </div>
            </div>
            <Footer />
        </>
    )
}
