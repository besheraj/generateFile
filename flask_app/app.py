from flask import Flask, request, jsonify, make_response
import os
from flask_pymongo import PyMongo 

import random
import string
import numpy as np
import csv
import pandas as pd 


if os.path.exists("env.py"):
      import env 

app = Flask(__name__)
app.config["MONGO_DBNAME"] = 'files'
app.config["MONGO_URI"] = os.getenv("MONGO_URI")
mongo = PyMongo(app)

uploads_dir = os.path.join(app.instance_path, 'uploads')

@app.route('/get', methods=['GET'])
def get():
    if request.method == 'GET':

        file = []
        size = 0
        countRandomDecimal = 0
        countRandomalphanumerics = 0
        countInteger = 0
        countRandomString = 0

        while size < 2048:
            random_choice = random.randrange(4)
            if random_choice == 0:
                i = ''.join(random.choices(string.ascii_lowercase, k = random.randint(5,20)))
                countRandomString += 1
            if random_choice == 1:
                i = random.randint(9999,999999)
                countInteger += 1
            if random_choice == 2:
                i = ''.join(random.choices(string.ascii_lowercase + string.digits, k = random.randint(5,20)))
                countRandomalphanumerics += 1
            if random_choice == 3:
                i = random.uniform(1, 20)
                countRandomDecimal += 1
            file.append(i)
            size += np.array(file.index(i)).nbytes

        dataframe = pd.DataFrame(file)
        file_path = "/Users/besher/Desktop/projects/generate170721/flask_app/instance/uploads/file.csv"
        dataframe.to_csv(file_path,index=None,header=None)


    return jsonify({
        "message": "file uploaded",
        "filePath": file_path,
        "countRandomDecimal":countRandomDecimal,
        "countRandomalphanumerics":countRandomalphanumerics,
        "countInteger":countInteger,
        "countRandomString":countRandomString
    })
    
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=105)
