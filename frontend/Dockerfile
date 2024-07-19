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

# Construire l'application
RUN npm run build

# Exposer le port 3000
EXPOSE 3001

# Commande pour démarrer l'application
CMD ["npm", "start"]
