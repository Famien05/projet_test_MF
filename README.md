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

```bash
# Définir la version de Node.js à télécharger
NODE_VERSION=""

# Définir les informations d'identification de l'Artifactory
ARTI_USER=""
ARTI_PASS=""

# Étape 1 : Télécharger la version spécifiée de Node.js à partir de l'Artifactory
echo "Téléchargement de Node $NODE_VERSION" &&
curl -k -u $ARTI_USER:$ARTI_PASS https://artifactory-devops.group.echonet.net.intra/artifactory/common-generic/nodejs/$NODE_VERSION/node-v$NODE_VERSION-linux-x64.tar.xz -o /tmp/node-${NODE_VERSION}-linux-x64.tar.xz

# Étape 2 : Installer la version de Node.js téléchargée
echo "Installation de Node $NODE_VERSION" &&
mkdir -p /usr/local/lib/nodejs &&
tar -xf /tmp/node-${NODE_VERSION}-linux-x64.tar.xz -C /usr/local/lib/nodejs &&
ln -s /usr/local/lib/nodejs/node-v${NODE_VERSION}-linux-x64/bin/node /usr/bin/node &&
ln -s /usr/local/lib/nodejs/node-v${NODE_VERSION}-linux-x64/bin/npm /usr/bin/npm &&
chmod a+rx /usr/bin /usr/local/lib &&

# Étape 3 : Nettoyage du fichier téléchargé
echo "Nettoyage du fichier téléchargé" &&
rm -f /tmp/node-${NODE_VERSION}-linux-x64.tar.xz
```

1. La version de Node.js à installer est définie par la variable `NODE_VERSION`. 

2. `ARTI_USER` et `ARTI_PASS` sont vos identifiants pour Artifactory. 

3. La première étape du script est de télécharger Node.js depuis un dépôt Artifactory. Le fichier est sauvegardé sous `/tmp/node-${NODE_VERSION}-linux-x64.tar.xz`.

4. Ensuite, le script installe Node.js en créant un répertoire pour les fichiers, en extrayant l'archive téléchargée dans ce répertoire, puis en créant des liens symboliques pour `node` et `npm` dans `/usr/bin`, afin que ces commandes soient accessibles dans tout le système.

5. La dernière étape du script supprime l'archive téléchargée pour nettoyer le répertoire temporaire.

N'oubliez pas de remplacer `""` par la version de Node.js que vous souhaitez installer et vos informations d'identification Artifactory. Assurez-vous de ne pas exposer ces informations sensibles, surtout si vous prévoyez de partager ce script.




###################

# Définissez les informations d'identification de l'Artifactory
# Remplacez "" par vos informations d'identification Artifactory
ARTIFACTORY_CREDS_USR=""
ARTIFACTORY_CREDS_PSW=""

# Téléchargez le fichier d'authentification .npmrc depuis l'Artifactory
curl -kL -u ${ARTIFACTORY_CREDS_USR}:${ARTIFACTORY_CREDS_PSW} https://repo.artifactory-dogen.group.echonet/artifactory/api/npm/auth/ > ~/.npmrc

# Configurez npm pour désactiver strict-ssl
npm config set strict-ssl false

# Configurez npm pour utiliser le dépôt npm Artifactory
# Remplacez <DevopsSpaceId> par l'ID de votre espace DevOps
npm config set registry https://repo.artifactory-dogen.group.echonet/artifactory/api/npm/<DevopsSpaceId>-npm/

# Configurez npm pour télécharger des binaires précompilés pour node-sass depuis le dépôt Artifactory
npm set sass-binary-site https://${ARTIFACTORY_CREDS_US}:${ARTIFACTORY_CREDS_PSW}@repo.artifactory-dogen.group.echonet/artifactory/node-sass

# Installez les modules npm
npm install
