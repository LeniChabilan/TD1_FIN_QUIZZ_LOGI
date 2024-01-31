from flask import jsonify , abort, make_response, request , url_for
from .app import app
from .models import Questionnaire, Question

@app.route('/todo/api/v1.0/quizz', methods=['GET'])
def get_questionaire_all():
    quest = Questionnaire.get_Questionaire()
    return jsonify({'Questionnaire': [i.to_json() for i in quest]})


@app.route('/todo/api/v1.0/quizz/<int:id>', methods=['GET'])
def get_questionaire(id):
    quest = Questionnaire.get_Questionaire_id(id)
    return jsonify(quest.to_json())


@app.route('/todo/api/v1.0/quizz/<int:id>/question', methods=['GET'])
def get_question_questionaire(id):
    quest = Question.get_Question_questionaire(id)
    return jsonify({'Questions': [i.to_json() for i in quest]})


@app.route('/todo/api/v1.0/quizz/<int:id>/question/<int:id2>', methods=['GET'])
def get_question_questionaire_yes(id,id2):
    quest = Question.get_Question_id(id,id2)
    return jsonify(quest.to_json())
