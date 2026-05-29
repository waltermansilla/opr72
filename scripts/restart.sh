#!/bin/bash
cd "$(dirname "$0")/.."
source "$(dirname "$0")/port.sh"

echo "Cerrando servidor viejo en puerto $PROSEPORT_PORT..."
bash scripts/free-port.sh "$PROSEPORT_PORT"

echo ""
echo "Compilando..."
npm run build || exit 1

echo ""
echo "════════════════════════════════════════"
echo "  Abrí: http://127.0.0.1:$PROSEPORT_PORT"
echo "════════════════════════════════════════"
bash scripts/show-mobile-url.sh "$PROSEPORT_PORT"
echo "(Dejá esta ventana abierta)"
echo ""

exec npx next start -H 0.0.0.0 -p "$PROSEPORT_PORT"
