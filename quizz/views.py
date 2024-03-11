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

@app.route('/todo/api/v1.0/quizz/<int:id>', methods=['DELETE'])
def sup_questionnaire(id):
    Questionnaire.sup_questionnaire(id)
    return jsonify({'result': True, 'message': 'Questionnaire deleted successfully'})

@app.route('/todo/api/v1.0/quizz/<int:id>/question/<int:id2>', methods=['DELETE'])
def sup_questionnaire_questio(id,id2):
    Question.sup_questionnaire_question(id,id2)
    return jsonify({'result': True, 'message': 'Questionnaire deleted successfully'})



@app.route('/todo/api/v1.0/quizz', methods=['POST'])
def add_questionaire():
    if not request.json or not 'name' in request.json:
        abort(400)  # bad request
    Questionnaire.add_questionnaire(request.json['name'])
    return jsonify({'Questionnaire': request.json['name']}), 201

@app.route('/todo/api/v1.0/quizz/<int:id>', methods=['PUT'])
def update_questionnaire(id):
    if not request.json:
        abort(400)
    Questionnaire.update_questionnaire(id,request.json)
    return jsonify({'Questionnaire': request.json}), 201


@app.route('/todo/api/v1.0/quizz/<int:id>/question', methods=['POST'])
def add_question_oui(id):
    if not request.json or not 'title' in request.json or not 'questionType' in request.json:
        abort(400)  # bad request
    Question.add_question(request.json['title'],request.json['questionType'],id)
    return jsonify({'Questionnaire': request.json['title']}), 201


@app.route('/todo/api/v1.0/quizz/<int:id>/question/<int:id2>', methods=['PUT'])
def update_question_oui(id,id2):
    if not request.json :
        abort(400)
    Question.update_question(id2,request.json)
    return jsonify({'Question': request.json}), 201