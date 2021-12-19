import requests

from src.Crypto import Crypto
from src.User import User
from src.CryptoManagement import CryptoManagement

class TestsFonctionnel(Crypto, CryptoManagement, User):
    def __init__(self):
        Crypto.__init__(self)
        User.__init__(self)
        CryptoManagement.__init__(self)

    def test_user(self):
        self.user_test1()
        self.user_test2()
        self.user_test3()
    
    def test_crypto(self):
        header = self.create_user(username="ta", password="ta", email="ta@ta.com")
        self.crypto_management_test1(header)
        self.crypto_management_test2(header)
        self.delete_user()

if __name__ == '__main__':
    test = TestsFonctionnel()
    for i in range(0, 10):
        test.test_user()
        test.test_crypto()