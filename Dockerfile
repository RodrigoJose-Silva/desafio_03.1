# Dockerfile para aplicação de gestão de login
# Usa Node.js 18 como base

FROM node:18-alpine

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependências
COPY package*.json ./

# Instala as dependências
RUN npm ci

# Copia o código da aplicação
COPY . .

# Compila o CSS do Tailwind
RUN npm run build:css-prod

# Expõe a porta 3030
EXPOSE 3030

# Define variáveis de ambiente
ENV NODE_ENV=production
ENV PORT=3030

# Comando para iniciar a aplicação
CMD ["npm", "start"] 