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
