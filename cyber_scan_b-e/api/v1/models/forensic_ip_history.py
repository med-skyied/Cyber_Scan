#!/usr/bin/env python3
""" this module handles the retreival of the IP history
    of a given target host name (domain name)"""

import os
import requests
import json

def ip_address_history(supplied_hostname):
    """ retreives the history of a given ip or host name """
    view_dns_api = os.getenv('VIEW_DNS_KEY')
    print(view_dns_api)

    ip_history_base_url = 'https://api.viewdns.info/iphistory/?domain='
    full_url =  str(ip_history_base_url) + str(supplied_hostname) + '&apikey='  + str(view_dns_api) + '&output=json'
    print('full url: {}'.format(full_url))
    try:
        res = requests.get(full_url)
        data = res.content.decode('utf-8')
        final_data = json.loads(data)
        # now parsing the data to return a valid response, + constructing the error handelling of the response.

        # we needto process the data and hanlde errors befour we return it
        return final_data
    except requests.exceptions.RequestException as e:
        print('error occured: {}'.format(e))
        return {'data': e}
    except requests.exceptions.HTTPError as e:
        print('error occured: {}'.format(e))
        return {'data': e}

if __name__ == "__main__":
    """ the entry if executed as a direct script """
    domain_name= 'x.com'
    res = ip_address_history(domain_name)
    print(res.__class__)
    print(res)
