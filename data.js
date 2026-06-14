/* =========================================================================
   CATÁLOGO DE CONTENIDO  (estilo Netflix)
   -------------------------------------------------------------------------
   Cómo agregar un video nuevo:
   1. Copia un bloque { ... } dentro de la fila (row) que quieras.
   2. Campos:
        title  -> título de la tarjeta
        desc   -> descripción corta (aparece en el reproductor)
        badge  -> etiqueta opcional (ej. "VIRAL", "ADS", "2025")
        poster -> imagen de portada:  "assets/portada.jpg"
                  (si lo dejas vacío, usa el gradiente 'color')
        color  -> gradiente de respaldo  ["#e63946", "#0b0f1a"]
        type   -> "mp4"  |  "youtube"  |  "tiktok"  |  "none"
        src    -> según type:
                    mp4     -> "assets/videos/mi-video.mp4"
                    youtube -> "ID_DEL_VIDEO"  (lo que va después de v=)
                    tiktok  -> "URL completa del TikTok"
                    none    -> "" (solo muestra portada, sin reproductor)

   layout de la fila:
        "portrait"  -> tarjetas verticales 9:16 (reels, shorts, tiktoks)
        "landscape" -> tarjetas horizontales 16:9 (campañas, edición, ads)
   ========================================================================= */

const CATALOG = [
  {
    row: "Reels & Shorts más vistos",
    layout: "portrait",
    items: [
      { title: "Reel Viral 1", desc: "Reel con +500K reproducciones.", badge: "VIRAL", poster: "", color: ["#e63946", "#1d1d2b"], type: "none", src: "" },
      { title: "Short Producto", desc: "Lanzamiento de producto.", badge: "ADS", poster: "", color: ["#1d7fb8", "#0b0f1a"], type: "none", src: "" },
      { title: "Trend Edit", desc: "Edición sobre tendencia.", badge: "", poster: "", color: ["#9d4edd", "#0b0f1a"], type: "none", src: "" },
      { title: "Behind Scenes", desc: "Detrás de cámaras.", badge: "", poster: "", color: ["#2a9d8f", "#0b0f1a"], type: "none", src: "" },
      { title: "Testimonio", desc: "Cliente satisfecho.", badge: "", poster: "", color: ["#f4a261", "#1d1d2b"], type: "none", src: "" },
      { title: "Reel Viral 2", desc: "Otro éxito.", badge: "VIRAL", poster: "", color: ["#e76f51", "#0b0f1a"], type: "none", src: "" },
    ],
  },
  {
    row: "Campañas & Anuncios",
    layout: "landscape",
    items: [
      { title: "Campaña Marca A", desc: "Estrategia 360° con +3x ROAS.", badge: "CASO DE ÉXITO", poster: "", color: ["#e63946", "#1d1d2b"], type: "none", src: "" },
      { title: "Video Ads", desc: "Anuncio para Meta Ads.", badge: "ADS", poster: "", color: ["#457b9d", "#0b0f1a"], type: "none", src: "" },
      { title: "Lanzamiento", desc: "Campaña de lanzamiento.", badge: "", poster: "", color: ["#2a9d8f", "#0b0f1a"], type: "none", src: "" },
      { title: "Promo Temporada", desc: "Campaña estacional.", badge: "", poster: "", color: ["#9d4edd", "#0b0f1a"], type: "none", src: "" },
      { title: "Spot 15s", desc: "Spot corto de alto impacto.", badge: "", poster: "", color: ["#f4a261", "#1d1d2b"], type: "none", src: "" },
    ],
  },
  {
    row: "Edición & Motion",
    layout: "landscape",
    items: [
      { title: "Motion Graphics", desc: "Animación con After Effects.", badge: "MOTION", poster: "", color: ["#1d7fb8", "#0b0f1a"], type: "none", src: "" },
      { title: "Color Grading", desc: "Corrección de color cinematográfica.", badge: "", poster: "", color: ["#e63946", "#0b0f1a"], type: "none", src: "" },
      { title: "Edit Dinámico", desc: "Edición rítmica al beat.", badge: "", poster: "", color: ["#2a9d8f", "#1d1d2b"], type: "none", src: "" },
      { title: "Intro Animada", desc: "Intro de marca.", badge: "", poster: "", color: ["#9d4edd", "#0b0f1a"], type: "none", src: "" },
    ],
  },
  {
    row: "Branding & Diseño",
    layout: "landscape",
    items: [
      { title: "Identidad Visual", desc: "Branding completo.", badge: "BRANDING", poster: "", color: ["#f4a261", "#1d1d2b"], type: "none", src: "" },
      { title: "Carrusel IG", desc: "Carrusel educativo.", badge: "", poster: "", color: ["#1d7fb8", "#0b0f1a"], type: "none", src: "" },
      { title: "Key Visual", desc: "Pieza gráfica principal.", badge: "", poster: "", color: ["#e63946", "#0b0f1a"], type: "none", src: "" },
      { title: "Plantillas", desc: "Sistema de plantillas.", badge: "", poster: "", color: ["#2a9d8f", "#0b0f1a"], type: "none", src: "" },
    ],
  },
];
