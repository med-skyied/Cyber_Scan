import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

//importing the main components.
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';

function Home() {
  const navigate = useNavigate();

  function find_my_ip(){
    navigate('/find_my_ip');
  }
  function dns_lookup(){
    navigate('/dns_lookup');
  }
  function cve_search(){
    navigate('/cve_search');
  }
  function domain_infos(){
    navigate('/domain_infos');
  }
  function host_infos(){
    navigate('/host_infos');
  }
  function http_headers(){
    navigate('/http_headers');
  }
  function security_check() {
    navigate('/security_check');
  }
 return (
    <>
        <NavBar />
        <div className='main_container'>
            <div className='home_partitioner_container'>
              <div className='service_holder'>
                <div className='inner_holder'>
                <p className='home_serv_header'>Check  the Security Level and the Risk level of your Connection</p>
                  <h3> Check if am behind a secure Wall (if my VPN or proxy is active or not). <br/>
                  This service will also determin your  own 'risk-level' based on your public ip
                  (this means if most websites or web applications will flag you or not.
                    to determin that we use your public ip to determin if it's either a
                    Residential/Business ip or Non-residential ip.)</h3>
                    <button onClick={security_check} className='main_services_button'><h4 className='service_btn_txt'>Check the risk/security level of my Connection.</h4></button>
                </div>
                </div>
              <section className='service_holder'>
                <div className='inner_holder'>
                  <p className='home_serv_header'>Host Information</p>
                  <h3>Returns all services that have been found on the given host IP</h3>
                  <button onClick={host_infos} className='main_services_button'><h3 className='service_btn_txt'>Get foreinsic infos about a host name</h3></button>
                </div>
                </section>
              <section className='service_holder'>
                <div className='inner_holder'>
                  <p className='home_serv_header'>DNS Lookup</p>
                  <h3>Look up the IP address for the provided list of hostnames., examle: 'google.com ...'</h3>
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
                  <p className='home_serv_header'>Domain Information</p>
                  <h3> One of the most important steps to gether informations about a server online is to get all the subdomains
                  and other DNS entries for the given domain. </h3>
                  <button onClick={domain_infos} className='main_services_button'><h3 className='service_btn_txt'>Get Domain data about a Server</h3></button>
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
              <section className='service_cve_holder'>
                <div className='inner_holder'>
                  <p className='home_serv_header'>Private for Registered users</p>
                  <h4>Retreive informations about CVEs (Common Vulnerabilities Exposure) that have been patched or still active. search is filtered by the year. </h4>
                      <button onClick={cve_search} className='main_services_button'><h3 className='service_btn_txt'>Show active and patched CVEs</h3></button>
                  </div>
                </section>
          </div>
        </div>
        <Footer />
    </>
 );
}

export default Home;
