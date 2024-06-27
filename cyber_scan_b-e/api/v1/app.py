#!/usr/bin/env python3
""" the API entry point """

from flask_cors import CORS
from flask import Flask, jsonify, make_response, abort, request
from api.v1.views import app_views
from flask_sqlalchemy import SQLAlchemy
from os import getenv

app = Flask(__name__)
app.url_map.strict_slashes = False
cors = CORS(app, resources={r'/*': {'origins': '*'}})

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://cybers:cyberpassword@localhost/cyber_scan'


if __name__ == "__main__":
    app.register_blueprint(app_views, url_prefix='/api/v1')

    @app.errorhandler(404)
    def not_found(e):
        return make_response({'error': "Not Found"}, 404)

    app.run('0.0.0.0', '5000', threaded=True)