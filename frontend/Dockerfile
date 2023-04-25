# Dockerfile pour le frontend
FROM node:14

# Créez le répertoire pour votre application
RUN mkdir -p /app/frontend

# Définissez le répertoire de travail
WORKDIR /app/frontend

# Copiez les fichiers package.json et package-lock.json
COPY package*.json ./

# Installez les dépendances
RUN npm install

# Copiez le reste du code source de l'application
COPY . .

# Exposez le port sur lequel l'application s'exécute
EXPOSE 3000

# Lancez l'application
CMD ["npm", "start"]
