#!/usr/bin/env python3
""" this module handles the retreival of the services
    found at a target IP address, using the shodan API"""

import os
import requests
import json

def ip_address_history(supplied_hostname):
    """ retreives services found at a host IP address """
    view_dns_api = os.getenv('VIEW_DNS_API')
    print(view_dns_api)

    ip_history_base_url = 'https://api.viewdns.info/iphistory/?domain='
    full_url =  str(ip_history_base_url) + str(supplied_hostname) + '&apikey='  + str(view_dns_api) + '&output=json'
    print('full url: {}'.format(full_url))
    try:
        res = requests.get(full_url)
        data = res.content.decode('utf-8')
        final_data = json.loads(data)
        # now parsing the data to return a valid response, + constructing the error handelling of the response.

    except requests.exceptions.RequestException as e:
        print('error occured: {}'.format(e))
        return {'data': e}
    except requests.exceptions.HTTPError as e:
        print('error occured: {}'.format(e))
        return {'data': e}

if __name__ == "__main__":
    """ the entry if executed as a direct script """
    domain_name= 'auvaservices.com' # cnn hostname
    res = ip_address_history(domain_name)
    print(res.__class__)
    print(res)
