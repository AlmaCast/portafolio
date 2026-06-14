/* =========================================================================
   CATÁLOGO DE CONTENIDO  (estilo Netflix)
   -------------------------------------------------------------------------
   Cómo agregar un video nuevo:
   1. Copia un bloque { ... } dentro de la fila (row) que quieras.
   2. Campos:
        title  -> título de la tarjeta
        desc   -> descripción corta (aparece en el reproductor)
        badge  -> etiqueta opcional (ej. "TV", "REEL", "2025")
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
        "landscape" -> tarjetas horizontales 16:9 (comerciales, TV, edición)
   ========================================================================= */

const CATALOG = [
  {
    row: "Marketing Digital · MN Home Center",
    layout: "landscape",
    items: [
      { title: "Campaña Redes 2026", desc: "Estrategia de contenido con KPI's de Meta.", badge: "META", poster: "", color: ["#e63946", "#1d1d2b"], type: "none", src: "" },
      { title: "Pantallas Publicitarias", desc: "Contenido para pantallas en tienda.", badge: "ADS", poster: "", color: ["#1d7fb8", "#0b0f1a"], type: "none", src: "" },
      { title: "Producción de Video", desc: "Preproducción, producción y postproducción.", badge: "", poster: "", color: ["#2a9d8f", "#0b0f1a"], type: "none", src: "" },
      { title: "Reel de Producto", desc: "Contenido para redes sociales.", badge: "", poster: "", color: ["#9d4edd", "#0b0f1a"], type: "none", src: "" },
    ],
  },
  {
    row: "Contenido para Redes · Reels",
    layout: "portrait",
    items: [
      { title: "Tendencias", desc: "Contenido del programa “Tendencias” (City Channel).", badge: "REEL", poster: "", color: ["#e63946", "#1d1d2b"], type: "none", src: "" },
      { title: "Reel Vertical", desc: "Edición dinámica para redes.", badge: "", poster: "", color: ["#1d7fb8", "#0b0f1a"], type: "none", src: "" },
      { title: "Short Promocional", desc: "Pieza corta de alto impacto.", badge: "", poster: "", color: ["#9d4edd", "#0b0f1a"], type: "none", src: "" },
      { title: "Behind Scenes", desc: "Detrás de cámaras.", badge: "", poster: "", color: ["#2a9d8f", "#0b0f1a"], type: "none", src: "" },
      { title: "Trend Edit", desc: "Edición sobre tendencia.", badge: "", poster: "", color: ["#f4a261", "#1d1d2b"], type: "none", src: "" },
    ],
  },
  {
    row: "Televisión · City Channel",
    layout: "landscape",
    items: [
      { title: "Programa Tendencias", desc: "Grabación y edición de contenido televisivo.", badge: "TV", poster: "", color: ["#457b9d", "#0b0f1a"], type: "none", src: "" },
      { title: "Programación Pagada", desc: "Apoyo en edición de programación pagada.", badge: "", poster: "", color: ["#e63946", "#0b0f1a"], type: "none", src: "" },
      { title: "Cápsula Informativa", desc: "Contenido para televisión.", badge: "", poster: "", color: ["#2a9d8f", "#1d1d2b"], type: "none", src: "" },
    ],
  },
  {
    row: "Comerciales & Voz en Off",
    layout: "landscape",
    items: [
      { title: "Comercial", desc: "Creación de comerciales: audiovisual y narrativa.", badge: "SPOT", poster: "", color: ["#f4a261", "#1d1d2b"], type: "none", src: "" },
      { title: "Voz en Off", desc: "Locución para piezas audiovisuales.", badge: "VOZ", poster: "", color: ["#1d7fb8", "#0b0f1a"], type: "none", src: "" },
      { title: "Diagnóstico H. María Elena", desc: "Comunicación interna (abr–may 2023).", badge: "2023", poster: "", color: ["#e63946", "#0b0f1a"], type: "none", src: "" },
      { title: "Narrativa Audiovisual", desc: "Guion y narrativa para video.", badge: "", poster: "", color: ["#9d4edd", "#0b0f1a"], type: "none", src: "" },
    ],
  },
];
