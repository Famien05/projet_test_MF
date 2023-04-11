from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///acronyms.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)
CORS(app)

class Acronym(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    acronym = db.Column(db.String(80), unique=True, nullable=False)
    meaning = db.Column(db.String(200), nullable=False)

    def __repr__(self):
        return f"<Acronym {self.acronym}>"

# Ajoutez ces lignes pour créer toutes les tables
with app.app_context():
    db.create_all()

@app.route('/acronyms', methods=['GET'])
def get_acronyms():
    acronyms = Acronym.query.all()
    result = {a.acronym: a.meaning for a in acronyms}
    return jsonify(result)

@app.route('/acronyms', methods=['POST'])
def add_acronym():
    data = request.get_json()
    acronym = data.get("acronym")
    meaning = data.get("meaning")
    new_acronym = Acronym(acronym=acronym, meaning=meaning)
    db.session.add(new_acronym)
    db.session.commit()
    return jsonify({"message": "Acronym added successfully"}), 201

@app.route('/acronyms/<acronym>', methods=['PUT'])
def update_acronym(acronym):
    data = request.get_json()
    meaning = data.get("meaning")
    existing_acronym = Acronym.query.filter_by(acronym=acronym).first()
    existing_acronym.meaning = meaning
    db.session.commit()
    return jsonify({"message": "Acronym updated successfully"}), 200

@app.route('/acronyms/<acronym>', methods=['DELETE'])
def delete_acronym(acronym):
    existing_acronym = Acronym.query.filter_by(acronym=acronym).first()
    db.session.delete(existing_acronym)
    db.session.commit()
    return jsonify({"message": "Acronym deleted successfully"}), 200

if __name__ == "__main__":
    app.run(debug=True)

