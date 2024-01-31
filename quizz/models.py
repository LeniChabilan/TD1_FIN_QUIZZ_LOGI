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


class Question(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120))
    questionType = db.Column(db.String(120))
    questionnaire_id = db.Column(db.Integer, db.ForeignKey('questionnaire.id'))
    questionnaire = db.relationship("Questionnaire", backref=db.backref("questions", lazy="dynamic"))

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
    
