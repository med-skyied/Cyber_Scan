#!/usr/bin/env python3
""" this model uses an external api to scan for 
    open known ports on a given target """

import requests
import json
import os

def port_scanner(hostname):
    """ scans targets open ports, using an API """

    api_key = os.getenv('VIEW_DNS_KEY')
    host = hostname
    full_url = 'https://api.viewdns.info/portscan/?host='+ host +'&apikey='+ api_key + '&output=json'
    print(full_url)
    try:
        res = requests.get(full_url)
        data = json.loads(res.content.decode('utf-8'))
        print(data)
    except requests.exceptions.RequestException as e:
        return print('request error occured: {}'.format(e))
    except requests.exceptions.HTTPError as e:
        return print('http error occured: {}'.format(e))

if __name__ == "__main__":
    hostname = 'cnn.com'
    port_scanner(hostname)