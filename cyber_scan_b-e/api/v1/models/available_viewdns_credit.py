#!/usr/bin/env python3
""" the available credit of the curresponding view dns account """

import os
import requests
import json

def available_credit():

    view_dns_api = os.getenv('VIEW_DNS_KEY')
    try:
        full_url = 'https://api.viewdns.info/account/?action=balance&apikey=' + str(view_dns_api) + '&output=json'
        print('the full url is: {}'.format(full_url))
        res = requests.get(full_url, stream=False)
        data = res.content.decode('utf-8')
        json_data = json.loads(data)
        return json_data
    except requests.exceptions.HTTPError as e:
        print('Error occured: {}'.format(e))
    except requests.exceptions.RequestException as re:
        print('Error occured: {}'.format(re))

if __name__ == "__main__":
    """ the entry if executed as a direct script """
    credit = available_credit()
    print(credit)
