/* =========================================================================
   CATÁLOGO DE CONTENIDO  (estilo Netflix)
   -------------------------------------------------------------------------
   Para agregar/editar un video, modifica un bloque { ... }.
   Campos:
     title  -> título de la tarjeta
     desc   -> descripción (aparece en el reproductor)
     badge  -> etiqueta opcional ("SPOT", "REEL", "CORTO"...)
     poster -> portada "assets/portadas/x.jpg" (si vacío, usa gradiente)
     color  -> gradiente de respaldo ["#e63946", "#0b0f1a"]
     type   -> "mp4" | "youtube" | "tiktok" | "none"
     src    -> mp4: "assets/videos/archivo.mp4"

   layout: "portrait" (vertical 9:16) | "landscape" (horizontal 16:9)
   ========================================================================= */

const CATALOG = [
  {
    row: "Comerciales & Publicidad",
    layout: "portrait",
    items: [
      { title: "Mojito Wings · Spot", desc: "Spot publicitario — concepto, grabación y edición para Mojito Wings.", badge: "SPOT", poster: "assets/portadas/mojito-wings-spot.jpg", color: ["#e63946", "#1d1d2b"], type: "mp4", src: "assets/videos/mojito-wings-spot.mp4" },
      { title: "Mojito Wings · Exterior", desc: "Video para pantallas en exterior — Mojito Wings.", badge: "ADS", poster: "assets/portadas/mojito-wings-exterior.jpg", color: ["#1d7fb8", "#0b0f1a"], type: "mp4", src: "assets/videos/mojito-wings-exterior.mp4" },
      { title: "Coca-Cola · Zombies", desc: "Comercial Coca-Cola “Zombies” (+18) — proyecto audiovisual UAT.", badge: "COMERCIAL", poster: "assets/portadas/coca-cola-zombies.jpg", color: ["#9d4edd", "#0b0f1a"], type: "mp4", src: "assets/videos/coca-cola-zombies.mp4" },
      { title: "Vidriería Zamora", desc: "Comercial de marca — Vidriería Zamora.", badge: "", poster: "assets/portadas/vidrieria-zamora.jpg", color: ["#2a9d8f", "#0b0f1a"], type: "mp4", src: "assets/videos/vidrieria-zamora.mp4" },
      { title: "Construferia · Pantalla", desc: "Contenido para pantalla publicitaria — Construferia.", badge: "PANTALLA", poster: "assets/portadas/pantalla-construferia.jpg", color: ["#f4a261", "#1d1d2b"], type: "mp4", src: "assets/videos/pantalla-construferia.mp4" },
    ],
  },
  {
    row: "Reels & Contenido Vertical",
    layout: "portrait",
    items: [
      { title: "Jarrito · TikTok", desc: "Comercial vertical optimizado para TikTok/Reels — Jarrito.", badge: "REEL", poster: "assets/portadas/jarrito-tiktok.jpg", color: ["#e63946", "#1d1d2b"], type: "mp4", src: "assets/videos/jarrito-tiktok.mp4" },
    ],
  },
  {
    row: "Proyecto SEVEN",
    layout: "portrait",
    items: [
      { title: "SEVEN · Video Musical", desc: "Video musical de producto — proyecto SEVEN.", badge: "MÚSICA", poster: "assets/portadas/seven-producto-musical.jpg", color: ["#1d7fb8", "#0b0f1a"], type: "mp4", src: "assets/videos/seven-producto-musical.mp4" },
      { title: "SEVEN · Presentación", desc: "Video de presentación de marca — SEVEN.", badge: "", poster: "assets/portadas/seven-presentacion.jpg", color: ["#e63946", "#0b0f1a"], type: "mp4", src: "assets/videos/seven-presentacion.mp4" },
      { title: "SEVEN · Redes", desc: "Pieza para redes sociales — SEVEN.", badge: "", poster: "assets/portadas/seven-redes.jpg", color: ["#2a9d8f", "#1d1d2b"], type: "mp4", src: "assets/videos/seven-redes.mp4" },
    ],
  },
  {
    row: "Producción Audiovisual",
    layout: "portrait",
    items: [
      { title: "LUCAS · Cortometraje", desc: "Cortometraje “LUCAS” — dirección y producción audiovisual.", badge: "CORTO", poster: "assets/portadas/lucas-cortometraje.jpg", color: ["#457b9d", "#0b0f1a"], type: "mp4", src: "assets/videos/lucas-cortometraje.mp4" },
      { title: "Peso Visual", desc: "Proyecto audiovisual de narrativa y composición — Peso Visual.", badge: "", poster: "assets/portadas/peso-visual.jpg", color: ["#9d4edd", "#0b0f1a"], type: "mp4", src: "assets/videos/peso-visual.mp4" },
    ],
  },
];
