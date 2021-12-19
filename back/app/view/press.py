
import collections
from flask import request, Blueprint
from flask_cors import  cross_origin
from view import r as redis

import feedparser
import xmltodict
import uuid
import time
import sys
import json

from jwt_handler import decode_jwt


app = Blueprint('articles', __name__)

from flask_cors import CORS

CORS(app)
CORS(app, resources={r"*": {"origins": "*"}})


def make_tag_list(tag_list):
    """
    Create a tag list fro tag list object

    Args:
        tag_list (list of dict): tag list object

    Returns:
        list: list of tag
    """
    tmp = []
    for tag in tag_list:
        tmp.append(tag["term"].lower())
    return tmp

def format_json(article_object, id):
    """
    Format the article object to a json object.
    """

    tmp = {}
    tmp["tittle"] = article_object["title"]
    tmp["link"] = article_object["link"]
    try:
        tmp["link_image"] = article_object["media_content"][0]["url"]
    except:
        tmp["link_image"] = "https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled-1150x647.png"
    try:
        if type(xmltodict.parse("<root>" + article_object["summary"] + "</root>")["root"]["p"][1]) == collections.OrderedDict:
            tmp["summary"] = xmltodict.parse("<root>" + article_object["summary"] + "</root>")["root"]["p"][0]
        else:
            tmp["summary"] = xmltodict.parse("<root>" + article_object["summary"] + "</root>")["root"]["p"][1]
    except:
        tmp["summary"] = "No summary"
  
    try:
        tmp["tag"] = make_tag_list(article_object["tags"])
    except:
        tmp["tag"] = []
    tmp["id"] = id
    tmp["author"] = article_object["author"]
    tmp["published"] = article_object["published"][:-9]
    return json.dumps(tmp,indent=4)

def control_and_update():
    """
    Control and update the redis database.
    """

    last_update = redis.get("last_update")
    if last_update is not None:
        if (int(last_update)) + 900 > int(time.time()):
            return "Not Updated"
        
    redis.flushdb()
    print("Redis has been flush", file=sys.stderr)
    redis.set("last_update", int(time.time()))
    feed = feedparser.parse('https://cointelegraph.com/rss')
    for i in range(0, len(feed["entries"])):
        id = str(uuid.uuid4())
        redis.set(id, format_json(feed["entries"][i], id))
    feed = feedparser.parse("https://actualiteinformatique.fr/category/blockchain/feed")
    for i in range(0, len(feed["entries"])):
        id = str(uuid.uuid4())
        redis.set(id, format_json(feed["entries"][i], id))
    return "Updated"


@app.route('/articles/<id>', methods = ['GET'])
@cross_origin()
def get_article_by_id(id):
    """
    Get the data of a specific crypto.
    """
    object = redis.get(id)
    if object == None:
        return {"errro" : "Not Found"}, 404
    print(control_and_update(), file=sys.stderr)
    return json.loads(object.decode("utf-8")), 200

@cross_origin()
def handle_tag(preferences):
    """
    Handle the logged user.
    """
    res = []
    preferences = list(dict.fromkeys(preferences))
    #if (len(redis.keys()) < 2):
    print("control and update :", control_and_update(),file=sys.stderr)
    for uuid in redis.keys():
        if uuid == b"last_update":
            continue
        data = json.loads(redis.get(uuid.decode("utf-8")).decode("utf-8"))
        try:
            for preference in preferences:
                preference = preference.lower()
                if preference in data["tag"] and data not in res:
                    res.append(data)
        except:
            pass

    if res == []:
        for uuid in redis.keys():
            if uuid == b"last_update":
                continue
            data = json.loads(redis.get(uuid.decode("utf-8")).decode("utf-8"))
            res.append(data)
    return {"articles": res}

@app.route('/articles', methods = ['GET'])
@cross_origin()
def get_article_by_tag():
    """
    Get the data of a specific crypto.
    """
    header = request.headers.get('token')
    listOftag = request.args.getlist("tag")
    if listOftag == None and header == None:
        res = handle_tag([])
    elif listOftag != None and header == None:
        res = handle_tag(listOftag)
    elif listOftag != None and header != None:
        playload = decode_jwt(header)
        if playload == None:
            res = handle_tag(listOftag)
        res = handle_tag(playload["preferences"] + listOftag)
    return res, 200


@app.route('/articles/available_tag', methods = ['GET'])
@cross_origin()
def avaible_tag():
    """
    Get the data of a specific crypto.
    """
    res = []
    print(control_and_update(),file=sys.stderr)
    for uuid in redis.keys():
        if uuid == "last_update":
            continue
        data = json.loads(redis.get(uuid.decode("utf-8")).decode("utf-8"))
        try:
            for tag in data["tag"]:
                if tag not in res:
                    res.append(tag)
        except:
            pass
    return {"tags": res}, 200