#!/bin/bash
source "$(dirname "$0")/port.sh"
PORT="${1:-$PROSEPORT_PORT}"
MAX=3
n=0
while lsof -iTCP:"$PORT" -sTCP:LISTEN >/dev/null 2>&1 && [ "$n" -lt "$MAX" ]; do
  PIDS=$(lsof -t -iTCP:"$PORT" -sTCP:LISTEN 2>/dev/null | tr '\n' ' ')
  [ -z "$PIDS" ] && break
  echo "Cerrando proceso(s) en puerto $PORT: $PIDS"
  kill -9 $PIDS 2>/dev/null
  sleep 1
  n=$((n + 1))
done
if lsof -iTCP:"$PORT" -sTCP:LISTEN >/dev/null 2>&1; then
  echo "Aviso: el puerto $PORT sigue en uso. Cerrá otras terminales con npm/node."
  exit 1
fi
echo "Puerto $PORT libre."
