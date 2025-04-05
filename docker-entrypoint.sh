#!/bin/sh
set -e

echo "⏳ Aguardando o banco de dados ficar disponível..."

# Espera o banco subir
until PGPASSWORD="$POSTGRES_PASSWORD" psql -h "$POSTGRES_HOST" -U "$POSTGRES_USER" -d "$POSTGRES_DB" -c 'SELECT 1' > /dev/null 2>&1; do
  echo "🔁 Ainda não está pronto, esperando..."
  sleep 1
done

echo "✅ Banco disponível!"

# Conta tabelas no schema public
TABLE_COUNT=$(PGPASSWORD="$POSTGRES_PASSWORD" psql -h "$POSTGRES_HOST" -U "$POSTGRES_USER" -d "$POSTGRES_DB" -t -c "SELECT count(*) FROM information_schema.tables WHERE table_schema = 'public';" | tr -d '[:space:]')

if [ "$TABLE_COUNT" -eq 0 ] && [ -f "/usr/src/app/backup.dump" ]; then
  echo "📦 Banco vazio e backup encontrado. Importando backup..."

  PGPASSWORD="$POSTGRES_PASSWORD" pg_restore \
    -h "$POSTGRES_HOST" \
    -U "$POSTGRES_USER" \
    -d "$POSTGRES_DB" \
    --clean \
    --no-owner \
    --if-exists \
    --exit-on-error \
    /usr/src/app/backup.dump

else
  echo "🗃️ Rodando migrations..."
  npm run migration:run
fi

echo "🚀 Subindo aplicação NestJS..."
exec npm run start:prod
