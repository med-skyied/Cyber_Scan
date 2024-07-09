import React from "react";
import '../App.css';
import axios from 'axios';
import {useState} from 'react';


import NavBarChild from '../components/NavBarChild';
import Footer from '../components/Footer';

export default function DnsLookUp() {

    const [isButtonDisabled, setIsButtonDisabled] = useState(false); // fenabled by default

    const api_end_point = 'http://localhost:5000/api/v1/';
    async function dnsLookUP(event) {
      // when the user submits the domain name.
      event.preventDefault();
      let domain_name = document.getElementById('domain_name_input').value;
      //console.log(domain_name);
      let dns_look_up_obj = {};
      dns_look_up_obj['domain_name'] = domain_name;
      try {
        setIsButtonDisabled(true);
        let response = await axios.post(api_end_point.concat('dns_lookup'), dns_look_up_obj);
        let returned_data = response['data'];
        //console.log(returned_data); // to show the returned result.
        // we will populate the divs to construct the data layout.

        let dns_lookup_result_parag = document.getElementById('dns_lookup_result_holder');

        // clearing each time;
        dns_lookup_result_parag.innerHTML = ``;

        let data = returned_data['response'];
        //console.log(data);
        let indx = data['records'].length;
        let i = 0;
        let res_holder_div = document.createElement('div');
        res_holder_div.setAttribute('class', 'dns_lookup_holder');

        while (i < indx) {
          let dataElem = data['records'][i];

          // Create a new div container for each record
          let element_holder_div = document.createElement('div');
          element_holder_div.setAttribute('class', 'dns_elem_lookup_holder');

            // Iterate over each key-value pair in dataElem
            Object.entries(dataElem).forEach(([key, value]) => {
              // Create a new div for each key-value pair


              if (key === 'data') {
                // Example conditional handling
                let dns_record_div = document.createElement('div');
                dns_record_div.innerHTML = `<span>DNS record</span> : <span>${value}</span>`;
                element_holder_div.appendChild(dns_record_div);
              } else {
                let pair_div = document.createElement('div');
                pair_div.innerHTML = `<span>${key}</span> : <span>${value}</span>`;

                // Append the pair_div to the element_holder_div
                element_holder_div.appendChild(pair_div);
              }
            });

            // Append the element_holder_div to res_holder_div
            res_holder_div.appendChild(element_holder_div);

            i++;
          }

          // Now append the res_holder_div to dns_lookup_result_parag (assuming it's a valid DOM element)
          dns_lookup_result_parag.appendChild(res_holder_div);
          setIsButtonDisabled(false);
      }
      catch (error){
        alert(error);
      }



    }


    return (
        <>
            <NavBarChild />
            <div className="main_container">
                <div className="dns_lookup">
                <div className='dns_lookup_container'>
                  <form className='form_dnslookup' onSubmit={dnsLookUP}>
                      <p>Enter the domain name to retreive it's dns Type 'A' record (Used to retreive the ip address of a domain name)</p>
                      <input id='domain_name_input' required></input> <span>Only one domain name at a time</span> <br/><br/>
                      <button type='submit' disabled={isButtonDisabled} className='common_button'> { isButtonDisabled ? 'Loading data ...' : 'Look up DNS'}</button>
                  </form>
                </div>
                  <div className="dns_lookup_res" id='dns_lookup_result_holder'></div>
                </div>
            </div>
            <Footer />
        </>
    )
}
