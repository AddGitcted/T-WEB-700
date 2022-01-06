

from flask import request, Blueprint, jsonify
from flask_cors import  cross_origin, CORS
from jwt_handler import decode_jwt
from view.crypto_management import get_crypto_by_name

import re
import requests
import json
import sys
import os
from datetime import datetime, timedelta

app = Blueprint('crytpo', __name__)

CORS(app)
CORS(app, resources={r"*": {"origins": "*"}})

if os.getenv('API_KEY') != None:
    API_KEY = os.getenv('API_KEY')
else:
    # API_KEY = '19EED93F-BDAA-44EA-8069-8F076B650C54'
    API_KEY = '10E92991-2B8C-4503-96A2-5A1ACA44C99F'
    # API_KEY = 'B6FC1227-D750-48CD-BF15-4FEC35DF99D1'
    #API_KEY = "24721720-2615-41AE-8442-84EF594E5076"
    #62DB5035-C9A1-4EB0-8BC8-2B097A0EFB6A
    #19EED93F-BDAA-44EA-8069-8F076B650C54


@app.route('/cryptos/', methods = ['GET'])
@cross_origin(origin='*')
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
            try:
                res.append({ "cryptoInfo" : json.loads(get_crypto_by_name(crypto)), "data" : response.json()[0]})
            except:
                res.append({ "cryptoInfo" : json.loads(get_crypto_by_name(crypto)), "data" : response.json()})
        return jsonify({"list" : res}), 200
    except Exception as e:
        return {'error': str(e)}, 500

@app.route('/cryptos/<crypto_id>', methods = ['GET'])
@cross_origin(origin='*')
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
        print(json.dumps(response.json(), indent=4), file=sys.stderr)
        return jsonify({"list" : [{ "cryptoInfo" : json.loads(get_crypto_by_name(crypto_id)), "data" : response.json()[0]}]}), 200
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
        timestamp =  datetime.now() - timedelta(weeks=55*int(period_stock))
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
        return "7DAY"
    elif period == 'M':
        return "1DAY"
    elif period == 'Y':
        return "5DAY"

@app.route('/cryptos/<crypto_id>/history/<period>', methods = ['GET'])
@cross_origin(origin='*')
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
        return jsonify({"list" : [{ "cryptoInfo" : json.loads(get_crypto_by_name(crypto_id)), "data" : response.json()}]}), 200
    except Exception as e:
        return {'error': str(e)}, 500

@app.route('/cryptos/exchangerate/<crypto_id>', methods = ['GET'])
@cross_origin(origin='*')
def exchangerate(crypto_id):
    """
    Get crypto data from API
    
    Args:
        crypto_id (id of the crypto ex : ETH): get crypto data by id
    """
    header = request.headers.get('token')
    playload = decode_jwt(header)
    if playload is None:
        currency = "EUR"
    else:
        currency = playload["currency"]
    headers = {'X-CoinAPI-Key' : API_KEY}
    return jsonify(requests.get(f"https://rest.coinapi.io/v1/exchangerate/{crypto_id}/{currency}", headers=headers).json()), 200
