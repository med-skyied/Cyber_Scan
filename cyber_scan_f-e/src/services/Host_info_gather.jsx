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
        images_result_parag.innerHTML = ``;
        top_stories_parag.innerHTML = ``;


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
        //console.log(oindx);

        let organicDiv = document.createElement('div');

        organic_result_parag.innerHTML = `<p class='appended_header'>Here are some usefull serch results Pages arround the web.</p>`;
        //console.log(organicResponseData);
        while (i < oindx){

          let organicItem = organicResponseData[i];
          let organicDiv = document.createElement('div');
          organicDiv.setAttribute('class', 'organicResultDiv');

          Object.entries(organicItem).forEach(([key, value]) => {
            if (key === 'title' && organicItem['link']) {
              // create a link element for the title
              let titleLink = document.createElement('a');
              titleLink.setAttribute('target', '_blank');
              titleLink.setAttribute('href', organicItem['link']);
              titleLink.textContent = value;
              organicDiv.appendChild(titleLink);
            }
          });

          // Check for snippet
          if (organicItem['snippet']) {
            // Create a paragraph for the snippet
            let snippetParagraph = document.createElement('p');
            snippetParagraph.textContent = organicItem['snippet'];
            organicDiv.appendChild(snippetParagraph);
          }

          // Append the organicDiv to organic_result_parag
          organic_result_parag.appendChild(organicDiv);

          i++;
        }

        // now we gonna handle the images
        let imagesResponseData = ret_data['images_obj'] // the same thing will be done for top stories.

        if (imagesResponseData['status'] === 'OK') {
          // in here we have images as a result
          images_result_parag.innerHTML = `<div><p class='appended_header'>Related Images / photos of the target</p> </div>`;
          let images_data = imagesResponseData['data'];
          let imagesindx = images_data.length;
          console.log('we have images');
          //console.log(images_result_parag);
          //let imagesDiv = document.createElement('div');
          let j  = 0;

          let images_s_div = document.createElement('div');
          images_s_div.setAttribute('class', 'images_inner_holder');
          while (j < imagesindx) {
            let imagesDiv = document.createElement('img');
            let images_holder_div = document.createElement('div');
            images_holder_div.setAttribute('class', 'images_place_holder')
            //console.log('we got those images: ');
            Object.entries(images_data[j]).forEach(([key, value]) => {
              if(key === 'imageUrl'){
                //console.log(value);
                imagesDiv.setAttribute('class', 'image_cls');
               // imagesDiv.innerHTML =`<img class='image_cls' alt='search result' src='${images_data[i]}'>` ;
                imagesDiv.setAttribute('alt', 'search related image');
                imagesDiv.setAttribute('src', value);

                images_holder_div.appendChild(imagesDiv);
              }

            });
            images_s_div.appendChild(images_holder_div);
            images_result_parag.appendChild(images_s_div);
            j++;
          }


        } else{
          // in here we dont have images as a result
          console.log('no images are returned from the search');

        }

        // now we hanlde the topstories object.

        let topStoriesResponseData = ret_data['top_stories_obj'];


        if (topStoriesResponseData['status'] === 'OK') {
          // we have top stories returned from the back-end
          top_stories_parag.innerHTML = `<p class='appended_header'>Related Top Stories arround the internet:</p>`;
          let topstories_data = topStoriesResponseData['data'];
          console.log('we have top stories');
          // top stories handelling
          let topStoriesIndx = topStoriesResponseData['data'].length;
          console.log('topstories length is: ' + topStoriesIndx);
          let f = 0;

          let topStoriedDiv = document.createElement('div');
          topStoriedDiv.setAttribute('class', 'top_stories_holder_div');
          while (f < topStoriesIndx){

            let top_stories_elem = document.createElement('div'); // title, link imageUrl, source, date
            top_stories_elem.setAttribute('class', 'topstory_res_elem');

              Object.entries(topstories_data[f]).forEach(([key, value]) => {
                if (key === 'title'){
                  // we gonna take the title key and create the element with the rest of other files.
                  top_stories_elem.innerHTML = `<a href='${topstories_data[f]['link']}' target='_blank'>${value}</a><img
                  class='topstoris_image_elem' alt='top stories related image' src='${topstories_data[f]['imageUrl']}'>
                  <p>date: ${topstories_data[f]['date']}</p>
                  <p>source: ${topstories_data[f]['source']}</p>`;
                  topStoriedDiv.appendChild(top_stories_elem);

                  top_stories_parag.appendChild(topStoriedDiv); // appending to the main paragraph div.
                }
                else{
                  // do nothing.
                }
              });
            f++;
          }
        } else {
          // no top_stories result are returned by the back end.
          console.log('no top stories are returned from the search');
        }








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
                        <button type="submit" disabled={isButtonDisabled} className='common_button'>{ isButtonDisabled ? 'Loading data ...' : 'Search the web and summorize '}</button>
                    </form>
                  </div>
                  <div className='results_info_gather'>
                    <div id='search_params_overview_res' className="search_overview_res_gather"></div>
                    <div id='organic_search_res' className="organic_search_res"></div>
                    <div id='images_search_res' className='images_search_prgf'></div>
                    <div id='top_stories_search_res'></div>
                  </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
