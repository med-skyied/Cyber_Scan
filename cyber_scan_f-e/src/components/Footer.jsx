import React from "react";
import '../App.css'
import axios from 'axios';

function Footer() {

    function sys_status() {
        const apiEndPoint = 'http://localhost:5000/api/v1/';
        axios.get(apiEndPoint.concat('/status')).then(res => {
          //api responds correctelly
          let status = res.data['sys_status']
          //console.log(status)
          if (status === "Success"){
            // set the status to sustem is okay
            //console.log('inside success')
            let status_parag = document.getElementById('status_holder');
            status_parag.innerHTML = '<span class="system_status_ok" style="color: #00FF00;">&nbsp;All systems are operational.</span>'
            let dot_holder = document.getElementById('status_dot');
            dot_holder.innerHTML = '<div class="green-dot"></div>';
          }
          else {
            console.log("api errors were found");
            let status_parag = document.getElementById('status_holder');
            status_parag.innerHTML = '<span class="system_status_failed" style="color: red">&nbsp;API endpoints are not responding.</span>' ;
            let dot_holder = document.getElementById('status_dot');
            dot_holder.innerHTML = '<div class="red-dot"></div>';
          }
        }).catch(error => {
          //erors in the api
          console.log("api errors were found");
          let status_parag = document.getElementById('status_holder');
          status_parag.innerHTML = '<span class="system_status_failed" style="color: red">&nbsp;API endpoints are not responding.</span>' ;
          let dot_holder = document.getElementById('status_dot');
          dot_holder.innerHTML = '<div class="red-dot"></div>';
        })
    }

    return (
        <>
          {sys_status()}
            <div className="Footer">

                <span className='sys_status_txt'>System Status: </span> <div id='status_dot'></div><div id='status_holder'></div>

            </div>
        </>
    )
}
export default Footer
