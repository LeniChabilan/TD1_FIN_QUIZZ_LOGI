from .app import app,db
@app.cli.command()
def loaddb():
    """Initialise la base de données"""
    # création de toutes les tables
    db.create_all()
