#!/usr/bin/env python
# -*- coding: utf-8 -*-

from view import APP

from flask import Response
from flask_cors import CORS, cross_origin

CORS(APP)

from view.user import app as user_blueprint
from view.crypto_management import app as crypto_management_blueprint
from view.crypto import app as crypto_blueprint
from view.press import app as press_blueprint
from view.oauth import app as oauth_blueprint

"""
note : https://pythonbasics.org/flask-mongodb/
"""

APP.register_blueprint(user_blueprint)
APP.register_blueprint(crypto_management_blueprint)
APP.register_blueprint(crypto_blueprint)
APP.register_blueprint(press_blueprint)
APP.register_blueprint(oauth_blueprint)

@APP.route('/ping', methods=['GET'])
@cross_origin()
def ping():
    return Response("pong",mimetype='text/html')

if __name__ == "__main__":
    """
    main
    """
    try :
        APP.run(host="0.0.0.0", port=8080, debug=True)
    except Exception as e:
        print(str(e))
        pass