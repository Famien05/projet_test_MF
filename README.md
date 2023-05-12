# projet_test_MF
Hébergement d'une application avec Nginx et Gunicorn

Préparation de l'application pour le déploiement

Release de l'application : Assurez-vous que l'application est prête pour le déploiement. Le serveur doit pouvoir empaqueter l'application correctement. Cette étape est souvent spécifique à l'application et peut impliquer des tâches comme la compilation de code, l'exécution de tests, la création d'artefacts de déploiement, etc.
Installation et configuration de Nginx

Installation de Nginx : Avec Muad, nous avons installé Nginx sur notre serveur en utilisant Yum, un gestionnaire de paquets pour Linux. La commande utilisée est : yum install nginx puis confirmez avec yes.
Activation de Nginx : Pour que Nginx se lance automatiquement au démarrage du système, nous avons utilisé la commande : systemctl enable nginx. Le résultat attendu est un message indiquant qu'un lien symbolique a été créé, quelque chose comme : Created symlink /etc/systemd/system/multi-user.target.wants/nginx.service → /usr/lib/systemd/system/nginx.service.
Redémarrage de Nginx : Pour s'assurer que Nginx utilise la nouvelle configuration, nous avons utilisé la commande : systemctl restart nginx.
Installation et configuration de Gunicorn

Installation de Gunicorn : Nous avons installé Gunicorn, qui nous permet de démarrer le serveur, en utilisant pip, un gestionnaire de paquets pour Python. La commande utilisée est : pip3 install gunicorn.
Démarrage de l'application avec Gunicorn : Pour démarrer l'application, nous avons utilisé la commande : gunicorn main:app -k uvicorn.workers.UvicornWorker.
Configuration de Nginx pour travailler avec l'application

Création de la configuration Nginx pour l'application : Nous nous sommes rendus dans le répertoire /etc/nginx/conf.d et nous avons créé et ouvert un fichier de configuration pour l'application avec la commande : vi default.conf.
Modification des permissions du fichier de configuration : Pour s'assurer que Nginx peut lire le fichier de configuration, nous avons changé ses permissions avec la commande : chmod 777 default.conf.
Vérification du fonctionnement de l'application

Vérification du fonctionnement de Nginx : Sur un autre terminal, nous avons utilisé les commandes systemctl start nginx, systemctl stop nginx et systemctl status nginx pour vérifier que Nginx fonctionne correctement.
Accès à l'application via le navigateur : Enfin, nous avons vérifié que l'application fonctionne correctement en y accédant via notre navigateur à l'adresse : http://s01v19999146.fr.net.intra/docs. Ceci devrait afficher l'interface utilisateur Swagger de FastAPI pour l'application.
Note: Certains détails (comme le nom de l'application et l'URL d'accès) seront spécifiques à votre application et à votre configuration de serveur.
