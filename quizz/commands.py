from .app import app,db

from .models import Questionnaire, Question
@app.cli.command()
def loaddb():
    """Initialise la base de données"""
    # création de toutes les tables
    db.create_all()

    db.session.add(Questionnaire("Questionnaire 1"))
    db.session.add(Questionnaire("Questionnaire 2"))

    db.session.add(Question("Question 1 Q1", "Type 1", 1))
    db.session.add(Question("Question 2 Q1", "Type 2", 1))

    db.session.add(Question("Question 1 Q2", "Type 1", 2))
    db.session.add(Question("Question 2 Q2", "Type 2", 2))
    db.session.commit()
