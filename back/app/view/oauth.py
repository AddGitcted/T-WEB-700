
from flask import request, Blueprint
from flask_cors import  cross_origin
import json

from jwt_handler import encode_jwt
from view.user import User

app = Blueprint('auth', __name__, url_prefix='/user')

@app.route('/auth/<provider>', methods = ['GET'])
@cross_origin()
def get_user_by_provider(provider):
    """
    get user by provider id

    Args:
        provider (str): provider name
    """
    try:
        body = request.get_json()
        if provider != 'google':
            return 'provider not supported', 400
        user = User.objects(user_id_google=body['user_id_google']).first()
        if user == None:
            return 'user not found', 404
        return encode_jwt(json.loads(user.to_json())), 200
    except Exception as e:
        return {"error" : str(e)}, 500

@app.route('/auth/<provider>/callback', methods = ['GET'])
@cross_origin()
def get_user_by_provider_callback(provider):
    """
    get user by provider id

    Args:
        provider (str): provider name
    """
    try:
        body = request.get_json()
        if provider != 'google':
            return 'provider not supported', 400
        user = User.objects(user_id_google=body['user_id_google']).first()
        if user == None:
            return 'user not found', 404
        return encode_jwt(json.loads(user.to_json())), 200
    except Exception as e:
        return {"error" : str(e)}, 500