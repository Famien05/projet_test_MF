# Dockerfile pour le backend
FROM python:3.9

# Créez le répertoire pour votre application
RUN mkdir -p /app/backend

# Définissez le répertoire de travail
WORKDIR /app/backend

# Copiez les fichiers requirements.txt
COPY requirements.txt ./

# Installez les dépendances
RUN pip install --no-cache-dir -r requirements.txt

# Copiez le reste du code source de l'application
COPY . .

# Exposez le port sur lequel l'application s'exécute
EXPOSE 8000

# Lancez l'application
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
