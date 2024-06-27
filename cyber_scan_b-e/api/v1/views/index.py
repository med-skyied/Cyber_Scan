#!/usr/bin/env python3
""" the main indexs model """ 

from api.v1.views import app_views
from flask import jsonify, make_response, request, abort
import json
import uuid
import requests

# importing other models as needed bellow
from api.v1.models.system_check import check_status

@app_views.route('/status', methods=['GET'], 
                strict_slashes=False)
def status():
    """API status """
    system_status = check_status() # initial value of the system status
    if system_status == 0:
        return make_response({'sys_status': 'Success'}, 200)
    else:
        return make_response({'sys_status': 'Failed'}, 503)