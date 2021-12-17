
from flask import request, Blueprint
from flask_cors import  cross_origin
from jwt_handler import encode_jwt, decode_jwt
from view.crypto_management import get_crypto_by_name

import re
import requests
import json
import sys
import os
from datetime import datetime, timedelta

app = Blueprint('crytpo', __name__, url_prefix='/cryptos')

if os.getenv('API_KEY') != None:
    API_KEY = os.getenv('API_KEY')
else:
    API_KEY = 'F8797586-827C-4877-858B-00B9F2112AB2'

@app.route('/', methods = ['GET'])
@cross_origin()
def get_all_crypto_data():
    """
    Get all crypto data from API

    Returns:
        dict: all crypto data
    """
    listOfCrypto = request.args.getlist("cmids")
    res = []
    try:
        currency = "EUR"
        for crypto in listOfCrypto:
            url = f'https://rest.coinapi.io/v1/ohlcv/BITSTAMP_SPOT_{crypto}_{currency}/latest?period_id=1SEC'
            headers = {'X-CoinAPI-Key' : API_KEY}
            response = requests.get(url, headers=headers)
            res.append({ "cryptoInfo" : json.loads(get_crypto_by_name(crypto)), "data" : response.json()[0]})
        return {"list" : res}, 200
    except Exception as e:
        return {'error': str(e)}, 500

@app.route('/<crypto_id>', methods = ['GET'])
@cross_origin()
def get_crypto_data(crypto_id):
    """
    Get crypto data from API

    Args:
        crypto_id (id of the crypto ex : ETH): get crypto data by id

    Returns:
        dict: crypto data
    """
    try:
        header = request.headers.get('token')
        playload = decode_jwt(header)
        if playload is None:
            return {'error': 'Invalid token'}, 401
        url = f'https://rest.coinapi.io/v1/ohlcv/BITSTAMP_SPOT_{crypto_id}_{playload["currency"]}/latest?period_id=1MIN'
        headers = {'X-CoinAPI-Key' : API_KEY}
        response = requests.get(url, headers=headers)
        return {"list" : [{ "cryptoInfo" : json.loads(get_crypto_by_name(crypto_id)), "data" : response.json()[0]}]}, 200
    except Exception as e:
        return {'error': str(e)}, 500

def handle_period_start(period):
    """
    Handle period start

    Args:
        period (str): period

    Returns:
        datetime: period start
    """
    period_stock = re.search('[0-9]+', period).group()
    period = period.replace(re.search('[0-9]+', period_stock).group(), "")
    if period == 'MIN':
        timestamp = datetime.now() - timedelta(minutes=int(period_stock))
    elif period == 'H':
        timestamp =  datetime.now() - timedelta(hours=int(period_stock))
    elif period == 'D':
        timestamp =  datetime.now() - timedelta(days=int(period_stock))
    elif period == 'W':
        timestamp =  datetime.now() - timedelta(weeks=int(period_stock))
    elif period == 'M':
        timestamp =  datetime.now() - timedelta(days=int(period_stock)*30)
    elif period == 'Y':
        timestamp =  datetime.now() - timedelta(years=int(period_stock))
    print("handle_period_start", period_stock, period, timestamp, file=sys.stderr)
    return timestamp.strftime("%Y-%m-%d") + "T00:00:00"

def handle_number_of_elem(period_stock):
    """
    handle_number_of_elem

    Args:
        period (str): period

    Returns:
        datetime: period start
    """
    period = period_stock.replace(re.search('[0-9]+', period_stock).group(), "")
    print("handle_number_of_elem : ", period_stock, period, file=sys.stderr)
    if period == 'MIN':
        return "6SEC"
    if period == 'H':
        return "10MIN"
    elif period == 'D':
        return "1HRS"
    elif period == 'W':
        return "5DAY"
    elif period == 'M':
        return "1DAY"
    elif period == 'Y':
        return "1DAY"

@app.route('/<crypto_id>/history/<period>', methods = ['GET'])
@cross_origin()
def get_crypto_data_period(crypto_id, period):
    """
    Get crypto data from API with period

    Args:
        crypto_id (id of the crypto ex : ETH): get crypto data by id
        period (period): period

    Returns:
        dict: crypto data
    """
    try:
        header = request.headers.get('token')
        playload = decode_jwt(header)
        if playload is None:
            return {'error': 'Invalid token'}, 401
        url = f'https://rest.coinapi.io/v1/ohlcv/BITSTAMP_SPOT_{crypto_id}_{playload["currency"]}/history?period_id={handle_number_of_elem(period)}&time_start={handle_period_start(period)}'
        print(handle_number_of_elem(period), file=sys.stderr)
        headers = {'X-CoinAPI-Key' : API_KEY}
        response = requests.get(url, headers=headers)
        return {"list" : [{ "cryptoInfo" : json.loads(get_crypto_by_name(crypto_id)), "data" : response.json()}]}, 200
    except Exception as e:
        return {'error': str(e)}, 500

