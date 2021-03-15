from flask import Flask, request, jsonify

import sys
import json

from utils import (
  createNotebook
)

app = Flask(__name__) 

@app.route('/')
def hello(): 
  return 'Be Amazed me too hihi'

@app.route('/api/notebook/new', methods=['POST'])
def notebookNew(): 
  if request.form['name']: 
    notebookId = createNotebook(request.form['name'])
    return jsonify(notebook_id=notebookId)
  else:
    return 0

if __name__ == '__main__': 
  app.run(debug=True)