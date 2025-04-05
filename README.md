# Conversion Dashboard

Este projeto é composto por duas aplicações:

- **conversion-api**: API backend, responsável por fornecer os dados.
- **conversion-dashboard**: Interface frontend (React + Vite), que consome a API.

## 🔧 Requisitos

- Docker
- Docker Compose

## 🚀 Como executar o projeto

### 1. Subir a API (Backend)

Abra o terminal, navegue até a pasta do backend e execute:
A API estará disponível em http://localhost:3000 e a documentação Swagger pode ser acessada em http://localhost:3000/docs.

```bash
cd conversion-api
docker compose up
```

### 2. Subir o Frontend

Em um novo terminal, navegue até a pasta do frontend e execute:

```bash
cd conversion-api
docker compose up
```

O frontend estará disponível na URL: `http://localhost:3001`

### 3. Comandos de Teste

Em um novo terminal, navegue até a pasta do frontend e execute:

```bash
npm run test
npm run test:e2e
npm run test:cov
```

O frontend estará disponível na URL: `http://localhost:3001`
