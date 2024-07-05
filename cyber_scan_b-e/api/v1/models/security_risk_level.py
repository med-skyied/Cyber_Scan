#!/usr/bin/env python3
""" this module handles the Security/Risk Level of the client """

import requests
import os
import asyncio
import json

def sec_risk_level(client_ip):
    """ this defines the security, and the rist level of the user
    making the requests from the front-end application. using IPHUB api """

    ip_hub_api = os.getenv('IP_HUB_KEY')
    print(ip_hub_api)
    
    # definin the headers.
    headers = {'X-KEY' : ip_hub_api}
    # defining the request url.
    url = 'http://v2.api.iphub.info/ip/' + client_ip
    print(url)
    try:
        res = requests.get(url, headers=headers, stream=True)
        data = res.content.decode('utf-8')

        response_content = json.loads(data)
        final_sec_check = {}
        # we construct the final security check result object.
        # it will contain the following keys: isp, ipAddress, ristLevel, securityLevel, countryCode, countryName, asn.
        block_level = response_content['block']
       
        if block_level == 0:
            final_sec_check['securityLevel'] = 0
            final_sec_check['riskLevel'] = 0
        elif block_level == 1:
            final_sec_check['securityLevel'] = 1
            final_sec_check['riskLevel'] = 1
        elif block_level == 2:
            final_sec_check['securityLevel'] = 2
            final_sec_check['riskLevel'] = 2
        else:
            final_sec_check['securityLevel'] = None
            final_sec_check['riskLevel'] = None

        # populating the rest of the keys
        final_sec_check['asn'] = response_content['asn']
        final_sec_check['countryCode'] = response_content['countryCode']
        final_sec_check['ipAddress'] = response_content['ip']
        final_sec_check['countryName'] = response_content['countryName']
        final_sec_check['isp'] = response_content['isp']

        return final_sec_check
    except requests.exceptions.RequestException as e:
        return print('request error occured: {}'.format(e))
    except requests.exceptions.HTTPError as e:
        return print('http error occured: {}'.format(e))


if __name__ == '__main__':
    res = security_rist_level('8.8.8.8')
    print(res)
    