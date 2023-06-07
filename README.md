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

Bien sûr, je vais ajouter plus de détails en français pour chaque étape de votre script :


- Etudiant en Master 2 en Data Engineering à l'Ecole d'ingénieurs généraliste du numérique (EFREI PARIS)

- Expérience professionnelle en cours :
  - Stage actuel en Data Engineering
  - Entreprise : [Nom de l'entreprise]
  - Durée : [Durée du stage]
  - Responsabilités : [Principales tâches et réalisations]

- Expérience professionnelle précédente :
  - Data Analyst
    - Entreprise : Région Ile-de-France
    - Durée : Janvier 2022 - Avril 2022

- Expérience professionnelle antérieure :
  - Equipier polyvalent
    - Entreprise : McDonald's, Rungis
    - Durée : Décembre 2021 - Présent

  - Agent d'accueil et d'informations
    - Entreprises : SAMSIC (Gare de l'est), CITY ONE (Massy Palaiseau)
    - Durée : Août 2021 - Septembre 2021
