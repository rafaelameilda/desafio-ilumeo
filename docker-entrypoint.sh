#!/bin/sh
set -e

echo "⏳ Aguardando o banco de dados ficar disponível..."

# Checa se o Postgres está aceitando conexões com um comando SQL simples
until PGPASSWORD="$POSTGRES_PASSWORD" psql -h "$POSTGRES_HOST" -U "$POSTGRES_USER" -d "$POSTGRES_DB" -c 'SELECT 1' > /dev/null 2>&1; do
  echo "🔁 Ainda não está pronto, esperando..."
  sleep 1
done

echo "✅ Banco disponível! Rodando migrations..."
npm run migration:run

echo "🚀 Subindo aplicação NestJS..."
exec npm run start:prod
