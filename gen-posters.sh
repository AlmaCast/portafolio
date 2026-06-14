#!/usr/bin/env bash
# Genera pósters verticales estilo Netflix (frame + degradado + título + logo A)
# para los videos que aún no tienen portada personalizada.
set -e
cd "$(dirname "$0")"
CHROME="/c/Program Files/Google/Chrome/Application/chrome.exe"
TMP="assets/_postergen"
mkdir -p "$TMP" assets/portadas

# slug | seek(seg) | badge | título | subtítulo
ENTRIES='
mojito-wings-exterior|8|PUBLICIDAD|MOJITO WINGS|Video para pantallas en exterior
coca-cola-zombies|30|COMERCIAL|COCA-COLA: ZOMBIES|Comercial +18 · Proyecto UAT
vidrieria-zamora|20|COMERCIAL|VIDRIERÍA ZAMORA|Comercial de marca
pantalla-construferia|8|PANTALLA|CONSTRUFERIA|Contenido para pantalla publicitaria
jarrito-tiktok|6|REEL|JARRITO|Comercial vertical para TikTok
seven-producto-musical|30|MÚSICA|SEVEN|Video musical de producto
seven-presentacion|30|MARCA|SEVEN|Video de presentación
seven-redes|20|SOCIAL|SEVEN|Contenido para redes sociales
lucas-cortometraje|120|CORTO|LUCAS|Cortometraje · Producción audiovisual
peso-visual|120|AUDIOVISUAL|PESO VISUAL|Narrativa y composición
'

write_html() {
  local slug="$1" badge="$2" title="$3" sub="$4"
  cat > "$TMP/$slug.html" <<HTML
<!doctype html><html lang="es"><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Oswald:wght@500;600&display=swap" rel="stylesheet">
<style>
*{margin:0;box-sizing:border-box}
html,body{width:720px;height:1280px;overflow:hidden;background:#05070d}
.poster{position:relative;width:720px;height:1280px;font-family:'Oswald',sans-serif;color:#fff}
.bg{position:absolute;inset:0;background:url('$slug-bg.jpg') center/cover}
.shade{position:absolute;inset:0;background:
  linear-gradient(180deg,rgba(5,7,13,.55) 0%,rgba(5,7,13,0) 32%,rgba(5,7,13,.55) 66%,rgba(5,7,13,.97) 100%)}
.logo{position:absolute;top:44px;left:48px;display:flex;align-items:center;gap:14px}
.logo img{width:60px;height:60px;filter:drop-shadow(0 3px 10px rgba(0,0,0,.7))}
.logo span{font-family:'Bebas Neue';font-size:32px;letter-spacing:4px}
.bottom{position:absolute;left:52px;right:52px;bottom:96px}
.badge{display:inline-block;background:#e63946;font-size:19px;letter-spacing:3px;padding:7px 17px;border-radius:6px;margin-bottom:20px}
.title{font-family:'Bebas Neue';font-size:104px;line-height:.9;letter-spacing:2px;text-shadow:0 6px 32px rgba(0,0,0,.7)}
.sub{font-size:27px;color:#dbe2ee;margin-top:16px;font-weight:500;text-shadow:0 2px 12px rgba(0,0,0,.8)}
.foot{position:absolute;bottom:40px;left:52px;font-family:'Bebas Neue';font-size:24px;letter-spacing:4px;color:#aab4c6}
</style></head><body>
<div class="poster">
  <div class="bg"></div><div class="shade"></div>
  <div class="logo"><img src="../marca/logo-blanco.png"><span>ALMA C.</span></div>
  <div class="bottom"><span class="badge">$badge</span><div class="title">$title</div><div class="sub">$sub</div></div>
  <div class="foot">PORTAFOLIO 2025</div>
</div></body></html>
HTML
}

echo "$ENTRIES" | while IFS='|' read -r slug seek badge title sub; do
  [ -z "$slug" ] && continue
  echo ">>> $slug"
  ffmpeg -y -ss "$seek" -i "assets/videos/$slug.mp4" -frames:v 1 -vf "scale=720:-2" -q:v 2 "$TMP/$slug-bg.jpg" -loglevel error
  write_html "$slug" "$badge" "$title" "$sub"
  "$CHROME" --headless=new --disable-gpu --no-sandbox --hide-scrollbars \
    --virtual-time-budget=4000 --window-size=720,1280 \
    --user-data-dir="$TMP/cd" --screenshot="$TMP/$slug.png" \
    "file:///$(pwd)/$TMP/$slug.html" 2>/dev/null
  ffmpeg -y -i "$TMP/$slug.png" -q:v 3 "assets/portadas/$slug.jpg" -loglevel error
  echo "    portada lista: assets/portadas/$slug.jpg"
done

rm -rf "$TMP"
echo "=== TODOS LOS PÓSTERS GENERADOS ==="
