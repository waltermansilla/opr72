#!/bin/bash
# Descarga imágenes de prueba (Unsplash) a public/images/stock/
set -e
cd "$(dirname "$0")/.."
OUT="public/images/stock"
mkdir -p "$OUT"

download() {
  local file="$1"
  local url="$2"
  if [ -f "$OUT/$file" ] && [ -s "$OUT/$file" ]; then
    echo "  ok (exists) $file"
    return
  fi
  echo "  ↓ $file"
  curl -fsSL "$url" -o "$OUT/$file" || {
    echo "  ✗ falló $file"
    exit 1
  }
}

# IDs verificados (HTTP 200 en images.unsplash.com)
U() { echo "https://images.unsplash.com/photo-$1?w=$2&q=80&fit=crop"; }

echo "Descargando imágenes de stock…"

download "hero.jpg" "$(U 1569263979104-865ab7cd8d13 1920)"
download "about-main.jpg" "$(U 1578575437130-527eed3abbec 1200)"
download "about-secondary.jpg" "$(U 1586528116311-ad8dd3c8310d 1200)"
download "vision.jpg" "$(U 1544551763-46a013bb70d5 1920)"
download "services-bg.jpg" "$(U 1600880292203-757bb62b4baf 1920)"
download "contact-banner.jpg" "$(U 1486406146926-c627a92ad1ab 1200)"
download "contact-office.jpg" "$(U 1497366216548-37526070297c 1000)"
download "clients-header.jpg" "$(U 1566576912321-d58ddd7a6088 1200)"

download "client-01.jpg" "$(U 1586528116311-ad8dd3c8310d 800)"
download "client-02.jpg" "$(U 1600880292203-757bb62b4baf 800)"
download "client-03.jpg" "$(U 1578575437130-527eed3abbec 800)"
download "client-04.jpg" "$(U 1449965408869-eaa3f722e40d 800)"
download "client-05.jpg" "$(U 1566576912321-d58ddd7a6088 800)"
download "client-06.jpg" "$(U 1505142468610-359e7d316be0 800)"
download "client-07.jpg" "$(U 1473968512647-3e447244af8f 800)"
download "client-08.jpg" "$(U 1569263979104-865ab7cd8d13 800)"
download "client-09.jpg" "$(U 1544551763-46a013bb70d5 800)"
download "client-10.jpg" "$(U 1506905925346-21bda4d32df4 800)"

download "service-capacitacion.jpg" "$(U 1497366216548-37526070297c 1000)"
download "service-proteccion.jpg" "$(U 1559827260-dc66d52bef19 1000)"
download "service-salvamento.jpg" "$(U 1505142468610-359e7d316be0 1000)"
download "service-legales.jpg" "$(U 1450101499163-c8848c66ca85 1000)"
download "service-oficiales.jpg" "$(U 1473968512647-3e447244af8f 1000)"

download "link-uscg.jpg" "$(U 1559827260-dc66d52bef19 800)"
download "link-pna.jpg" "$(U 1544551763-46a013bb70d5 800)"
download "link-armada.jpg" "$(U 1569263979104-865ab7cd8d13 800)"
download "link-imo.jpg" "$(U 1506905925346-21bda4d32df4 800)"
download "link-ordenanzas.jpg" "$(U 1450101499163-c8848c66ca85 800)"

echo ""
echo "Listo: $OUT ($(ls -1 "$OUT"/*.jpg 2>/dev/null | wc -l | tr -d ' ') fotos)"
