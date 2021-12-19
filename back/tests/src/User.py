
import time
import requests

USER_CREATION_OBJECT = {
    "username": "TA", 
    "email" : "TA@TA.com",
    "password" : "TA",
    "preferences" : ["BTC", "ETH"],
    "role" : "Admin",
    "currency" : "EUR"
}

class User:
    def __init__(self):
        self.token = ""
        self.user_info = {}

    def create_user(self, username, password, email):
        url = "http://localhost:8080/user/register"
        
        payload = {
            "username": username,
            "email" : email,
            "password" : password,
            "preferences" : ["BTC", "ETH"],
            "role" : "Admin",
            "currency" : "EUR"
        }
        self.user_info = payload
        res = requests.post(url=url, json=payload)
        if res.status_code != 200 or "token" not in res.json():
            print("Error:", res.status_code, res.content)
            raise Exception("Error:", res.status_code, res.content)
        self.token = res.json()["token"]
        return self.token
    

    def login_user(self, email, password):
        url = "http://localhost:8080/user/login"

        payload = {
            "email" : email,
            "password" : password
        }
        res = requests.post(url=url, json=payload)
        if res.status_code != 200 or "token" not in res.json():
            print("Error:", res.status_code, res.content)
            raise Exception("Error:", res.status_code, res.content)
        self.token = res.json()["token"]
        return self.token

    def update_user(self, username, password, email):
        url = "http://localhost:8080/user/profile"
        
        payload = {
            "username": username,
            "email" : email,
            "password" : password,
            "preferences" : ["BTC", "ETH"],
            "role" : "Admin",
            "currency" : "EUR"
        }
        self.user_info = payload
        res = requests.put(url=url, json=payload, headers={"token": self.token})
        if res.status_code != 200:
            print("Error:", res.status_code, res.content)
            raise Exception("Error:", res.status_code, res.content)
    
    def get_user(self):
        url = "http://localhost:8080/user/profile"
        res = requests.get(url=url, headers={"token": self.token})
        if res.status_code != 200:
            print("Error:", res.status_code, res.content)
            raise Exception("Error:", res.status_code, res.content)
        if self.user_info["email"] != res.json()["email"]:
            raise Exception("Error:", "Email not equal")
        if self.user_info["username"] != res.json()["username"]:
            raise Exception("Error:", "Username not equal")
        if self.user_info["password"] != res.json()["password"]:
            raise Exception("Error:", "Password not equal")

    def delete_user(self):
        url = "http://localhost:8080/user/profile"
        res = requests.delete(url=url, headers={"token": self.token})
        if res.status_code != 200:
            print("Error:", res.status_code, res.content)
            raise Exception("Error:", res.status_code, res.content)
        url = "http://localhost:8080/user/login"

        payload = {
            "email" : self.user_info["email"],
            "password" : self.user_info["password"]
        }
        res = requests.post(url=url, json=payload)
        if res.status_code != 404 or "token" in res.json():
            print("Error:", res.status_code, res.content)
            raise Exception("Error:", res.status_code, res.content)
        
    def user_test1(self):
        self.user_info = {}
        self.create_user(username="ta", password="ta", email="ta@ta.com")
        self.login_user(email="ta@ta.com", password="ta")
        self.delete_user()

    def user_test2(self):
        self.user_info = {}
        self.create_user(username="ta", password="ta", email="ta@ta.com")
        self.login_user(email="ta@ta.com", password="ta")
        self.update_user(username="ta1", password="ta1", email="ta1@ta.com")
        self.login_user(email="ta1@ta.com", password="ta1")
        self.get_user()
        self.delete_user()
    
    def user_test3(self):
        self.user_info = {}
        self.create_user(username="ta", password="ta", email="ta@ta.com")
        self.login_user(email="ta@ta.com", password="ta")
        self.get_user()
        self.delete_user()