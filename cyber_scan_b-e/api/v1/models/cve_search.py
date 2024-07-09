#!/usr/bin/env python3
""" This model hanldes the CVE operations, for example the retrieval of a given cve details,
    and the latest added vulnerabilitied to the public cve database. as well as the available
    products under a given vendor or product name. and many more as defined under.
    => this model is based on a public API of cve-search and it is operated by CIRCL.(Computer Incident Response Center Luxembourg)
    """

import requests
import os # this is to ge the API key, but wont be used for this because the CIRCL api is public and open.
import json

""" This module will contain the following function:
    -> to see the vendors that have security vulnerabilities discovered in then.
    -> to se the products of the previous mentioned vendors, that has the security vulnerabilities
        discovered in them.
    -> to see the latest 30 discovered vulnerabilities
    -> to search for a vulnerability by CVE-ID
    -> to get more informations about the curent vulnerabilities databases. (the ones used in this system)."""


def vendors_affected():
    """ retreive the general affected vendors """
    base_url = 'https://cve.circl.lu/api/browse'
    try:
        api_res = requests.get(base_url)
        data = api_res.content.decode('utf-8')
        data_json = json.loads(data)
        return data_json['vendor'] # this is a list of 33703 element as of 8July2024 22:18:40
    except requests.exceptions.HTTPError as error:
        print(error)
        return False
    except requests.exceptions.RequestException as error:
        print(error)
        return False




def vendors_affected_products(supplied_vendor):
    """ the affected vendors products """
    if not supplied_vendor:
        # the supplied)vendors can't be empty
        return False

    base_url = 'https://cve.circl.lu/api/browse/' + str(supplied_vendor)

    try:
        api_res = requests.get(base_url)
        data = api_res.content.decode('utf-8')
        data_json = json.loads(data)
        return data_json['product']
    # we dont check for the api level errors since the requests has that under HTTPError (not like some thirdt party libraries)
    except requests.exceptions.HTTPError as error:
        print(error)
        return False
    except requests.exceptions.RequestException as error:
        print(error)
        return False


def latest_30_new_cves():
    """ tha latest 5 registered CVEs in the CIRCL databases, including CAPEC, CWE and CPE expansions """
    base_url = 'https://cve.circl.lu/api/last'

    try:
        api_res = requests.get(base_url)
        data = api_res.content.decode('utf-8')

        # in this function we will implement some kind of pagination.
        # we will write data to a json file we overwrite each time, then we make the pagination calls to it.
        # because this service has a defined responses limit. we will show 30 pages each as one response from the rest api

        # because of the large data being handles (about 1.5MBof text) we must implement a pagination logic.

        # -->Update:  the pagination logic will be skipped for time constrainght reasons.

        """limited_data_obj = []
        i = 0
        while i < 5:
            limited_data_obj.append(data[i])
            i = i + 1"""
        #final_data = json.loads(str(limited_data_obj))
        return json.loads(data)
    # we dont check for the api level errors since the requests has that under HTTPError (not like some thirdt party libraries)
    except requests.exceptions.HTTPError as error:
        print(error)
        return False
    except requests.exceptions.RequestException as error:
        print(error)
        return False
    return


def search_by_cve_id(cve_id):
    """ search for vulnerability by it's CVE-ID """

    # in here we don't check the cve_id because it would be checked by the inxex views.
    base_url = 'https://cve.circl.lu/api/cve/' + str(cve_id)
    try:
        res = requests.get(base_url)
        data = res.content.decode('utf-8')
        data_json = json.loads(data)
        return data_json
    except requests.exceptions.RequestException as error:
        print(error)
        return False
    except requests.exceptions.HTTPError as error:
        print(error)
        return False


def get_cves_db_info():
    """ to get more informations about the current vulnerability Database. """
    base_url = 'https://cve.circl.lu/api/dbInfo'
    try:
        res = requests.get(base_url)
        data = res.content.decode('utf-8')
        data_json = json.loads(data)
        return data_json
    except requests.exceptions.RequestException as error:
        print(error)
        return False
    except requests.exceptions.HTTPError as error:
        print(error)
        return False




if __name__ == "__main__":
    """ direct invocation """
    # the affected vendors list;
    """ aff_vendors = vendors_affected()
    if aff_vendors :
        print('the vindors is of type: {}'.format(aff_vendors.__class__))
        print('list length: {}'.format(len(aff_vendors)))
        print(aff_vendors) """

    # the vendors affected products.
    """last_cves = latest_30_new_cves()
    if last_cves:
        print('the vindors is of type: {}'.format(last_cves.__class__))
        print('list length: {}'.format(len(last_cves)))
        print('the first elemnt of the list is: {}'.format(last_cves))"""
    #cve ID.
    """cve_id = 'CVE-2024-21413'
    RES = search_by_cve_id(cve_id)
    if RES:
        print('data about that cve is: {}'.format(RES.keys())) """
    # current DB informations
    RES = get_cves_db_info()
    if RES:
        print('the data are: {}'.format(RES))
