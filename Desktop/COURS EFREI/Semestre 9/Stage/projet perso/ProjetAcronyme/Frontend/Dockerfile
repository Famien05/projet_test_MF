# Utilisez une image de base Node.js
FROM node:14

# Définissez le répertoire de travail
WORKDIR /app

# Copiez les fichiers package.json et package-lock.json et installez les dépendances
COPY package*.json ./
RUN npm install

# Copiez le reste des fichiers de l'application
COPY . .

# Construisez l'application React pour la production
RUN npm run build

# Utilisez une image de base Nginx pour servir l'application React
FROM nginx:1.21

# Copiez les fichiers de build React vers le répertoire de Nginx
COPY --from=0 /app/build /usr/share/nginx/html

# Exposez le port sur lequel l'application sera accessible
EXPOSE 80

# Lancez Nginx
CMD ["nginx", "-g", "daemon off;"]
