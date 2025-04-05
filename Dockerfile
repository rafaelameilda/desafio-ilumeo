# Etapa 1: Build
FROM node:20-slim AS builder
LABEL maintainer="Rafael Almeida"

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Etapa 2: Imagem final
FROM node:20-alpine

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

# Instalar cliente do PostgreSQL
RUN apk add --no-cache postgresql-client

# Copiar arquivos da etapa de build com permissões apropriadas
COPY --chown=appuser:appgroup --from=builder /usr/src/app/dist ./dist
COPY --chown=appuser:appgroup --from=builder /usr/src/app/package*.json ./
COPY --chown=appuser:appgroup --from=builder /usr/src/app/dist/data-source.js ./dist/data-source.js
COPY --chown=appuser:appgroup --from=builder /usr/src/app/docker-entrypoint.sh ./docker-entrypoint.sh

# Instalar apenas as dependências de produção
RUN npm ci --only=production

# Criar usuário não-root
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Tornar script de entrada executável
RUN chmod +x docker-entrypoint.sh

# Trocar para o usuário
USER appuser

EXPOSE 3000
ENTRYPOINT ["./docker-entrypoint.sh"]
