from .app import app,db

from .models import Questionnaire, Question
@app.cli.command()
def loaddb():
    """Initialise la base de données"""
    # création de toutes les tables
    db.create_all()

    db.session.add(Questionnaire("Questionnaire 1"))
    db.session.add(Questionnaire("Questionnaire 2"))

    db.session.add(Question("Question 1", "radio", 1))
    db.session.add(Question("Question 2", "textfield", 1))

    db.session.add(Question("Question 3", "radio", 2))
    db.session.add(Question("Question 4", "checkbox", 2))
    db.session.commit()
