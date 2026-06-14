/* =========================================================================
   CATÁLOGO DE CONTENIDO  (estilo Netflix)
   -------------------------------------------------------------------------
   Campos:
     title  -> título de la tarjeta
     desc   -> descripción (aparece en el reproductor)
     badge  -> etiqueta opcional ("SPOT", "REEL", "CORTO"...)
     poster -> portada "assets/portadas/x.jpg"
     src    -> mp4 local LIGERO para el preview en hover ("assets/videos/x.mp4")
     drive  -> ID del archivo en Google Drive (reproducción en calidad original al hacer clic)
              Para obtener el ID: en Drive -> clic derecho -> Compartir -> "Cualquiera con el enlace"
              el ID es la parte de la URL: drive.google.com/file/d/<ESTE_ID>/view
     type   -> "mp4" (preview local en hover)

   layout: "portrait" (vertical 9:16) | "landscape" (horizontal 16:9)
   ========================================================================= */

const CATALOG = [
  {
    row: "Comerciales & Publicidad",
    layout: "portrait",
    items: [
      { title: "Mojito Wings · Spot", desc: "Spot publicitario — concepto, grabación y edición para Mojito Wings.", badge: "SPOT", poster: "assets/portadas/mojito-wings-spot.jpg", color: ["#e63946", "#1d1d2b"], type: "mp4", src: "assets/videos/mojito-wings-spot.mp4", drive: "1WoTHosarHzKpchgc60vHIg_d1ieXQUpI" },
      { title: "Mojito Wings · Exterior", desc: "Video para pantallas en exterior — Mojito Wings.", badge: "ADS", poster: "assets/portadas/mojito-wings-exterior.jpg", color: ["#1d7fb8", "#0b0f1a"], type: "mp4", src: "assets/videos/mojito-wings-exterior.mp4", drive: "1qRVG2uHFmFtGx5vt7JG6kgoXTRgjB1V7" },
      { title: "Coca-Cola · Zombies", desc: "Comercial Coca-Cola “Zombies” (+18) — proyecto audiovisual UAT.", badge: "COMERCIAL", poster: "assets/portadas/coca-cola-zombies.jpg", color: ["#9d4edd", "#0b0f1a"], type: "mp4", src: "assets/videos/coca-cola-zombies.mp4", drive: "1xvfpPQC-feWF3tQ9FBTiVbJVg7rzO88Q" },
      { title: "Vidriería Zamora", desc: "Comercial de marca — Vidriería Zamora.", badge: "", poster: "assets/portadas/vidrieria-zamora.jpg", color: ["#2a9d8f", "#0b0f1a"], type: "mp4", src: "assets/videos/vidrieria-zamora.mp4", drive: "1RBiWAz7w2hOWbSq4DmGy_1wfgpZSoA8N" },
      { title: "Construferia · Pantalla", desc: "Contenido para pantalla publicitaria — Construferia.", badge: "PANTALLA", poster: "assets/portadas/pantalla-construferia.jpg", color: ["#f4a261", "#1d1d2b"], type: "mp4", src: "assets/videos/pantalla-construferia.mp4", drive: "1qtplFJt6c8U13s2EbEFw1tJ1Jy6wztim" },
    ],
  },
  {
    row: "Reels & Contenido Vertical",
    layout: "portrait",
    items: [
      { title: "Jarrito · TikTok", desc: "Comercial vertical optimizado para TikTok/Reels — Jarrito.", badge: "REEL", poster: "assets/portadas/jarrito-tiktok.jpg", color: ["#e63946", "#1d1d2b"], type: "mp4", src: "assets/videos/jarrito-tiktok.mp4", drive: "1dgLUL8Dvmo0jnJWum5f7W1RfDhgFaRjH" },
    ],
  },
  {
    row: "Proyecto SEVEN",
    layout: "portrait",
    items: [
      { title: "SEVEN · Video Musical", desc: "Video musical de producto — proyecto SEVEN.", badge: "MÚSICA", poster: "assets/portadas/seven-producto-musical.jpg", color: ["#1d7fb8", "#0b0f1a"], type: "mp4", src: "assets/videos/seven-producto-musical.mp4", drive: "1lSp-zCiDNC4ItnD7wCjQBkK555cbyoPc" },
      { title: "SEVEN · Presentación", desc: "Video de presentación de marca — SEVEN.", badge: "", poster: "assets/portadas/seven-presentacion.jpg", color: ["#e63946", "#0b0f1a"], type: "mp4", src: "assets/videos/seven-presentacion.mp4", drive: "13-RETCtsqWGgcZujBskfx53krFs1AtYQ" },
      { title: "SEVEN · Redes", desc: "Pieza para redes sociales — SEVEN.", badge: "", poster: "assets/portadas/seven-redes.jpg", color: ["#2a9d8f", "#1d1d2b"], type: "mp4", src: "assets/videos/seven-redes.mp4", drive: "1CRjRtVH6JyLobasTgthlw3u0nhB5MayB" },
    ],
  },
  {
    row: "Producción Audiovisual",
    layout: "portrait",
    items: [
      { title: "LUCAS · Cortometraje", desc: "Cortometraje “LUCAS” — dirección y producción audiovisual.", badge: "CORTO", poster: "assets/portadas/lucas-cortometraje.jpg", color: ["#457b9d", "#0b0f1a"], type: "mp4", src: "assets/videos/lucas-cortometraje.mp4", drive: "1QorfVYhtDaz4Y9IMGIR5imlP1KcIpOFp" },
      { title: "Peso Visual", desc: "Proyecto audiovisual de narrativa y composición — Peso Visual.", badge: "", poster: "assets/portadas/peso-visual.jpg", color: ["#9d4edd", "#0b0f1a"], type: "mp4", src: "assets/videos/peso-visual.mp4", drive: "11xJCqRpkz7tAFi8s9y5A2bzdUE9GNkp8" },
    ],
  },
];
