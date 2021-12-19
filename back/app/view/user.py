
from flask import request, Blueprint
from flask_cors import  cross_origin
from view import db
from jwt_handler import encode_jwt, decode_jwt

import json

app = Blueprint('users', __name__, url_prefix='/user')


from flask_cors import CORS

CORS(app)
CORS(app, resources={r"*": {"origins": "*"}})

class User(db.Document):
    username = db.StringField()
    email = db.StringField()
    password = db.StringField()
    currency = db.StringField()
    preferences = db.ListField()
    role = db.StringField()
    user_id_google = db.StringField()

@app.route('/register', methods = ['POST'])
@cross_origin()
def create_user():
    """
    create a new user

    Returns:
        dict: user data
    """
    body = request.get_json()
    try:
        if User.objects(email=body['email']).first() is not None:
            return {'error': 'User already exists'}, 400
        if "user_id_google" not in body:
            body["user_id_google"] = ""
        user = User(
            username=body['username'],
            email=body['email'],
            password=body['password'],
            preferences=body["preferences"],
            role=body["role"],
            currency=body["currency"],
            user_id_google=body["user_id_google"]
        ).save()
        return encode_jwt(json.loads(user.to_json())), 200
    except Exception as e:
        return {'error': str(e)}, 500

@app.route('/login', methods = ['POST'])
@cross_origin()
def login_user():
    """
    login user

    Returns:
        dict: token of the user
    """
    body = request.get_json()
    try:
        user = User.objects(email=body['email'], password=body['password']).first()
        if user is not None:
            return encode_jwt(json.loads(user.to_json())), 200
        return {'error': 'Password or login incorrect'}, 404
    except Exception as e:
        return {'error': str(e)}, 500

@app.route('/logout', methods = ['POST'])
@cross_origin()
def logout_user():
    """
    logout user

    Returns:
        dict: status
    """
    return {'message': 'Logout successful'}, 200

@app.route('/profile', methods = ['GET'])
@cross_origin()
def profile_user():
    """
    get user profile

    Returns:
        dict: user data
    """
    header = request.headers.get('token')
    try:
        if decode_jwt(header) is None:
            return {'error': 'Invalid token'}, 401
        user = User.objects(id=decode_jwt(header)['_id']).first()
        if user is None:
            return {'error': 'User not found'}, 404    
        return user.to_json(), 200
    except Exception as e:
        return {'error': str(e)}, 500

@app.route('/profile', methods = ['PUT'])
@cross_origin()
def profile_user_update():
    """
    udpate user profile

    Returns:
        dict: user data
    """
    header = request.headers.get('token')
    try:
        if decode_jwt(header) is None:
            return {'error': 'Invalid token'}, 401
        user = User.objects(id=decode_jwt(header)['_id']).first()
        if user is None:
            return {'error': 'User not found'}, 404
        body = request.get_json()
        user.update(
            username=body['username'],
            email=body['email'],
            password=body['password'],
            preferences=body["preferences"],
            role=body["role"],
            currency=body["currency"]
        )
        return User.objects(id=decode_jwt(header)['_id']).first().to_json(), 200
    except Exception as e:
        return {'error': str(e)}, 500

@app.route('/profile', methods = ['DELETE'])
@cross_origin()
def profile_user_delete():
    """
    delete user profile

    Returns:
        dict: status
    """
    header = request.headers.get('token')
    try:
        if decode_jwt(header) is None:
            return {'error': 'Invalid token'}, 401
        user = User.objects(id=decode_jwt(header)['_id']).first()
        if user is None:
            return {'error': 'User not found'}, 404
        user.delete()
        return {'message': 'User deleted'}, 200
    except Exception as e:
        return {'error': str(e)}, 500