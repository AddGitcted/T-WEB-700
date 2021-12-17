
from flask import request, Blueprint
from flask_cors import  cross_origin
from view import db
from jwt_handler import decode_jwt

import json

app = Blueprint('cryptosManagement', __name__, url_prefix='/cryptoManagement')


class CryptoList(db.Document):
    name = db.StringField()
    idName = db.StringField()
    icone = db.StringField()

def get_crypto_by_name(name):
    return CryptoList.objects(idName=name).first().to_json()

@app.route('/', methods = ['POST'])
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
            return crypto.to_json(), 201
    except Exception as e:
        return json.dumps({"error": str(e)})

@app.route('/<id>', methods = ['PUT'])
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
            return CryptoList.objects(id=id).first().to_json(), 200
    except Exception as e:
        return json.dumps({"error": str(e)})

@app.route('/<id>', methods = ['DELETE'])
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

@app.route('/', methods = ['GET'])
@cross_origin()
def get_cryptos():
    """
    Get all cryptos

    Returns:
        List of object: List of cryptos
    """
    try:
        return CryptoList.objects().to_json(), 200
    except Exception as e:
        return json.dumps({"error": str(e)})