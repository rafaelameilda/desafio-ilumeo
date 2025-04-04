# Etapa 1: Build
FROM node:20-slim AS builder
LABEL maintainer="Rafael Almeida"

# Definir o diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copiar package.json e package-lock.json para instalar dependências
COPY package*.json ./

# Instalar as dependências do projeto
RUN npm install

# Copiar o restante do código do projeto
COPY . .

# Compilar o código TypeScript para JavaScript
RUN npm run build

# Etapa 2: Imagem final
FROM node:20-alpine

# Definir a variável de ambiente
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Definir o diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copiar os arquivos necessários do estágio de build
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/package*.json ./

# Instalar apenas as dependências de produção
RUN npm ci --only=production

# Criar um usuário não root para executar o processo
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Definir permissões para o usuário não root
RUN chown -R appuser:appgroup /usr/src/app

# Alternar para o usuário não root
USER appuser

# Expor a porta da aplicação
EXPOSE 3000

# Comando de inicialização
CMD ["npm", "run", "start:prod"]
