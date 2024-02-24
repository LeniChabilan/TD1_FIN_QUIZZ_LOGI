from .app import db


class Questionnaire(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))

    def __init__(self, name):
        super().__init__()
        self.name = name

    def __repr__(self):
        return "<Questionnaire (%d) %s>" % (self.id, self.name)

    def to_json(self):
        json = {
            'id': self.id,
            'name': self.name,
        }
        return json
    

    def get_Questionaire():
        return Questionnaire.query.all()
    
    def get_Questionaire_id(id):
        return Questionnaire.query.filter_by(id=id).first()
    
    def add_questionnaire(questionnaire):
        db.session.add(Questionnaire(questionnaire))
        db.session.commit()

    def sup_questionnaire(id):
        Questionnaire.query.filter_by(id=id).delete()
        db.session.commit()
    
    def update_questionnaire(id,questionnaire):
        Questionnaire.query.filter_by(id=id).update(questionnaire)
        db.session.commit()


class Question(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120))
    questionType = db.Column(db.String(120))
    questionnaire_id = db.Column(db.Integer, db.ForeignKey('questionnaire.id'))
    questionnaire = db.relationship("Questionnaire", backref=db.backref("questions", lazy="dynamic"))

    # __mapper_args__ = {
    #     'polymorphic_identity': 'question',
    #     'with_polymorphic': '*',
    #     'polymorphic_on': questionType
    # }

    def __init__(self, title , QuestionType, questionnaire_id):
        super().__init__()
        self.title = title
        self.questionType = QuestionType
        self.questionnaire_id = questionnaire_id
    
    def to_json(self):
        json = {
            'id': self.id,
            'title': self.title,
            'questionType': self.questionType,
            'questionnaire_id': self.questionnaire_id,
        }
        return json

    def get_Question_questionaire(id):
        return Question.query.filter_by(questionnaire_id=id).all()
    
    def get_Question_id(id,id2):
        return Question.query.filter_by(questionnaire_id=id,id=id2).first()
    

    def sup_questionnaire_question(id,id2):
        Question.query.filter_by(questionnaire_id=id,id=id2).delete()
        db.session.commit()

    def add_question(title,questionType,questionnaire_id):
        db.session.add(Question(title,questionType,questionnaire_id))
        db.session.commit()

    def update_question(idQuestinnaire,question):
        Question.query.filter_by(id=idQuestinnaire).update(question)
        db.session.commit()
    
# class simpleQuestion(Question):
#     id = db.Column(db.Integer, db.ForeignKey('question.id'), primary_key=True)
#     # __mapper_args__ = {
#     #     'polymorphic_identity': 'simpleQuestion',
#     #     'with_polymorphic': '*',
#     #     'polymorphic_on': 'inline'
#     # }
#     def __init__(self, title , QuestionType, questionnaire_id):
#         super().__init__(title, QuestionType, questionnaire_id)

# class multipleQuestion(Question):
#     id = db.Column(db.Integer, db.ForeignKey('question.id'), primary_key=True)
#     # __mapper_args__ = {
#     #     'polymorphic_identity': 'multipleQuestion',
#     #     'with_polymorphic': '*',
#     #     'polymorphic_on': 'inline'
#     # }
#     def __init__(self, title , QuestionType, questionnaire_id):
#         super().__init__(title, QuestionType, questionnaire_id)