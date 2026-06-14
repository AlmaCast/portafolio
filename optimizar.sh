#!/usr/bin/env bash
# Optimiza los videos para web (H.264 + faststart) con nombres limpios.
set -e
cd "$(dirname "$0")/assets/videos"
mkdir -p web

enc() {  # enc <entrada> <salida-slug> <crf> <escala_o_vacio>
  local in="$1" out="web/$2.mp4" crf="$3" scale="$4"
  local vf=""
  [ -n "$scale" ] && vf="-vf scale=$scale"
  echo ">>> $2"
  ffmpeg -y -i "$in" $vf -c:v libx264 -crf "$crf" -preset medium -pix_fmt yuv420p \
    -c:a aac -b:a 128k -movflags +faststart "$out" -loglevel error -stats
}

G="GESTIÓN DE PROYECTOS"
P="PRODUCTOS AUDIOVISUALES"

enc "$G/SEVEN PRODUCTO video musical.mp4"            "seven-producto-musical" 26 ""
enc "$G/SEVEN redes video 2.mp4"                     "seven-redes"            26 ""
enc "$G/SEVEN video presentacion .mp4"               "seven-presentacion"     26 ""
enc "$P/Coca cola zombies comercial +18 (UAT).mp4"   "coca-cola-zombies"      26 ""
enc "$P/Comercial jarrito tiktok.mov"                "jarrito-tiktok"         26 ""
enc "$P/MOJITO WINGS SPOT CORREGIDO.mp4"             "mojito-wings-spot"      26 ""
enc "$P/MOJITO WINGS Video al exterior corregido.mp4" "mojito-wings-exterior" 26 ""
enc "$P/PANTALLA CONSTRUFERIA.mp4"                   "pantalla-construferia"  26 ""
enc "$P/vidrieria zamora.mp4"                        "vidrieria-zamora"       26 ""
# Largos -> 720p para reducir peso
enc "$P/LUCAS CORTOMETRAJE.mp4"                      "lucas-cortometraje"     28 "-2:720"
enc "$P/PESO VISUAL.mp4"                             "peso-visual"            28 "-2:720"

echo "=== LISTO. Resultados: ==="
ls -la web/
