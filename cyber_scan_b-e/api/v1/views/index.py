#!/usr/bin/env python3
""" the main indexs model """

from api.v1.views import app_views
from flask import jsonify, make_response, request, abort
import json
import uuid
import requests


# importing other models as needed bellow
from api.v1.models.system_check import check_status
from api.v1.models.security_risk_level import sec_risk_level
from api.v1.models.target_info_gathering import gather_target_info
from api.v1.models.shodan_dns_lookup import dns_lookup_details
from api.v1.models.forensic_ip_history import ip_address_history
from api.v1.models.target_port_scanner import scan_port
from api.v1.models.cve_search import vendors_affected_products
from api.v1.models.cve_search import vendors_affected # for afected vendors
from api.v1.models.cve_search import latest_30_new_cves
from api.v1.models.cve_search import search_by_cve_id
from api.v1.models.cve_search import get_cves_db_info

@app_views.route('/status', methods=['GET'],
                strict_slashes=False)
def status():
    """API status """
    system_status = check_status() # initial value of the system status
    if system_status == 0:
        return make_response({'sys_status': 'Success'}, 200)
    else:
        return make_response({'sys_status': 'Failed'}, 503)

@app_views.route('/security_level', methods=['POST'],
                strict_slashes=False)
def security_level():
    """ defines the security level of the client public network (mainelly based on his IP) """
    if not request.is_json:
        abort(404, 'Not a Json')
    # retrieves the data (client Ip address) from the request.
    client_ip = request.get_json()
    sec_details = sec_risk_level(client_ip['client_pub_ip'])
    return make_response({'security_details':sec_details}, 200)

@app_views.route('/target_info_gather', methods=['POST'],
                strict_slashes=False)
def target_data_gathering():
    """ retreaive generale sumerized data about a given target using popular search engines """
    if not request.is_json:
        abort(404, 'Not a json')
    # retreives the target_namefrom the client.
    target_name = request.get_json()['target_name']
    print('the target name is: {}'.format(target_name))

    # parsing the data from the models
    result_obj = gather_target_info(target_name)


    # returning the proper data as returnd from the model
    return make_response(result_obj, 200)

@app_views.route('/dns_lookup', methods=['POST'],
                strict_slashes=False)
def dns_lookup_view():
    """ retreives the dns type A of a given host name """
    if not request.is_json:
        abort(404, 'Not a JSON');
    provided_domain_name = []
    provided_domain_name.append(request.get_json()['domain_name']) # this was done because this function accepts a list of arguments
    #print(f'we have got: {provided_domain_name}')
    returned_data = dns_lookup_details(provided_domain_name)
    #print(f'we are returning: {returned_data}')
    return make_response(returned_data, 200)

@app_views.route('/ip_history', methods=['POST'],
                strict_slashes=False)
def ip_history():
    """ get a target ip address history """

    if not request.is_json:
        abort(404, 'Not a json')
    provided_host_name = request.get_json()['target_domain_name']

    # data processing was doneat the model level.
    returned_obj = ip_address_history(provided_host_name)

    return make_response(returned_obj, 200) # returning the object directely as it is from the model,
    # this means that we thust the data processing at the model level.

@app_views.route('/port_scanning', methods=['POST'],
                strict_slashes=False)
def port_scan():
    """ scan a target ip / host name for open ports """
    if not request.is_json:
        abort(404, 'Not a Json')
    target_host = request.get_json()['target_host']

    # processing the data via the corresponding model.
    returned_result = scan_port(target_host)

    #returning the resulted data.
    return make_response(returned_result, 200)

# This is for the CVEs endpoints.
# for these CVEs end-points we must check the boelean value of the returnd value first.
@app_views.route('/vendors_affected', methods=['GET'],
                strict_slashes=False)
def exploited_vendors():
    """ explore the past exploited Vendors """
    ret_vendors = vendors_affected() # retrieved vendors
    if (ret_vendors):
        return make_response(ret_vendors, 200)
    else:
        return make_response(jsonify({'error': 'Internal Server Error'}), 500)


@app_views.route('/vendors_affected_products', methods=['POST'],
                strict_slashes=False)
def targeted_vndr_prdct():
    """ explore the previouslyy exploited products of a given vendor. """
    if not request.is_json:
        abort(404, 'Not a json')
    supplied_vendor_name = request.get_json()['vendor_name']
    print(supplied_vendor_name)
    vendors_affecte_prods = vendors_affected_products(supplied_vendor_name)
    if (vendors_affecte_prods):
        return make_response(vendors_affecte_prods, 200) # the data was already returned in json
    else:
        return make_response(jsonify({'error': 'Internal Server Error'}), 500)


@app_views.route('/last_added_cves', methods=['GET'],
                strict_slashes=False)
def last_cves():
    """ Explore the latest added CVEs including CAPEC, CWE and CPE expansions. """
    last_cves_list = latest_30_new_cves()
    if last_cves_list:
        return make_response(last_cves_list, 200)
    else:
        return make_response(jsonify({'error': 'Internal Server Error'}), 500)


@app_views.route('/search_cve_by_id', methods=['POST'],
                strict_slashes=False)
def search_cve_id():
    """ Search our database by cve_id. """
    if not request.is_json:
        abort(404, 'Not a JSON')
    supplied_cve_id = request.get_json()['cve_id']
    ret_cve_details = search_by_cve_id(supplied_cve_id)
    if (ret_cve_details):
        return  make_response(ret_cve_details, 200)
    else: # this means that the request at the model level has failed.
        return make_response(jsonify({'error': 'Internal Server Error'}), 500)

@app_views.route('/cve_db_infos', methods=['GET'],
                strict_slashes=False)
def current_dbs_infos():
    """ get the current database Informations. """
    db_result_data = get_cves_db_info()
    if (db_result_data):
        return make_response(db_result_data, 200)
    else:
        return make_response(jsonify({'error': 'Internal Server Error'}), 500)

# adding the register view end-point
 # to be done later


# adding the login view end-point
@app_views.route('/login', methods=['POST'],
                strict_slashes=False)
def handle_login():
    """ this function handles the mock login (for now only one user is allowed and the creds are hardcoded) \
        this was done because of time constrainghts but must be removed and replaced with a real auth system later."""
    # no model was created for this endpoint.
    if not request.is_json:
        abort(404, 'not a Json')
    # now checking the plain text value of the predetermined password
    supplied_data = request.get_json()

    supplied_email_username = supplied_data['hard_username']
    supplied_password = supplied_data['hard_password']

    hard_password = 'admin20240711'
    hard_username = 'cyber_admin'
    hard_email = 'admin@cyberscanamch.com' 

    if (supplied_email_username == hard_email or supplied_email_username == hard_username):
        if supplied_password == hard_password:
            """ now we authenticate the user """
            return make_response(jsonify({'login_status': 'accepted'}), 200)
        else:
            return make_response(jsonify({'login_status': 'refused'}), 200)

    else:
        return make_response(jsonify({'login_status': 'refused'}), 200)
