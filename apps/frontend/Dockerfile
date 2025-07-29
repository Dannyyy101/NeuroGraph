# syntax=docker/dockerfile:1

# Basis-Image mit Node.js
FROM node:20-alpine

# Setzen des Arbeitsverzeichnisses
WORKDIR /usr/src/app

# Kopieren von package.json und package-lock.json für die Installation der Abhängigkeiten
COPY package*.json ./

# Installieren der Abhängigkeiten
RUN npm ci --omit=dev

# Kopieren des gesamten Projekts ins Image
COPY . .

# Exponieren des Ports
EXPOSE 3000

# Starten der Anwendung
CMD ["npm", "run", "dev"]