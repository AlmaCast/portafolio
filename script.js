/* ===== Render del catálogo (filas estilo Netflix) ===== */
const catalogEl = document.getElementById('catalog');

function cardMarkup(item) {
  const grad = `linear-gradient(150deg, ${item.color[0]}, ${item.color[1]})`;
  const bg = item.poster
    ? `background-image:url('${item.poster}');background-size:cover;background-position:center;`
    : `background:${grad};`;
  const badge = item.badge ? `<span class="card-badge">${item.badge}</span>` : '';
  // Solo los mp4 tienen preview en hover
  const preview = item.type === 'mp4'
    ? `<video class="card-preview" muted loop playsinline preload="none" data-src="${item.src}"></video>`
    : '';
  return `
    <article class="card" tabindex="0"
      data-type="${item.type}" data-src="${item.src}" data-drive="${item.drive || ''}"
      data-title="${item.title}" data-desc="${item.desc}">
      <div class="card-media" style="${bg}">
        ${preview}
        ${badge}
        <div class="card-play">▶</div>
        <div class="card-title-overlay">${item.title}</div>
      </div>
      <div class="card-meta"><h4>${item.title}</h4></div>
    </article>`;
}

function rowMarkup(section) {
  const cards = section.items.map(cardMarkup).join('');
  return `
    <section class="row ${section.layout}">
      <h3 class="row-title">${section.row}</h3>
      <div class="row-wrap">
        <button class="row-arrow left" aria-label="Anterior">‹</button>
        <div class="row-track">${cards}</div>
        <button class="row-arrow right" aria-label="Siguiente">›</button>
      </div>
    </section>`;
}

if (catalogEl && typeof CATALOG !== 'undefined') {
  catalogEl.innerHTML = CATALOG.map(rowMarkup).join('');
}

/* ===== Flechas de carrusel ===== */
document.querySelectorAll('.row-wrap').forEach((wrap) => {
  const track = wrap.querySelector('.row-track');
  const scrollBy = () => Math.max(track.clientWidth * 0.8, 240);
  wrap.querySelector('.left').addEventListener('click', () =>
    track.scrollBy({ left: -scrollBy(), behavior: 'smooth' })
  );
  wrap.querySelector('.right').addEventListener('click', () =>
    track.scrollBy({ left: scrollBy(), behavior: 'smooth' })
  );
});

/* ===== Preview en hover (estilo Netflix) ===== */
const supportsHover = window.matchMedia('(hover: hover)').matches;
if (supportsHover) {
  document.querySelectorAll('.card').forEach((card) => {
    const video = card.querySelector('.card-preview');
    if (!video) return;
    let timer = null;

    card.addEventListener('mouseenter', () => {
      timer = setTimeout(() => {
        if (!video.src) video.src = video.dataset.src; // carga diferida
        video.currentTime = 0;
        const p = video.play();
        if (p) p.then(() => card.classList.add('previewing')).catch(() => {});
      }, 450);
    });

    card.addEventListener('mouseleave', () => {
      clearTimeout(timer);
      card.classList.remove('previewing');
      video.pause();
    });
  });
}

/* ===== Modal de video ===== */
const modal = document.getElementById('modal');
const player = document.getElementById('modalPlayer');
const mTitle = document.getElementById('modalTitle');
const mDesc = document.getElementById('modalDesc');

function openModal(data) {
  mTitle.textContent = data.title;
  mDesc.textContent = data.desc;
  let html = '';
  if (data.type === 'mp4') {
    html = `<video src="${data.src}" controls autoplay playsinline></video>`;
  } else if (data.type === 'youtube') {
    html = `<iframe src="https://www.youtube.com/embed/${data.src}?autoplay=1" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
  } else if (data.type === 'tiktok') {
    html = `<iframe src="${data.src}" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
  } else {
    html = `<div class="modal-empty">🎬 Video próximamente</div>`;
  }
  player.innerHTML = html;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  player.innerHTML = '';
  document.body.style.overflow = '';
}

document.querySelectorAll('.card').forEach((card) => {
  const fire = () =>
    openModal({
      type: card.dataset.type,
      src: card.dataset.src,
      drive: card.dataset.drive,
      title: card.dataset.title,
      desc: card.dataset.desc,
    });
  card.addEventListener('click', fire);
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fire(); }
  });
});

modal.querySelectorAll('[data-close]').forEach((el) => el.addEventListener('click', closeModal));
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

/* ===== Nav: fondo sólido al hacer scroll ===== */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});
