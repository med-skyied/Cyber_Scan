#!/usr/bin/env python3
""" this module handles the dns resolver functionality of the system
    (the host names)"""


import os
import requests
import json

def host_details(supplied_domains):
    """ retreives the DNS resolvers for the supplied domain names.
        in the corresponding view, Check for the status_code object key.
         to define the next behaviour"""
    #
    # composing the request url, needs to add this query parameter: &key=Q5Ig4SGZltKo2QcnTGoVavmYvnmsqbbM
    response = {}
    if supplied_domains.__class__ != list:
        response['status_code'] = 503
        return response
    response['status_code'] = 200

    shodan_key = os.getenv('SHODAN_API')
    viewdns_key = os.getenv('VIEW_DNS_KEY')

    # composing the domains_string (when providing more than one domain {not supported in viewdns api})
    hostnames = ''
    i = len(supplied_domains)
    j = 0
    while j < i:
        if j != (i - 1):
            hostnames = hostnames + str(supplied_domains[j]) + ','
            j = j + 1
        else:
            hostnames = hostnames + str(supplied_domains[j])
            j = j + 1

    #using the shodan API
    base_shodan_url = 'https://api.shodan.io/dns/resolve'
    shodan_url = str(base_shodan_url + '?hostnames=' + hostnames + '&key=' + str(shodan_key))

    #use the ViewDns API
    base_viewdns_url = 'https://api.viewdns.info/dnsrecord/?domain='
    viewdns_url = str(base_viewdns_url + hostnames +'&recordtype=A&apikey=' + viewdns_key + '&output=json')

    print(viewdns_url)
    try:
        # using the view dns api endpoint for API limitation reasons.
        res = requests.get(viewdns_url, stream=True)
        data = res.content.decode('utf-8')
        data_res = json.loads(data)
        print(data_res) # just printing for now.
    except requests.exceptions.RequestException as e:
        return print('request error occured: {}'.format(e))
    except requests.exceptions.HTTPError as e:
        return print('http error occured: {}'.format(e))

if __name__ == "__main__":
    """ the entry if executed as a direct script """
    # the shodan api supports a list of domain names, but view dns is not.
    # for now the script uses the view dns.
    supplied_domains= ['google.com']
    obj = host_details(supplied_domains)
    print(obj)
