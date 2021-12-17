from flask_mongoengine import MongoEngine
from flask import Flask
import redis

APP = Flask(__name__)
#APP.config["MONGO_URI"] = "mongodb+srv://leo:ytGXgQsRrOIA5NQj@cluster0.n1brr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
# APP.config['MONGODB_SETTINGS'] = {
#     'db': 'myFirstDatabase',
#     'host': 'mongodb+srv://yanito:moku12345@cluster0.iskxw.mongodb.net/'
# }

APP.config['MONGODB_SETTINGS'] = {
    'db': 'myFirstDatabase',
    'host': 'mongodb+srv://leo:ytGXgQsRrOIA5NQj@cluster0.n1brr.mongodb.net/'
}

db = MongoEngine()
db.init_app(APP)

r = redis.Redis(host="redis", port=6379)

import sys
r.flushdb()
print(r.set('foo', 'bar'),file=sys.stderr)
print(r.get('foo'), file=sys.stderr)