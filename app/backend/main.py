from flask import Flask, request, jsonify

import sys
import json

app = Flask(__name__)

@app.route("/")
def hello(): 
  return "Be Amazed me too hihi"

@app.route("/upload", methods=['GET'])
def serveUploadForm(): 
  return '''
    <!doctype html>
    <title>Upload new Text</title>
    <h1>Upload new Text (txt)</h1>
    <form method=post enctype=multipart/form-data action=/api/upload>
      <p><input type=file name=file>
         <input type=submit value=Upload>
    </form>
    '''

if __name__ == '__main__': 
  app.run(debug=True)