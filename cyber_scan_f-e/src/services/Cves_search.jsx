import React from "react";
import '../App.css';
import { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';


import NavBarChild from '../components/NavBarChild';
import Footer from '../components/Footer';
import NavBarChildLogin from '../components/NavBarChildLogin';

export default function CVEsSearch() {

    // determing if the user islogged in. (get the user login_status via the local storage variable)
    let userAuthenticated = true; // user is not logged  (demo only)
    const navigate = useNavigate();
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    function NavigateToLogin(){
      navigate('/login');
    }


    if (userAuthenticated){






      let api_end_point = 'http://localhost:5000/api/v1/';

      let div_cve_result_holder = document.getElementById('cve_result_div');

      // in here we gonna define the functions that performs the requested operations.
      //current DB informations.
      async function get_Current_db_info(event){
        event.preventDefault();
        console.log('getting the current DB infos');
        //each time we clear the html content of the result holder <div>


        try{
          setIsButtonDisabled(true);
          let response = await axios.get(api_end_point.concat('cve_db_infos'));
          let data = response['data'];
          console.log(data);
          // now we handle the data population.
          let obj_keys = Object.keys(data);
          let indx = obj_keys.length;
          //console.log('list keys are: ' + obj_keys);
          let i  = 0 ;
          let cve_db_elem_holder = document.createElement('div');
          cve_db_elem_holder.setAttribute('class', 'cve_db_elem_holder')
          for (let i in obj_keys){
            console.log(obj_keys[i]);
            let cve_db_elem_div = document.createElement('div');

            let cve_db_element_parag = document.createElement('div');
            cve_db_element_parag.setAttribute('class', 'cve_db_elem_parag');
            cve_db_elem_holder.appendChild(cve_db_element_parag);
            Object.entries(data[obj_keys[i]]).forEach(([key, value]) => {
              console.log( key + ' : ' + value);
              cve_db_element_parag.innerHTML = `<div>${data[obj_keys[i]]}</div> <div><span>${key} : ${value}</span></div>`;
              cve_db_elem_holder.appendChild(cve_db_element_parag);

              cve_db_elem_div.appendChild(cve_db_elem_holder);
            });


            //i++;
            div_cve_result_holder.appendChild(cve_db_elem_holder);
          }


          setIsButtonDisabled(false);
        }
        catch (error){
          console.log(error);
        }


      }

      //vendor names.
      function get_vendor_names(event){
        event.preventDefault();
        console.log('getting the aafected vendor names...');


      }

      //vendors affected products.
      function get_vendor_products(event){
        event.preventDefault();
        console.log('getting the provided vendor affected software...');


      }
      //data by cve_id.
      function data_by_cve_id(event){
        event.preventDefault();
        console.log('getting infos about the specified CVE-Id...');

      }

      return (
          <>
              <NavBarChildLogin />
              <div className="main_container">
                  <div className="cves_pages">
                      <div className="cve_inner_holder">
                        <div className='first_notes'>
                            <p>This Service permitts you to explore the CVEs (common vulnerability and Exposures), that have been discovered and exploited in the past. search is done by CVE-IDs</p>
                            <p>CVE IDs are unique IDs assigned to publicly disclosed cybersecurity vulnerabilities that affect software, hardware and firmware, They provide organizations with a standard way to identify and track vulnerabilities, and helps them understand, prioritize, and address these vulnerabilities in their organization.</p>
                            <p>In here We provide CVEs Search/Exploration functionalities.</p>
                            <p className='cve_warning_note'>Keep in Mind: Some of the systems online are still affected by some of these CVEs even though they are patched.</p>
                          </div>


                          <div className='cves_data_entry_field'>

                          <div className='cve_search_option_elem'>
                             <form className="cve_input_form" onSubmit={get_vendor_names}>
                                  <p>Explore the vendors that have security vulnerabilities discovered in them.</p>
                                  <br/>
                                  <button disabled={isButtonDisabled} className='common_button' type="submit">{ isButtonDisabled ? 'Loading Data ...' : 'Search for affected vendors'}</button>
                              </form>
                           </div>

                           <div className='cve_search_option_elem'>
                              <form className="cve_input_form" onSubmit={get_vendor_products}>
                                  <p>Explore the afected products of a given vendor that has the security vulnerabilities
                                    discovered in them.</p>
                                    <p>Enter a vendor name</p>
                                   <input required id=""></input><br/> <br/>
                                   <button className='common_button' type="submit" disabled={isButtonDisabled}> {isButtonDisabled ? 'Loading Data ...' : 'Search for vendors product'}</button>
                               </form>
                            </div>

                            <div className='cve_search_option_elem'>
                               <form className="cve_input_form" onSubmit={data_by_cve_id}>
                                    <p>Search for a vulnerability by it's CVE-ID.</p>
                                    <p>Enter a cve id (i.e: CVE-xxxx-xxxxx)</p>
                                    <input required id=""></input><br/> <br/>
                                    <button className='common_button' type="submit" disabled={isButtonDisabled}>{isButtonDisabled ? 'Loading Data ...' : 'Get CVE data'}</button>
                                </form>
                             </div>

                             <div className='cve_search_option_elem'>
                                <form className="cve_input_form" onSubmit={get_Current_db_info}>
                                     <p>Get more informations about the current vulnerabilities databases. (the ones used in this system).</p>
                                     <br/>
                                     <button className='common_button' type="submit" disabled={isButtonDisabled}>{isButtonDisabled ? 'Loading Data ...' : 'Latest DB Info'}</button>
                                 </form>
                              </div>

                          </div>


                          <div id='cve_result_div'></div>




                        </div>
                  </div>
              </div>
              <Footer />
          </>
      )
    }
    else {
      return (
        <>
        <NavBarChild />
        <div className='cve_not_auth_div'>
            <p className='main_parag_not_auth'>This user is not authenticated, so you will be redirected to authenticate via login page. </p> <br/> <br/>
            <button onClick={NavigateToLogin} className='common_button'>Go to Login</button>
        </div>

        <Footer />
        </>
      )
    }

}
