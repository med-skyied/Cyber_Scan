import React from "react";
import '../App.css'
import axios from 'axios';
import { useState } from 'react';

import NavBarChild from '../components/NavBarChild';
import Footer from '../components/Footer';

export default function IpHistory() {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // button enabled by default
    async function IpHistoryRet(event){
      event.preventDefault(); // preventing the default behaiviour from <form>
      const api_end_point = 'http://localhost:5000/api/v1/';

      //creating and retreaving the DOM objects.
      let provided_target_host = document.getElementById('ip_domain_name').value;
      let target_ip_history_parag = document.getElementById('ip_history_result_div');

      //clearing the resulteach time.
      target_ip_history_parag.innerHTML = ``; // this means none in the DOM

      // construction the object to send
      console.log('you looked for: '+ provided_target_host);
      let target_host_name = {};
      target_host_name['target_domain_name'] = provided_target_host;
      //sending datato the back-end
      try {

        // disable the button
        setIsButtonDisabled(true);
        let res = await axios.post(api_end_point.concat('ip_history'), target_host_name);
        let res_data = res['data'];
        //console.log(res_data); // just consoling for now.

        //clearing the result holder each request.
        target_ip_history_parag.innerHTML = ``;

        let data = res_data['response']['records'];
        let error = res_data['response']['error'];
        if (error){
            // this is if no errors are found
            console.log('we have no records about this host name');
            let error_msg_div = document.createElement('div');
            error_msg_div.setAttribute('class', 'ip_history_error_found');
            error_msg_div.innerHTML = `<span class='ip_history_error_header'> Sorry, But we have no records for this Host name or Domain name.</span>`;
            target_ip_history_parag.appendChild(error_msg_div);
            //enable the button
            setIsButtonDisabled(false);
        }
         else {
           // this is in case of error encounter.
           console.log('we have data about this record');
           // we aredealing with array types in here.
           // we will show maxintreis of 50. (because no time to implement paginitation at the server level).
           let data_elem_num = data.length;
           if (data_elem_num <= 50) {
             // we proceed normally.
             let i = 0;
             let res_holder_div = document.createElement('div');
             res_holder_div.setAttribute('class', 'ip_history_res_holder_succ');
             while (i < data_elem_num) {
               let iph_elem_holder_div = document.createElement('div');
               iph_elem_holder_div.setAttribute('class', 'iph_res_elem_holder');

               if (data[i]){
                 // if the data elem is not empty (now we deal with a dictionary)
                 console.log('these data: ' + data[i]);
                 Object.entries(data[i]).forEach(([key, value]) => {
                   let iph_elem_div = document.createElement('div');
                   iph_elem_div.setAttribute('class', 'iph_indiv_element');
                   iph_elem_div.innerHTML = `<div><span>${key}</span> : <span>${value}</span></div>`;
                   // appending 1st
                   iph_elem_holder_div.appendChild(iph_elem_div);
                 });


               }

              // append 2nd
              res_holder_div.appendChild(iph_elem_holder_div);
               i++;
             }
             // outside of the while loop. append 3th

              target_ip_history_parag.appendChild(res_holder_div);
              //enable the button
              setIsButtonDisabled(false);

           }
           else if ( data_elem_num > 50) {
             // in here we show only the first 25 intries 'you can test this by searching for 'cnn.com' or some highly active host name.
             console.log('we will proceed with only 25 element of intries.')
             // the loop should have a limit of 26 if the starting index was 0.
             let j = 0;
             let res_holder_div = document.createElement('div');
             res_holder_div.setAttribute('class', 'ip_history_res_holder_succ');
             while (j < 50) {
               let iph_elem_holder_div = document.createElement('div');
               iph_elem_holder_div.setAttribute('class', 'iph_res_elem_holder');

               if (data[j]){
                 // if the data elem is not empty (now we deal with a dictionary)
                 console.log('these data: ' + data[j]);
                 Object.entries(data[j]).forEach(([key, value]) => {
                   let iph_elem_div = document.createElement('div');
                   iph_elem_div.setAttribute('class', 'iph_indiv_element');
                   iph_elem_div.innerHTML = `<div><span>${key}</span> : <span>${value}</span></div>`;
                   // appending 1st
                   iph_elem_holder_div.appendChild(iph_elem_div);
                 });


               }

              // append 2nd
              res_holder_div.appendChild(iph_elem_holder_div);
               j++;
             }
             // outside of the while loop. append 3th

              target_ip_history_parag.appendChild(res_holder_div);

              //enable the button.
              setIsButtonDisabled(false);

           }

         }


      } catch(error) {
        //just alerting for now.
        alert(error);
      }


    }

    return (
        <>
            <NavBarChild />
            <div className="main_container">
                <div className="ip_history">
                  <div className='ip_history_holder'>
                    <p>It's very important to know the ip address history of a given host name (or domain name), this
                    is mostelly used in forensics analysis to determin the source of a given data packate at a given time in the past.</p>
                    <p className='performance_notice'>(For performance reasons we return 50 results at max, the dns entry might contain much more than what we return)</p>
                    <form className='ip_history_form' onSubmit={IpHistoryRet}>
                    <p>Enter the domain name in question</p> <br/>
                    <input id='ip_domain_name' required></input> <br /> <br />
                    <button type='submit' disabled={isButtonDisabled} className='common_button'>{ isButtonDisabled ? "Loading data ..." : "Get ip History"}</button>
                    </form>
                    </div>
                    <div id='ip_history_result_div' className='ip_history_result'></div>
                </div>
            </div>
            <Footer />
        </>
    )
}
