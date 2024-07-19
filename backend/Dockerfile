# Utiliser une image de base officielle de Node.js
FROM node:14-alpine

# Définir le répertoire de travail
WORKDIR /app

# Copier package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers de l'application
COPY . .

# Exposer le port 5000
EXPOSE 5000

# Commande pour démarrer l'application
CMD ["npm", "start"]
