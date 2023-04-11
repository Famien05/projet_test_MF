# Utilisez une image de base Python 3
FROM python:3.9-slim

# Définissez le répertoire de travail
WORKDIR /app

# Copiez les fichiers de dépendance et installez-les
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiez le fichier app.py dans le répertoire de travail
COPY app.py .

# Exposez le port sur lequel l'application sera accessible
EXPOSE 5000

# Lancez l'application Flask
CMD ["python", "app.py"]
