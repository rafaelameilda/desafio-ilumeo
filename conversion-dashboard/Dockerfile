# Etapa 1: build
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY vite.config.ts ./
COPY tsconfig.json ./
COPY tailwind.config.js ./

RUN npm install

COPY . .

RUN npm run build

# Etapa 2: imagem final com conteúdo estático
FROM nginx:alpine

# Remove config padrão do NGINX
RUN rm -rf /usr/share/nginx/html/*

# Copia o build gerado
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
