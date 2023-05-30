# projet_test_MF
import subprocess

def get_new_mdp(BU, BL, ecosystem):
    cert_pfx = "votre_chemin_vers_cert_pfx"
    cert_key = "votre_chemin_vers_cert_key"
    postgresinst = "votre_valeur_postgresinst"
    postgresUser = "votre_valeur_postgresUser"
    hvaulturl = "votre_valeur_hvaulturl"
    
    json_token = f"curl --cert {cert_pfx} --key {cert_key}"
    url = f"{hvaulturl}/v1/{BU}/{BL}/{ecosystem}/auth/cert/login"
    cmd = f"{json_token} {url}"
    
    print(cmd)
    new_pw = subprocess.check_output(cmd, shell=True).decode().strip()
    return new_pw



1. **Environnement de développement** :
   Pour travailler sur notre application, il vous faut un environnement avec les logiciels suivants installés :
   - Node.js : pour exécuter notre application frontend React et gérer ses dépendances.
   - Visual Studio Code : notre éditeur de code recommandé, doté de fonctionnalités puissantes pour le développement JavaScript et Python.
   - Postgres : notre système de gestion de base de données. Une instance Postgres doit être en cours d'exécution pour stocker et récupérer les données de notre application.
   - Python : le langage de programmation utilisé pour développer notre backend FastAPI.

2. **Frontend** :
   Après avoir installé Node.js, vous devez installer les dépendances spécifiques à notre application frontend. Dans le répertoire du projet frontend, exécutez la commande `npm install` pour installer toutes les dépendances requises listées dans notre fichier `package.json`.

3. **Backend** :
   De même, après avoir installé Python, vous devez installer les dépendances spécifiques à notre application backend. Dans le répertoire du projet backend, exécutez la commande `pip install -r requirements.txt` pour installer toutes les dépendances requises listées dans notre fichier `requirements.txt`.

En respectant ces prérequis, vous serez en mesure de travailler efficacement sur notre application, que ce soit pour le développement, le débogage ou le déploiement.


Bien sûr, voici une suggestion pour expliquer comment démarrer l'application :

1. **Frontend (React)** :

   Dans le répertoire de l'application frontend, exécutez la commande suivante pour démarrer le serveur de développement React :

   ```
   npm start
   ```

   Cela devrait démarrer le serveur de développement React et ouvrir automatiquement une nouvelle fenêtre de navigateur avec votre application. Par défaut, l'application devrait être accessible à l'adresse `http://localhost:3000`.

2. **Backend (FastAPI)** :

   Dans le répertoire de l'application backend, vous pouvez démarrer le serveur FastAPI avec la commande suivante :

   ```
   uvicorn main:app --reload
   ```

   Remplacez `main:app` par le nom du fichier Python (sans l'extension `.py`) et le nom de l'instance FastAPI. L'option `--reload` permet de redémarrer le serveur automatiquement lorsque des modifications sont apportées au code source.

   Par défaut, le serveur FastAPI devrait être accessible à l'adresse `http://localhost:8000`.

3. **Base de données (Postgres)** :

   Assurez-vous que votre base de données Postgres est en cours d'exécution et que votre application backend est correctement configurée pour s'y connecter.

Une fois que vous avez démarré les deux parties de l'application et la base de données, vous devriez pouvoir interagir avec votre application à travers le navigateur. N'oubliez pas de vérifier que les services communiquent correctement entre eux.
