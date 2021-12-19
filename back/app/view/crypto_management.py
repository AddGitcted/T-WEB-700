

from flask import request, Blueprint
from flask_cors import  cross_origin, CORS
from view import db
from jwt_handler import decode_jwt

import json

app = Blueprint('cryptosManagement', __name__)

CORS(app)
CORS(app, resources={r"*": {"origins": "*"}})

class CryptoList(db.Document):
    name = db.StringField()
    idName = db.StringField()
    icone = db.StringField()


def get_crypto_by_name(name):
    return CryptoList.objects(idName=name).first().to_json()

@app.route('/cryptoManagement/', methods = ['POST'])
@cross_origin()
def create_crypto():
    """
    Create a new crypto

    Returns:
        dict: new crypto
    """
    body = request.get_json()
    try:
        if (decode_jwt(request.headers.get('token'))["role"] != "Admin"):
            return {'error': "invalid token or don't have permission"}, 403
        else:
            crypto = CryptoList(
                name=body['name'],
                idName = body['idName'],
                icone = body['icone']
            ).save()
            return json.loads(crypto.to_json()), 201
    except Exception as e:
        return json.dumps({"error": str(e)}), 500

@app.route('/cryptoManagement/<id>', methods = ['PUT'])
@cross_origin()
def update_crypto(id):
    """
    Update a crypto

    Args:
        id (mongodb id): id of the crypto to update

    Returns:
        dict : updated crypto
    """
    body = request.get_json()
    try:
        if (decode_jwt(request.headers.get('token'))["role"] != "Admin"):
            return {'error': "invalid token or don't have permission"}, 403
        else:
            crypto_list = CryptoList.objects(id=id).first()
            crypto_list.update(
                name=body['name'],
                idName = body['idName'],
                icone = body['icone']
            )
            return json.loads(CryptoList.objects(id=id).first().to_json()), 200
    except Exception as e:
        return json.dumps({"error": str(e)})

@app.route('/cryptoManagement/<id>', methods = ['DELETE'])
@cross_origin()
def delete_crypto(id):
    """
    delete a crypto

    Args:
        id (mongodb id): id of the crypto to delete

    Returns:
        dict: {"message" : "deleted"}
    """
    try:
        if (decode_jwt(request.headers.get('token'))["role"] != "Admin"):
            return {'error': "invalid token or don't have permission"}, 403
        else:
            crypto_list = CryptoList.objects(id=id).first()
            crypto_list.delete()
            return {"message" : "deleted"}, 200
    except Exception as e:
        return json.dumps({"error": str(e)})

@app.route('/cryptoManagement/', methods = ['GET'])
@cross_origin()
def get_cryptos():
    """
    Get all cryptos

    Returns:
        List of object: List of cryptos
    """
    try:
        res = []
        for object in json.loads(CryptoList.objects().to_json()):
            res.append(object)    
        return {"cryptos" : res}, 200
    except Exception as e:
        return json.dumps({"error": str(e)})


@app.route('/cryptoManagement/<id>', methods = ['GET'])
@cross_origin()
def get_crypto(id):
    """
    Get all cryptos

    Returns:
        List of object: List of cryptos
    """
    try:
        return json.loads(CryptoList.objects(id=id).first().to_json()), 200
    except Exception as e:
        return json.dumps({"error": str(e)})
