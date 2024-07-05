import React from "react";
import '../App.css'
import axios from 'axios';

import NavBarChild from '../components/NavBarChild';
import Footer from '../components/Footer';

export default function HttpHeaders() {

    let shodan_header_api_end_point = 'https://api.shodan.io/tools/httpheaders?key=Q5Ig4SGZltKo2QcnTGoVavmYvnmsqbbM';

    async function HttpHeaders(){
        try{
            let res = await axios.get(shodan_header_api_end_point);
            let response_obj = res.data;
            //console.log(Object.keys(response_obj));

            let http_header_div_container = document.getElementById('http_header_container');

            //console.log(Object.keys(response_obj)[3]);

            let new_object = [];

            // processing the content of the response.
            let i = 0 ;
            while (i < Object.keys(response_obj).length) {

                if (Object.keys(response_obj)[i] === "Host"){
                    i = i + 1;
                } else{
                    new_object.push(
                        {
                            key: Object.keys(response_obj)[i],
                            value: response_obj[Object.keys(response_obj)[i]]
                        });
                    i = i +1;
                }
            }


            //populating the html object now.
            http_header_div_container.innerHTML = ``;
            new_object.forEach(element => {
                let div = document.createElement('div');
                div.setAttribute('class', 'http_headers_each_div');
                div.innerHTML = `<span class='header_key'>${element.key}</span> : <span class='header_value'>${element.value}</span> <br>`;

                http_header_div_container.appendChild(div);
            })


        } catch(error) {
            alert('Error occured: ' + error);
        }
    }

    {HttpHeaders()}

    return (
        <>
            <NavBarChild />
            <div className="main_container">
                <div className="http_headers">
                    <p>These are the HTTP headers that your client sends when connecting to a webserver.<br /><br /><span className='browser_data_reveal'> These are the Data your browser reveals about you:</span></p>

                    <div id='http_header_container'>
                        <span>Retreaving ....</span>
                    </div>

                </div>
            </div>
            <Footer />
        </>
    )
}
