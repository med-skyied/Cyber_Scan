#!/usr/bin/env python3
""" this module handles the inforamtion gathering about a
    target(a person or an intety) online. this is important as a phase in info sec """

from shodan import  Shodan
import os
import requests
import shodan
import json

def gather_target_info(supplied_target):
    """ retreives general informations about a given target based on Google search engine """
    #shodan_api = os.getenv('SHODAN_API')
    surper_api = os.getenv('SURPER_API_KEY')
    print(surper_api)
    try:
        base_url = 'https://google.serper.dev/search' # using the google surper API as entry
        payload = json.dumps({
          "q": "apple inc"
        })
        headers = {
            'X-API-KEY' : str(surper_api),
            'Content_Type' : 'application/json'
        }
        res = requests.request("POST", base_url, headers=headers, data={'q': str(supplied_target)})
        data = res.text
        data_obj = json.loads(data)
        # first we get the available keys for that search.
        keys_list = []
        for key in data_obj.keys():
            keys_list.append(key)
        # available keys list
        print(keys_list)

        # we have search parameters and organic always apear (we construct theire separet objects)

        organic_objec = data_obj['organic']
        search_params =  data_obj['searchParameters']
        images_obj = {}
        top_stories_obj = {}

        # now we distinguish for other usefull keys(if they exist) like ('images', 'topStories', '')
        # so we will look for two additional keys wich are: 'images' and 'topStories'
        # we need to be carefull at the client level parsing, so we can ignorte these two additional keys
        # if they don't exist. but the 'organic' and 'searchParameters' do always exist in the response. so be notified/.

        i = 0
        while i < len(keys_list):
            if keys_list[i] == 'images':
                images_obj = data_obj[keys_list[i]]
            #    print('images is of type: {}'.format(images_obj.__class__))
                print('we got images')
            elif keys_list[i] == 'topStories':
                top_stories_obj = data_obj[keys_list[i]]
                print('we got top stories')
            i = i + 1


        # for now we should have  4 objects ['images_obj', 'top_stories_obj', 'organic_objec', 'search_params']
        # we will construct one object with those keys and there corresponding values as the above objects

        # because of the used keys are already identified and are few (only 4 keys), we will do the assignement operation manually

        final_obj = {'organic_obj': organic_objec, 'search_params_obj':search_params ,'images_obj':images_obj, 'top_stories_obj': top_stories_obj}

        # testing the final object.
        for key in final_obj:
            print('key name: {}, type: {}'.format(key, final_obj[key].__class__))

        # at the front end level we should evaluate the value of each key not it's type.
        # at the front-end we should check for the value non equal to None or null
        
        return final_obj # this should be the properly formatted data set
    except requests.exceptions.HTTPError as e:
        print('Error occured: {}'.format(e))
    except requests.exceptions.RequestException as re:
        print('Error occured: {}'.format(re))

if __name__ == "__main__":
    """ the entry if executed as a direct script """
    supplied_target = 'auvaservices.com'
    print('gathering info about: {}'. format(supplied_target))
    res = gather_target_info(supplied_target)
