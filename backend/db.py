import csv
from datetime import datetime
import json
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

uri = json.load(open("./secrets.json"))["mongoConnectionString"]

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))
# Send a ping to confirm a successful connection

db = client["crime-data"]
collection = db["crime-data"]


# test data
test_params = {
    "type": "Vol de véhicule à moteur",
    "start_date": 1703394000,
    "end_date": 1703480400,
    "time_of_day": "soir",
}

def load_data(path):
    # clear collection
    collection.delete_many({})

    # get data from csv
    dataset = []
    with open(path, "r") as file:
        cols = ["CATEGORIE", "DATE", "QUART", "LONGITUDE", "LATITUDE"]
               
        reader = csv.DictReader(file)
        for row in reader:
            if all(row[key] for key in cols):
                data = {
                    "type": row["CATEGORIE"],
                    "date": int(datetime.strptime(row["DATE"], "%Y-%m-%d").timestamp()),
                    "time_of_day": row["QUART"],
                    "longitude": float(row["LONGITUDE"]),
                    "latitude": float(row["LATITUDE"])
                }

                dataset.append(data)
        
    # insert data into collection
    collection.insert_many(dataset)


            

def find(type=None, start_date=None, end_date=None, time_of_day=None):
    params = {}
    if type is not None:
        params["type"] = type
    if start_date is not None and end_date is not None:
        params["date"] = {"$gte": start_date, "$lte": end_date}
    if time_of_day is not None:
        params["time_of_day"] = time_of_day
    
    documents = collection.find(params)
    return documents

# uncomment to load/reset data
# load_data("./backend/data/crime.csv")