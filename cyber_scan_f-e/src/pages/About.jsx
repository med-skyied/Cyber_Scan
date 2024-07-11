import React from 'react';
import { Link } from 'react-router-dom';

import NavBarChild from '../components/NavBarChild';
import NavBarChildLogin from '../components/NavBarChildLogin';

function About() {

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

  function userAuthState(){
    if (user_authenticated){
      return (<NavBarChildLogin />)
    } else {
      return (<NavBarChild />)
    }
  }
 return (
    <>
        {userAuthState()}
        <div className='main_container'>
        <div className='about_app_holder'>
        <div className='about_app_container'>
            <p>This project is a collection of tools that can be used in information gathering. (or cyber threath analysis)</p>
            <p>This Application doesn't run nmap or any other scaning tool in our servers, we avoided that to not ingage in any act of Law vialotion.</p>
            <p>we have created and assembled a collection of tools that are helpful for a cyber security researcher.</p>
            <p className='services_provided'>We provide the following services:</p><br/>
            <p className='service_title' >Evaluate your connection: <span className='service_about_short_discreption'>A tool to check the security and the risk level of your connection.</span></p> 
            <p className='service_title' >Target Precise information gathering:  <span className='service_about_short_discreption'>Gather public informations about your target.</span></p> 
            <p className='service_title' >DNS Lookup:  <span className='service_about_short_discreption'>Get the ipv4 of the domain name/ host name you provided.</span></p>
            <p className='service_title' >HTTP Headers:  <span className='service_about_short_discreption'>Get the data your browser reveals about you.</span></p> 
            <p className='service_title' >IP Address History:  <span className='service_about_short_discreption'>Get data about a given ip address changes across the internet.</span></p> 
            <p className='service_title' >My IP Address:  <span className='service_about_short_discreption'>See your ip address as seen in the internet</span></p> 
            <p className='service_title' >Scan a target for open common ports:  <span className='service_about_short_discreption'>Provide a target ip address or domain name to scan for open ports runnning services you can exploit.</span></p> 
            <p className='service_title' >Search for a vulnerability by it's CVE-ID:  <span className='service_about_short_discreption'>Provide a CVE-Id to get exclusive informations about that data (ussing CIRCL.lu databases)</span></p> 
            <p className='service_title' >Explore deffirent  vendors and theire products that have security vulnerabilities discovered in them</p> <br/>
            
            <p>Again these are just basic checking and analysis tools. they will be useful for the initial look up in the Information gathering phase (one of the phases a cyber security Operative must go thorough)</p>
            <p>Most users will find this project helpfull. but other advanced Cyber security oriented folks won't find it very interesting.</p>
            <p>This was developed with a short time limit in mind. and it's still under development, so check it out from time to time. </p>
            <br /> <br/>
           
            <div className='creator_section'>
            <p>Created by <span className='creator_name'>Mohamed Amouch</span>, a sotware engineering student.</p>
               <Link to='https://www.linkedin.com/in/mohamed-amouch/' target='_blank'> <span className='author_socials'>My linkedIn</span></Link> 
               <Link to='https://github.com/amch-med23/' target='_blank'><span className='author_socials'>My Github</span></Link>  
               <Link to='https://x.com/amouch_med' target='_blank'><span className='author_socials'>My X Account(twitter previously)</span></Link>  
              </div> 
            </div>
            </div>
        </div>

    </>
 )
}

export default About;
