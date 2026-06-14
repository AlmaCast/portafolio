#!/usr/bin/env bash
# Re-codifica los ORIGINALES (carpeta originales/) en alta calidad para web.
# Cortos/medianos: CRF 20 (calidad alta, tamaño razonable).
# Largos (LUCAS, PESO VISUAL): 2-pass con bitrate objetivo para caber en ~90MB.
set -e
cd "$(dirname "$0")"
O="originales"
G="$O/GESTIÓN DE PROYECTOS"
P="$O/PRODUCTOS AUDIOVISUALES"
OUT="assets/videos"

# CRF alta calidad (resolución nativa, sin reescalar)
hq() {  # hq <entrada> <slug>
  echo ">>> [CRF20] $2"
  ffmpeg -y -i "$1" -c:v libx264 -crf 20 -preset slow -pix_fmt yuv420p \
    -c:a aac -b:a 192k -movflags +faststart "$OUT/$2.mp4" -loglevel error -stats
}

# 2-pass para largos: <entrada> <slug> <kbps_video>
twopass() {
  echo ">>> [2pass ${3}k] $2"
  ffmpeg -y -i "$1" -c:v libx264 -b:v "${3}k" -pass 1 -passlogfile "$OUT/_pl_$2" \
    -preset slow -an -f mp4 /dev/null -loglevel error -stats
  ffmpeg -y -i "$1" -c:v libx264 -b:v "${3}k" -pass 2 -passlogfile "$OUT/_pl_$2" \
    -preset slow -pix_fmt yuv420p -c:a aac -b:a 128k -movflags +faststart \
    "$OUT/$2.mp4" -loglevel error -stats
}

hq "$G/SEVEN PRODUCTO video musical.mp4"            "seven-producto-musical"
hq "$G/SEVEN redes video 2.mp4"                     "seven-redes"
hq "$G/SEVEN video presentacion .mp4"               "seven-presentacion"
hq "$P/Coca cola zombies comercial +18 (UAT).mp4"   "coca-cola-zombies"
hq "$P/Comercial jarrito tiktok.mov"                "jarrito-tiktok"
hq "$P/MOJITO WINGS SPOT CORREGIDO.mp4"             "mojito-wings-spot"
hq "$P/MOJITO WINGS Video al exterior corregido.mp4" "mojito-wings-exterior"
hq "$P/PANTALLA CONSTRUFERIA.mp4"                   "pantalla-construferia"
hq "$P/vidrieria zamora.mp4"                        "vidrieria-zamora"
# Largos -> 2-pass para caber en ~90MB en 1080p ajustado
twopass "$P/LUCAS CORTOMETRAJE.mp4"                 "lucas-cortometraje" 1750
twopass "$P/PESO VISUAL.mp4"                        "peso-visual"        2000

rm -f "$OUT"/_pl_*.log "$OUT"/_pl_*.log.mbtree 2>/dev/null || true
echo "=== TAMAÑOS FINALES (MB) ==="
ls -la "$OUT"/*.mp4 | awk '{printf "%.1f\t%s\n", $5/1048576, $9}'
