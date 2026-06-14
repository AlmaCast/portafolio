#!/usr/bin/env bash
# Genera portadas (un frame) de cada video + imagen Open Graph para redes.
set -e
cd "$(dirname "$0")"
mkdir -p assets/portadas
cp /c/Windows/Fonts/ARIALBD.TTF _font.ttf

# --- Portadas de cada video (frame a los ~2s) ---
for f in assets/videos/*.mp4; do
  name=$(basename "$f" .mp4)
  # vertical (jarrito) más angosto
  if [ "$name" = "jarrito-tiktok" ]; then sc="480:-2"; else sc="640:-2"; fi
  ffmpeg -y -ss 00:00:02 -i "$f" -frames:v 1 -vf "scale=$sc" -q:v 4 \
    "assets/portadas/$name.jpg" -loglevel error
  echo "portada: $name"
done

# --- Imagen Open Graph (1200x630) ---
ffmpeg -y -f lavfi -i "color=c=0x070b16:s=1200x630" -frames:v 1 -vf "\
drawtext=fontfile=_font.ttf:text='ALMA CASTELLANOS':fontcolor=white:fontsize=92:x=90:y=200,\
drawtext=fontfile=_font.ttf:text='Marketing Digital \& Producci\xc3\xb3n Audiovisual':fontcolor=0x9aa6bd:fontsize=34:x=92:y=315,\
drawtext=fontfile=_font.ttf:text='PORTAFOLIO 2025':fontcolor=0xe63946:fontsize=46:x=92:y=380,\
drawbox=x=90:y=185:w=8:h=240:color=0xe63946:t=fill\
" assets/og-cover.jpg -loglevel error
echo "og-cover listo"

rm -f _font.ttf
echo "=== Resultado ==="
ls -la assets/portadas/ | tail -12
ls -la assets/og-cover.jpg
