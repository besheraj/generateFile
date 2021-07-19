from flask import Flask, request, jsonify, url_for
from flask_cors import CORS
import random
import string
import os
import numpy as np


app = Flask(__name__)
CORS(app)

uploads_dir = os.path.join(app.instance_path, 'uploads')

@app.route('/get', methods=['GET'])
def get():
    if request.method == 'GET':

        arr_file = []
        arr_size = 2048
        size = 0
        countRandomDecimal = 0
        countRandomalphanumerics = 0
        countInteger = 0
        countRandomString = 0

        while size < arr_size:
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
            arr_file.append(i)
            size += np.array(arr_file.index(i)).nbytes
        file_path = os.path.join(uploads_dir,"file.txt")
        np.savetxt(file_path,
            [arr_file],
            delimiter =",", 
            fmt ='% s')

    return jsonify({
        "message": "file uploaded",
        "filePath": file_path ,
        "countRandomDecimal":countRandomDecimal,
        "countRandomalphanumerics":countRandomalphanumerics,
        "countInteger":countInteger,
        "countRandomString":countRandomString
    })
    
if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8000)
