# Usa l'immagine ufficiale di Node.js come base
FROM node:22

# Imposta la directory di lavoro nel container
WORKDIR /usr/src/app

# Copia package.json e package-lock.json nel container
COPY package*.json ./

# Installa le dipendenze
RUN npm install

# Copia il resto dell'applicazione nel container
COPY . .

# Compila l'applicazione React/Vite
RUN npm run build

# Installa serve per servire la build di produzione
RUN npm install -g serve

# Espone la porta su cui gira la tua app
EXPOSE 4173

# Comando per eseguire la tua applicazione
CMD ["serve", "-s", "server/build", "-l", "4173"]
