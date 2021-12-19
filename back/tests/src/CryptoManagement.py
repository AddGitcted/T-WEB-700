
import requests

class CryptoManagement:
    def __init__(self):
        self.crypto_info = {}
        self._id = ""

    def create_crypto(self, token):
        playload = {
            "name": "Tether",
            "idName": "USDT",
            "icone": "https://cryptologos.cc/logos/tether-usdt-logo.png?v=014"
        }
        self.crypto_info = playload
        res = requests.post('http://localhost:8080/cryptoManagement/', headers={'token': token}, json=playload)
        self._id = res.json()["_id"]["$oid"]

    def update_crypto(self, token):
        playload = {
            "name": "Tether1",
            "idName": "USDT1",
            "icone": "https://cryptologos.cc/logos/tether-usdt-logo.png?v=014"
        }
        self.crypto_info = playload
        res = requests.put(f'http://localhost:8080/cryptoManagement/{self._id}', headers={'token': token}, json=playload)
        self._id = res.json()["_id"]["$oid"]

    def get_crypto(self, token):
        res = requests.get(f'http://localhost:8080/cryptoManagement/{self._id}', headers={'token': token})
        if res.json()["name"] != self.crypto_info["name"]:
            raise Exception("Error : name are not equal")
        if res.json()["idName"] != self.crypto_info["idName"]:
            raise Exception("Error : idName are not equal")
        if res.json()["icone"] != self.crypto_info["icone"]:
            raise Exception("Error : icone are not equal")

    def delete_crypto(self, token):
        res = requests.delete(f'http://localhost:8080/cryptoManagement/{self._id}', headers={'token': token})
        if res.status_code != 200:
            raise Exception("Error : status code are not equal")

    def crypto_management_test1(self, token):
        self.create_crypto(token)
        self.get_crypto(token)
        self.update_crypto(token)
        self.delete_crypto(token)
    
    def crypto_management_test2(self, token):
        self.create_crypto(token)
        self.get_crypto(token)
        self.delete_crypto(token)