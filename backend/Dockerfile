# Utiliser Node.js comme base
FROM node:18

# Définir le répertoire de travail
WORKDIR /app

# Copier package.json et installer les dépendances
COPY package*.json ./
RUN npm install

# Copier tout le code du backend
COPY . .

# Exposer le port 5000
EXPOSE 5000

# Démarrer le backend
CMD ["node", "index.js"]