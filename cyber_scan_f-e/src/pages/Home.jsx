import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

//importing the main components.
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import NavBarChildLogin from '../components/NavBarChildLogin';

function Home() {
  const navigate = useNavigate();


  function is_user_authenticated(){
    let hard_coded_hash_value = 'YTER4341112!@#$!SDFCCYBRT_SCAN&&$$%@#$@#%TGDSF$@C%%&N)^N$%VWQCR$R';
    let auth_local_strg_value = localStorage.getItem('user_auth_state');
    if (auth_local_strg_value === hard_coded_hash_value){
      return true;
    }
    else {
      return false;
    }
  }

  let user_authenticated = is_user_authenticated();
  // determing the authentication state of the user.


  function find_my_ip(){
    navigate('/find_my_ip');
  }
  function dns_lookup(){
    navigate('/dns_lookup');
  }
  function cve_search(){
    navigate('/cve_search');
  }
  function ipaddress_history(){
    navigate('/ipaddress_history');
  }
  function host_info_gathering(){
    navigate('/host_gather_info');
  }
  function http_headers(){
    navigate('/http_headers');
  }
  function security_check() {
    navigate('/security_check');
  }
  function scan_port() {
    navigate('/scan_ports');
  }
  // defining the user auth state function

  function userAuthState(){
    if (user_authenticated){
      return (<NavBarChildLogin />)
    } else {
      return (<NavBar />)
    }
  }

 return (
    <>
        {userAuthState()}

        <div className='main_container'>
            <div className='home_partitioner_container'>
              <section>

              </section>
              <div className='service_holder'>
                <div className='inner_holder'>
                <p className='home_serv_header'>Evaluate your connection</p>
                  <h3>Check if you are behind a secure Wall (if my VPN or proxy is active or not). <br/>
                  This service will also determin your  own 'risk-level' based on your public ip
                  (this means if most websites or web applications will flag you or not.
                    to determin that, we use your public ip to determin if it's either a
                    Residential/Business ip or Non-residential ip.)</h3>
                    <button onClick={security_check} className='main_services_button'><h4 className='service_btn_txt'>Check the risk/security level of my Connection.</h4></button>
                </div>
                </div>
              <section className='service_holder'>
                <div className='inner_holder'>
                  <p className='home_serv_header'>Target Precise information gathering</p>
                  <h3>This tool will gather sumorized data about your target, it gets data from popular search engines. Will help you alot in the information gathering phase.</h3>
                  <button onClick={host_info_gathering} className='main_services_button'><h3 className='service_btn_txt'>Gather informations about your target</h3></button>
                </div>
                </section>
              <section className='service_holder'>
                <div className='inner_holder'>
                  <p className='home_serv_header'>DNS Lookup</p>
                  <h3>Look up the IP address for the provided domain names'</h3>
                  <button onClick={dns_lookup} className='main_services_button'><h3 className='service_btn_txt'>Dns Lookup</h3></button>
                </div>
                </section>
              <section className='service_holder'>
                <div className='inner_holder'>
                  <p className='home_serv_header'>HTTP Headers</p>
                  <h3>This Shows the HTTP headers that your client sends when connecting to a webserver.
                   (importing to know how much data youreveal about your self.)</h3>
                  <button onClick={http_headers} className='main_services_button'><h3 className='service_btn_txt'>Show my HTTP Headers</h3></button>
                </div>
                </section>
              <section className='service_holder'>
                <div className='inner_holder'>
                  <p className='home_serv_header'>IP Address History</p>
                  <h3> One of the most important steps to gather infotmations about a target is to observe the history of the assigned ip address,
                  This is important in forensics analysis. </h3>
                  <button onClick={ipaddress_history} className='main_services_button'><h3 className='service_btn_txt'>Get Domain data about a Server</h3></button>
                </div>
                </section>
              <section className='service_holder'>
                  <div className='inner_holder'>
                    <p className='home_serv_header'>My IP Address </p>
                    <h3>Get your current IP address as seen from the Internet, Other location related services are planned
                     to be added in the future</h3>
                    <button className='main_services_button' onClick={find_my_ip} ><h3 className='service_btn_txt'>Show my current IP address as seen in the Internet</h3></button>
                  </div>
                </section>
                <section>
                <div className='service_holder'>
                  <div className='inner_holder'>
                  <p className='home_serv_header'>Scan a target for open common ports</p>
                    <h3> Scan your target for open ports you can exploit. provide eaither an ip address in case of a server
                      or a domain name in case of webservers.
                    </h3>
                      <button onClick={scan_port} className='main_services_button'><h4 className='service_btn_txt'>Scan a target</h4></button>
                  </div>
                </div>
                </section>
              <section className='service_cve_holder'>
                <div className='inner_holder'>
                  <p className='home_serv_header'>CVE Search (Private for Registered users)</p>
                  <h4>Retreive informations about CVEs (Common Vulnerabilities Exposure) that have been patched or still active. We provide multiple search criterias. </h4>
                      <button onClick={cve_search} className='main_services_button'><h3 className='service_btn_txt'>Search for CVEs data</h3></button>
                  </div>
                </section>
          </div>
        </div>
        <Footer />
    </>
 );
}

export default Home;
