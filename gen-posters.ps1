# Genera posters verticales estilo Netflix (frame + degradado + titulo + logo A)
$ErrorActionPreference = "Continue"
$dir = "C:\Users\carlo\Pictures\Desarollos para usuarios\Alma\portafolio"
$chrome = "C:\Program Files\Google\Chrome\Application\chrome.exe"
$tmp = Join-Path $dir "assets\_postergen"
New-Item -ItemType Directory -Force -Path $tmp | Out-Null

# Matar SOLO instancias headless de Chrome que quedaron colgadas (no el navegador normal)
Get-CimInstance Win32_Process -Filter "Name='chrome.exe'" -ErrorAction SilentlyContinue |
  Where-Object { $_.CommandLine -match 'headless' } |
  ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }
Start-Sleep -Milliseconds 500

# Solo los que siguen siendo automaticos (las portadas personalizadas NO se tocan)
$entries = @(
  @{slug="pantalla-construferia"; seek=8;   badge="PANTALLA";   title="CONSTRUFERIA";       sub="Contenido para pantalla publicitaria"}
  @{slug="jarrito-tiktok";        seek=6;   badge="REEL";       title="JARRITO";            sub="Comercial vertical para TikTok"}
  @{slug="seven-producto-musical";seek=30;  badge="MUSICA";     title="SEVEN";              sub="Video musical de producto"}
  @{slug="seven-presentacion";    seek=30;  badge="MARCA";      title="SEVEN";              sub="Video de presentacion"}
  @{slug="seven-redes";           seek=20;  badge="SOCIAL";     title="SEVEN";              sub="Contenido para redes sociales"}
  @{slug="lucas-cortometraje";    seek=120; badge="CORTO";      title="LUCAS";              sub="Cortometraje - Produccion audiovisual"}
)

foreach ($e in $entries) {
  $slug = $e.slug
  Write-Host ">>> $slug"
  $bg = Join-Path $tmp "$slug-bg.jpg"
  & ffmpeg -y -ss $e.seek -i (Join-Path $dir "assets\videos\$slug.mp4") -frames:v 1 -vf "scale=720:-2" -q:v 2 $bg -loglevel error

  $html = @"
<!doctype html><html lang="es"><head><meta charset="utf-8"><style>
*{margin:0;box-sizing:border-box}
html,body{width:720px;height:1280px;overflow:hidden;background:#05070d}
.poster{position:relative;width:720px;height:1280px;color:#fff;font-family:Arial,sans-serif}
.bg{position:absolute;inset:0;background:url('$slug-bg.jpg') center/cover}
.shade{position:absolute;inset:0;background:linear-gradient(180deg,rgba(5,7,13,.55) 0%,rgba(5,7,13,0) 30%,rgba(5,7,13,.55) 64%,rgba(5,7,13,.97) 100%)}
.logo{position:absolute;top:44px;left:48px;display:flex;align-items:center;gap:14px}
.logo img{width:62px;height:62px;filter:drop-shadow(0 3px 10px rgba(0,0,0,.7))}
.logo span{font-family:'Arial Black';font-size:30px;letter-spacing:3px}
.bottom{position:absolute;left:52px;right:52px;bottom:96px}
.badge{display:inline-block;background:#e63946;font-family:'Arial Black';font-size:18px;letter-spacing:2px;padding:8px 16px;border-radius:6px;margin-bottom:20px}
.title{font-family:'Arial Black';font-size:88px;line-height:.92;letter-spacing:-1px;text-transform:uppercase;text-shadow:0 6px 32px rgba(0,0,0,.8)}
.sub{font-size:27px;color:#dbe2ee;margin-top:16px;font-weight:bold;text-shadow:0 2px 12px rgba(0,0,0,.9)}
.foot{position:absolute;bottom:40px;left:52px;font-family:'Arial Black';font-size:20px;letter-spacing:3px;color:#aab4c6}
</style></head><body>
<div class="poster"><div class="bg"></div><div class="shade"></div>
<div class="logo"><img src="../marca/logo-blanco.png"><span>ALMA C.</span></div>
<div class="bottom"><span class="badge">$($e.badge)</span><div class="title">$($e.title)</div><div class="sub">$($e.sub)</div></div>
<div class="foot">PORTAFOLIO 2026</div></div></body></html>
"@
  $htmlPath = Join-Path $tmp "$slug.html"
  Set-Content -Path $htmlPath -Value $html -Encoding UTF8
  $url = "file:///" + $htmlPath.Replace('\','/').Replace(' ','%20')
  $png = Join-Path $tmp "$slug.png"
  & $chrome --headless=new --disable-gpu --no-sandbox --hide-scrollbars --window-size=720,1280 --user-data-dir="$env:TEMP\chrome-poster" --screenshot="$png" $url 2>$null | Out-Null
  Start-Sleep -Milliseconds 500
  Get-CimInstance Win32_Process -Filter "Name='chrome.exe'" -ErrorAction SilentlyContinue |
    Where-Object { $_.CommandLine -match 'headless' } |
    ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }
  & ffmpeg -y -i $png -q:v 3 (Join-Path $dir "assets\portadas\$slug.jpg") -loglevel error
  Write-Host "    OK: $slug.jpg"
}

Remove-Item -Recurse -Force $tmp
Write-Host "=== POSTERS LISTOS ==="
