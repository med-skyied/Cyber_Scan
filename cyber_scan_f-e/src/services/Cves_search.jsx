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

      
      // in here we gonna define the functions that performs the requested operations.
      //current DB informations.

      

      async function get_Current_db_info(event){
        event.preventDefault();
        console.log('getting the current DB infos');
        //each time we clear the html content of the result holder <div>

        let div_cve_result_holder = document.getElementById('cve_result_div');
        div_cve_result_holder.innerHTML=``;

        try {
          setIsButtonDisabled(true);
          let response = await axios.get(api_end_point.concat('cve_db_infos'));
          let data = response.data;
          console.log(data);
        
          // Clear previous content in div_cve_result_holder, if necessary
          div_cve_result_holder.innerHTML = '';
        
          // Iterate over the keys in data
          Object.keys(data).forEach(key => {
            console.log(key);
            let cve_db_elem_holder = document.createElement('div');
            cve_db_elem_holder.setAttribute('class', 'cve_db_elem_holder');
        
            // Create header element for the key
            let headerElement = document.createElement('div');
            headerElement.setAttribute('class', 'cve_db_elem_header');
            headerElement.textContent = key;
        
            cve_db_elem_holder.appendChild(headerElement);
        
            // Create container for entries
            let entriesContainer = document.createElement('div');
            entriesContainer.setAttribute('class', 'cve_db_entries_container');
        
            // Iterate over the properties of each object
            Object.entries(data[key]).forEach(([propKey, propValue]) => {
              console.log(propKey + ' : ' + propValue);
              let entryElement = document.createElement('div');
              entryElement.setAttribute('class', 'cve_db_entry');
              entryElement.innerHTML = `<span>${propKey} : ${propValue}</span>`;
              entriesContainer.appendChild(entryElement);
            });
        
            cve_db_elem_holder.appendChild(entriesContainer);
            div_cve_result_holder.appendChild(cve_db_elem_holder);
          });
        
        } catch (error) {
          console.error('Error fetching or processing data:', error);
        } finally {
          setIsButtonDisabled(false); // Ensure button is re-enabled regardless of success or failure
        }

      }

      //vendor names.
      async function get_vendor_names(event){
        event.preventDefault();
        console.log('getting the aafected vendor names...');

        let div_cve_result_holder = document.getElementById('cve_result_div');
        div_cve_result_holder.innerHTML=``;

        try {
          setIsButtonDisabled(true);
          let response = await axios.get(api_end_point.concat('vendors_affected'));
          let data = response.data;
          console.log(data);          
          // this is a list.

          let vendor_list_holder = document.createElement('div');
          vendor_list_holder.setAttribute('class', 'vendor_list_holder');

         let vendor_name_num_holder = document.createElement('div');
         vendor_name_num_holder.setAttribute('class', 'vendor_name_num_holder');
         vendor_name_num_holder.innerHTML = `<div>We got : ${data.length} affected vendors:</div>`;
         vendor_list_holder.appendChild(vendor_name_num_holder);
          for (let i in data){ // this gets the indexes
            let vendor_elem_div = document.createElement('div');
            vendor_elem_div.setAttribute('class', 'vendor_elem_div');
            vendor_elem_div.innerHTML = `<div>${data[i]}</div>`;
            vendor_list_holder.appendChild(vendor_elem_div);

          }
          //div_cve_result_holder.innerHTML = `<div>We got : ${data.length} afected vendors:</div>`;
          div_cve_result_holder.appendChild(vendor_list_holder);

        } catch (error) {
          alert(error);
        } finally {
          setIsButtonDisabled(false);
        }

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


                          <div id='cve_result_div' className="cve_holder_div"></div>




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
