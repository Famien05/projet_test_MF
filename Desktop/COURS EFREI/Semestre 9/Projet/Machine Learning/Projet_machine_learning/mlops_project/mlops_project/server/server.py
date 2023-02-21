from flask import Flask, jsonify, request, render_template
from model import predict
import os

from flask_cors import CORS

app = Flask(__name__)

cors = CORS(app, resources={
    r"/api/*": {"origins": "http://localhost:3000"},
    r"/*": {"origins": "http://localhost:3000"}
})

@app.route('/', methods=['POST'])
def make_prediction():
    data = request.json
    title = data['title']
    genre = data['genre']
    description = data['description']
    type = data['type']
    producer = data['producer']
    studio = data['studio']
    prediction = predict(title, genre, description, type, producer, studio)
    return jsonify({'prediction': prediction})

if __name__ == '__main__':
    app.run(port=8000, debug=True)
