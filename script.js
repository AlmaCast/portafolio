/* ===== Render del catálogo (filas estilo Netflix) ===== */
const catalogEl = document.getElementById('catalog');

function cardMarkup(item) {
  const grad = `linear-gradient(150deg, ${item.color[0]}, ${item.color[1]})`;
  const bg = item.poster
    ? `background-image:url('${item.poster}');background-size:cover;background-position:center;`
    : `background:${grad};`;
  const badge = item.badge ? `<span class="card-badge">${item.badge}</span>` : '';
  return `
    <article class="card" tabindex="0"
      data-type="${item.type}" data-src="${item.src}" data-drive="${item.drive || ''}"
      data-vertical="${item.vertical ? 'true' : 'false'}" data-badge="${item.badge || ''}"
      data-title="${item.title}" data-desc="${item.desc}">
      <div class="card-media" style="${bg}">
        ${badge}
        <div class="card-play">▶</div>
      </div>
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
  const amount = () => Math.max(track.clientWidth * 0.8, 240);
  wrap.querySelector('.left').addEventListener('click', () =>
    track.scrollBy({ left: -amount(), behavior: 'smooth' })
  );
  wrap.querySelector('.right').addEventListener('click', () =>
    track.scrollBy({ left: amount(), behavior: 'smooth' })
  );
});

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
function openModalFromCard(card) {
  openModal({ type: card.dataset.type, src: card.dataset.src, title: card.dataset.title, desc: card.dataset.desc });
}
function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  player.innerHTML = '';
  document.body.style.overflow = '';
}

/* ===== Preview popup que se ensancha al video (estilo Netflix) ===== */
const supportsHover = window.matchMedia('(hover: hover)').matches;
const pop = document.getElementById('previewPop');
const popVideo = pop.querySelector('.pp-video');
const popMedia = pop.querySelector('.pp-media');
const popBadge = pop.querySelector('.pp-badge');
const popTitle = pop.querySelector('.pp-title');
let popCard = null, popTrack = null, enterTimer = null, leaveTimer = null;
const INFO_H = 78; // alto de la barra de info del popup

function resetSiblings() {
  if (popTrack) popTrack.querySelectorAll('.card').forEach((c) => { c.style.transform = ''; });
  popTrack = null;
}

function showPop(card) {
  resetSiblings();
  popCard = card;
  const wide = card.dataset.vertical !== 'true';
  popMedia.classList.toggle('vertical', !wide);
  popTitle.textContent = card.dataset.title;
  popBadge.textContent = card.dataset.badge || '';
  popBadge.style.display = card.dataset.badge ? '' : 'none';
  if (popVideo.dataset.src !== card.dataset.src) { popVideo.src = card.dataset.src; popVideo.dataset.src = card.dataset.src; }
  popVideo.currentTime = 0;
  popVideo.play().catch(() => {});

  const r = card.getBoundingClientRect();
  const H = r.height; // alto del póster: la versión grande cubre este alto
  let w;
  if (wide) {
    // video 16:9 arriba + info abajo, ocupando el MISMO alto del póster
    w = (H - INFO_H) * 16 / 9;
  } else {
    // vertical: se queda casi igual, solo crece un poco
    w = r.width * 1.18;
  }
  pop.style.width = w + 'px';

  // Anclado a la fila: mismo borde superior, centrado sobre la tarjeta
  let left = r.left + r.width / 2 - w / 2;
  left = Math.max(12, Math.min(left, window.innerWidth - w - 12));
  let top = r.top;
  if (!wide) top = Math.max(74, r.top - 30); // el vertical crece un poco hacia arriba
  pop.style.left = left + 'px';
  pop.style.top = top + 'px';
  pop.classList.add('show');

  // Empujar a las tarjetas vecinas para hacer espacio (efecto Netflix)
  popTrack = card.closest('.row-track');
  if (popTrack) {
    const cards = [...popTrack.querySelectorAll('.card')];
    const i = cards.indexOf(card);
    const shift = Math.max(0, (w - r.width) / 2);
    cards.forEach((c, idx) => {
      if (idx < i) c.style.transform = `translateX(${-shift}px)`;
      else if (idx > i) c.style.transform = `translateX(${shift}px)`;
    });
  }
}
function hidePop() {
  pop.classList.remove('show');
  popVideo.pause();
  resetSiblings();
  popCard = null;
}

document.querySelectorAll('.card').forEach((card) => {
  // Clic en la tarjeta -> reproductor grande
  card.addEventListener('click', () => openModalFromCard(card));
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModalFromCard(card); }
  });
  if (!supportsHover) return;
  card.addEventListener('mouseenter', () => {
    clearTimeout(leaveTimer);
    enterTimer = setTimeout(() => showPop(card), 420);
  });
  card.addEventListener('mouseleave', () => {
    clearTimeout(enterTimer);
    leaveTimer = setTimeout(hidePop, 130);
  });
});

if (supportsHover) {
  pop.addEventListener('mouseenter', () => clearTimeout(leaveTimer));
  pop.addEventListener('mouseleave', () => { leaveTimer = setTimeout(hidePop, 130); });
  pop.addEventListener('click', () => { if (popCard) openModalFromCard(popCard); });
  window.addEventListener('scroll', () => { if (pop.classList.contains('show')) hidePop(); }, true);
}

modal.querySelectorAll('[data-close]').forEach((el) => el.addEventListener('click', closeModal));
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

/* ===== Nav: fondo sólido al hacer scroll ===== */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});
