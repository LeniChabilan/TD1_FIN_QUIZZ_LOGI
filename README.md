# TD1_FIN_QUIZZ_LOGI

## Pour faire fonctionner l'application le serveur/client : 

### Il vous faut faire dans un terminal une venv (En fonction de la version de python utilisé) : 
python3 -m venv myenv
source myenv/bin/activate
### ainsi que d'installer les paquets necessaire : 
pip install -r requirements.txt
### puis lancer flask run : 
flask run --port 5555


## Dans un second terminal il faut lancer le serveur python avec la commande :
python3 -m http.server

## Vous pouvez acceder a l'application en ouvrant ce lien et en ouvrant le fichier todo.html : 
http://localhost:8000/


# Les commandes curl sont disponnible dans le fichier curl.txt 


# Une fois le serveur et le client lancé vous pouvez afficher les questionnaire et en ajouter/modifier , vous pouvez aussi consulter les question des questionnaires en ajouter les supprimer et les modifiers.