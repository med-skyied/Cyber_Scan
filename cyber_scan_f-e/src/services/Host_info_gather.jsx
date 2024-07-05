import React from "react";
import '../App.css'
import axios from 'axios';
import {useState} from "react";

import NavBarChild from '../components/NavBarChild';
import Footer from '../components/Footer';

export default function HostInfoGather() {

    const [isButtonDisabled, setIsButtonDisabled] = useState(false); // fenabled by default
    async function gatherTargetInfos(event){
      event.preventDefault();
      // the api endpoint.
      let api_end_point = 'http://localhost:5000/api/v1/';
      let target_name_value = document.getElementById('target_name').value;


      // construction a target object
      let target_obj = {};
      target_obj['target_name'] = target_name_value;

      try {
        setIsButtonDisabled(true); //disabling the button.
        // defining the holders
        let search_overview_parag = document.getElementById('search_params_overview_res');
        let organic_result_parag = document.getElementById('organic_search_res');
        let images_result_parag = document.getElementById('images_search_res');
        let top_stories_parag = document.getElementById('top_stories_search_res');

        // clearing all the values holders.

        search_overview_parag.innerHTML = ``;
        organic_result_parag.innerHTML = ``;


        //making the api calls
        let response = await axios.post(api_end_point.concat('target_info_gather'), target_obj);
        setIsButtonDisabled(false);
        let ret_data = response['data'];
        //console.log(ret_data);  //logging the data [will be deleted later on]

        // parsing the content of the available divs one by one.
        // first with search params overview.
        let searchResponseData = ret_data['search_params_obj']
        // populating the search parameters holder


        for (let key in searchResponseData) {
          let searchDiv = document.createElement('div');
          searchDiv.setAttribute('class', 'searchParamsDiv');

          if (key === 'q') {
            searchDiv.innerHTML = `<span>Target name</span> : <span>${searchResponseData[key]}</span>`;
            search_overview_parag.appendChild(searchDiv);
          }
          else if (key === 'type') {
            searchDiv.innerHTML = `<span>Operation type</span> : <span>${searchResponseData[key]}</span>`;
            search_overview_parag.appendChild(searchDiv);
          }
          else {
            searchDiv.innerHTML = `<span>Search Engine</span> : <span>${searchResponseData[key]}</span>`;
            search_overview_parag.appendChild(searchDiv);
          }
        }
        // now with organic search.
        let organicResponseData = ret_data['organic_obj'];
        //console.log(organicResponseData); // this is of type keys_list
        //console.log("make sur it's of type list" + organicResponseData.length);

        let oindx = organicResponseData.length;
        let i = 0;
        console.log(oindx);

        let organicDiv = document
        while (i < oindx){
          for (let organicItem in organicResponseData[i]){
            console.log('one of the console log: ' + organicItem);
          }
          i = i +1;
        }



        // now we gonna handle the layout of the data


      } catch (error) {
        alert(error);
      };
    }

    return (
        <>
            <NavBarChild />
            <div className="main_container">
                <div className="host_infogather_container">
                <div className='host_infogather_subcontainer'>
                    <p>This tool permits you to gather inforamtions about your target, be it a company name or a person, a domain name or a place.
                    </p>
                    <p>The data shown in here are publically accesible via search engines. In this search we used optimized Google Search tool called Surper [a tool by google for developers.]</p>
                    <p>We should notify that this is real time data from search engines (mostly Google search engine).</p>
                    <form className='host_infogather_form' onSubmit={gatherTargetInfos}>
                        <p>Enter your target name or related infos:</p>
                        <input required id='target_name'></input> <br/> <br/>
                        <button type="submit" disabled={isButtonDisabled} >{ isButtonDisabled ? 'Loading data ...' : 'Search the web and summorize '}</button>
                    </form>
                  </div>
                  <div className='results_info_gather'>
                    <div id='search_params_overview_res'></div>
                    <div id='organic_search_res'></div>
                    <div id='images_search_res'></div>
                    <div id='top_stories_search_res'></div>
                  </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
