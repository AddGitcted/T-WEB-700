import jwt
import json
from datetime import datetime, timedelta


def encode_jwt(user):
    """
    Encode jwt

    Args:
        user (dict): user data

    Returns:
        token: jwt token of the user
    """
    dt = datetime.now() + timedelta(days=2)     
    return {"token" : jwt.encode({
            "currency" : user["currency"],
            "preferences" : user["preferences"],
            "role" : user["role"],
            "_id" : user["_id"]["$oid"],
            'exp': dt
        },'secret', algorithm='HS256')}

def decode_jwt(token):
    """
    decode jwt

    Args:
        user (token): user token

    Returns:
        dict: user data store in the token
    """
    try:
        return jwt.decode(token, 'secret', algorithms=['HS256'])
    except jwt.ExpiredSignatureError as e:
        return None
    except jwt.InvalidTokenError as e:
        return None