#!/bin/bash
source "$(dirname "$0")/port.sh"
PORT="${1:-$PROSEPORT_PORT}"

# Varias formas de obtener la IP en macOS
IP=$(ipconfig getifaddr en0 2>/dev/null)
[ -z "$IP" ] && IP=$(ipconfig getifaddr en1 2>/dev/null)
[ -z "$IP" ] && IP=$(networksetup -getinfo Wi-Fi 2>/dev/null | awk '/IP address/ {print $3}')
[ -z "$IP" ] && IP=$(scutil --nwi 2>/dev/null | awk '/address/ {print $3; exit}')

echo ""
echo "════════════════════════════════════════"
echo "  CELULAR — misma WiFi que esta Mac"
echo "════════════════════════════════════════"
if [ -n "$IP" ]; then
  echo ""
  echo "  Copiá EXACTO en Safari del iPhone:"
  echo ""
  echo "  http://${IP}:${PORT}"
  echo ""
else
  echo ""
  echo "  1. Mac →  (menú Apple) Preferencias del Sistema → Red → Wi-Fi"
  echo "  2. Anotá la IP (ej: 192.168.0.105)"
  echo "  3. En el iPhone Safari escribí:"
  echo ""
  echo "     http://ESA-IP:${PORT}"
  echo ""
  echo "  (Tiene que empezar con http:// )"
fi
echo "════════════════════════════════════════"
echo ""
