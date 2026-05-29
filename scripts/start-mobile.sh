#!/bin/bash
cd "$(dirname "$0")/.."
source "$(dirname "$0")/port.sh"
bash scripts/free-port.sh "$PROSEPORT_PORT"
bash scripts/show-mobile-url.sh "$PROSEPORT_PORT"
echo "Servidor en http://127.0.0.1:$PROSEPORT_PORT"
exec npx next start -H 0.0.0.0 -p "$PROSEPORT_PORT"
