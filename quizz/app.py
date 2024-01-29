from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, resources={r"/quizz/api/v1.0/*": {"origins": "*"}})

import os.path

def mkpath (p):
    return os.path.normpath(os.path.join(os.path.dirname(__file__),p))

app.config['SQLALCHEMY_DATABASE_URI'] = ('sqlite:///'+mkpath('../app.db'))
db = SQLAlchemy(app)

app.config["SECRET_KEY"]="e28895be-0f01-42ba-a1da-875624610b39"