import React from "react";
import '../App.css'
import axios from 'axios';
import { useState } from 'react';

import NavBarChild from '../components/NavBarChild';
import Footer from '../components/Footer';


export default function PortScanner(){

    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    async function scan_target_ports(event){
      event.preventDefault(); // preventing the3 default behaiviour (refresh)
      const api_end_point = 'http://localhost:5000/api/v1/';

      // construction the DOM objects.
      let port_scanning_res_parag = document.getElementById('port_scan_result_holder');
      let target_host = document.getElementById('target_to_scan').value;
      console.log(target_host);

      // constructing the data source object
      let target_to_scan = {};
      target_to_scan['target_host'] = target_host;
      // making the calls to the back-end api
      try{
        // disable the button.
        setIsButtonDisabled(true);
        let response = await axios.post(api_end_point.concat('port_scanning'), target_to_scan); // axios jsonifis the object befour it sends it, so no need for that.
        let data = response['data']

        let services_status_data = data['response']['port'];
        let ps_indx = services_status_data.length;

        console.log('we got '+ ps_indx + ' results.');
        console.log(services_status_data);

        //constructing a loop to populate this data in the DOM.

        // clearing the data each time.
        port_scanning_res_parag.innerHTML = ``;

        /*let port_scanning_res_div = document.createElement('div');
        port_scanning_res_div.setAttribute('class', 'port_scan_holder_div');
        while (c < ps_indx){
          let port_scanning_elem = document.createElement('div');
          port_scanning_elem.setAttribute('class', 'port_scan_element');
          Object.entries(services_status_data[c]).forEach(([key, value]) => {
            let ps_elem_inner_holder = document.createElement('div');
            ps_elem_inner_holder.setAttribute('class', 'ps_elem_inner_holder');
            if (key === 'status'){
              if (value === 'open'){
                  port_scanning_elem.innerHTML = `<span>${key}</span> : <span style='color: green'>${value}</span>`;
                  ps_elem_inner_holder.appendChild(port_scanning_elem);
              } else {
                 port_scanning_elem.innerHTML = `<span>${key}</span> : <span style='color: red'>${value}</span>`;
                 ps_elem_inner_holder.appendChild(port_scanning_elem);
              }
            } else {
                port_scanning_elem.innerHTML = `<span>${key}</span> : <span>${value}</span>`;
                ps_elem_inner_holder.appendChild(port_scanning_elem);
            }


            port_scanning_res_div.appendChild(ps_elem_inner_holder);
          });


          c++;
        }*/
        if (services_status_data[0]){
              let c = 0;
              let port_scanning_res_div = document.createElement('div');
              port_scanning_res_div.setAttribute('class', 'port_scan_holder_div');

              while (c < ps_indx) {
                let port_scanning_elem = document.createElement('div');
                port_scanning_elem.setAttribute('class', 'port_scan_element');

                Object.entries(services_status_data[c]).forEach(([key, value]) => {
                  let spanColorStyle = '';

                  if (key === 'status') {
                    spanColorStyle = (value === 'open') ? 'color: green' : 'color: red';
                  } else if (key === 'number') {
                    key = 'port number';
                  }

                  port_scanning_elem.innerHTML += `<div><span>${key}</span> : <span style='${spanColorStyle}'>${value}</span></div>`;
                });

                port_scanning_res_div.appendChild(port_scanning_elem);
                c++;
              }

              port_scanning_res_parag.appendChild(port_scanning_res_div);
      } else {
        // when the back-end returned nothing, we can say that the host name is not reachable.
          port_scanning_res_parag.innerHTML = `<div><span class='port_scanner_error_header'>This Host name or ip address is not found, or we can't reach it at this time. try another one or try again later.</span></div>`;
      }
        //re enabling the button.
        setIsButtonDisabled(false);
      } catch (error) {
        alert(error);
      }

    }

    return(
        <>
            <NavBarChild />
            <div className='main_container'>
            <div className='middle_div_holder'>
            <div className='target_scan_container'>

              <div className='target_scan_subcontainer'>
                  <p>This web based port scanner will test whether common ports are open on a server.
                      Useful in determining if a specific service (e.g. HTTP) is up or down on a specific server.
                      Ports scanned are: 21, 22, 23, 25, 80, 110, 139, 143, 445, 1433, 1521, 3306 and 3389
                  </p>
                  <form className='port_scan_form' onSubmit={scan_target_ports}>
                    <p>Provide the ip address of your target, or the domain name of a web server.</p>
                    <input required id="target_to_scan"></input> <span>provide either ip address or domain name not both.</span>
                    <br/> <br/>
                    <button type='submit' disabled={isButtonDisabled} className='common_button'>{ isButtonDisabled ? "Loading target data..." : "Start Scanning"}</button>
                  </form>
                  </div>
                  <div id='port_scan_result_holder' className='ps_result_holder'></div>
                  </div>
                  </div>
              </div>
            <Footer />
        </>
    )
}
