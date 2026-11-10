// Comportamiento común de las subwebs: entradas una vez, la barra que se esconde, la hora de Barcelona,
// los rótulos que llenan su ancho, el festón del pie, las filas que se arrastran y el formulario que
// prepara el correo.

const reduce = matchMedia('(prefers-reduced-motion: reduce)');

// Entradas: [data-reveal] sube y aparece; [data-shutter] abre su imagen como una persiana.
const io = new IntersectionObserver(
  (entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      e.target.classList.add('is-in');
      io.unobserve(e.target);
    }
  },
  { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
);
document.querySelectorAll('[data-reveal], [data-shutter]').forEach((el) => io.observe(el));

// La barra: sin fondo arriba del todo, se esconde al bajar y vuelve al subir.
const top = document.querySelector<HTMLElement>('[data-top]');
if (top) {
  let last = scrollY;
  const sync = () => {
    const y = scrollY;
    top.classList.toggle('is-top', y < 8);
    if (Math.abs(y - last) > 6) {
      top.classList.toggle('is-away', y > last && y > 320);
      last = y;
    }
  };
  addEventListener('scroll', sync, { passive: true });
  sync();
}

// La hora de Barcelona en la barra: la web va de que cada cosa llegue a su hora.
const clock = document.querySelector<HTMLElement>('[data-clock]');
const time = clock?.querySelector('time');
if (clock && time) {
  const fmt = new Intl.DateTimeFormat('es-ES', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Europe/Madrid' });
  const tick = () => {
    const now = new Date();
    time.textContent = fmt.format(now);
    time.dateTime = now.toISOString();
  };
  tick();
  clock.hidden = false;
  // Al minuto en punto y, desde ahí, cada minuto.
  setTimeout(() => {
    tick();
    setInterval(tick, 60_000);
  }, 60_000 - (Date.now() % 60_000));
}

// Rótulos que llenan su caja: [data-fit] ajusta el tamaño para que su texto ocupe justo el ancho.
const fits = [...document.querySelectorAll<HTMLElement>('[data-fit]')];
const fit = (el: HTMLElement) => {
  const inner = el.firstElementChild as HTMLElement | null;
  if (!inner) return;
  inner.style.display = 'inline-block';
  const box = el.clientWidth;
  const width = inner.getBoundingClientRect().width;
  if (box > 0 && width > 0) {
    const size = parseFloat(getComputedStyle(el).fontSize);
    el.style.fontSize = `${((size * box) / width).toFixed(2)}px`;
  }
};
if (fits.length) {
  const all = () => fits.forEach(fit);
  all();
  document.fonts?.ready.then(all);
  // Solo al cambiar el ancho: en el móvil la barra del navegador cambia el alto al desplazar.
  let width = innerWidth;
  addEventListener('resize', () => {
    if (innerWidth === width) return;
    width = innerWidth;
    all();
  });
  // Al cambiar de carpeta la columna puede estrenar ancho (la hoja pasa de oculta a visible).
  addEventListener('folderchange', all);
}

// Festón del dorso: el alto del dibujo es el radio de cada arco, para que no se recorten.
for (const path of document.querySelectorAll<SVGPathElement>('[data-scallop] path')) {
  const n = innerWidth < 760 ? 6 : 12;
  const w = 1200 / n;
  const r = w / 2;
  let d = `M0 ${r}`;
  for (let i = 0; i < n; i++) d += ` L${(i * w).toFixed(1)} ${r} A${r} ${r} 0 0 1 ${((i + 1) * w).toFixed(1)} ${r}`;
  path.setAttribute('d', `${d} Z`);
  path.ownerSVGElement?.setAttribute('viewBox', `0 0 1200 ${r}`);
}

// Filas que se arrastran: barra de progreso, botones de anterior y siguiente y, con ratón, arrastre.
for (const wrap of document.querySelectorAll<HTMLElement>('[data-row]')) {
  const row = wrap.querySelector<HTMLElement>('.track-row');
  const bar = wrap.querySelector<HTMLElement>('.progress i');
  const prev = wrap.querySelector<HTMLButtonElement>('[data-prev]');
  const next = wrap.querySelector<HTMLButtonElement>('[data-next]');
  if (!row || !bar) continue;
  const sync = () => {
    const max = row.scrollWidth - row.clientWidth;
    const k = max > 0 ? row.scrollLeft / max : 1;
    bar.style.transform = `scaleX(${0.2 + 0.8 * k})`;
    if (prev) prev.disabled = row.scrollLeft < 4;
    if (next) next.disabled = row.scrollLeft > max - 4;
  };
  row.addEventListener('scroll', sync, { passive: true });
  addEventListener('resize', sync);
  sync();
  const step = () => (row.querySelector('article')?.getBoundingClientRect().width ?? 280) + 32;
  const smooth: ScrollBehavior = reduce.matches ? 'auto' : 'smooth';
  prev?.addEventListener('click', () => row.scrollBy({ left: -step(), behavior: smooth }));
  next?.addEventListener('click', () => row.scrollBy({ left: step(), behavior: smooth }));

  // Arrastre con ratón. Al soltar, la fila vuelve a encajar en la columna más cercana.
  let from = 0;
  let start = 0;
  let dragging = false;
  row.addEventListener('pointerdown', (e) => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return;
    dragging = true;
    from = e.clientX;
    start = row.scrollLeft;
    row.setPointerCapture(e.pointerId);
  });
  row.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    const dx = e.clientX - from;
    if (Math.abs(dx) > 3) row.classList.add('is-dragging');
    row.scrollLeft = start - dx;
  });
  const release = () => {
    if (!dragging) return;
    dragging = false;
    if (!row.classList.contains('is-dragging')) return;
    const target = Math.round(row.scrollLeft / step()) * step();
    row.classList.remove('is-dragging');
    row.scrollTo({ left: target, behavior: smooth });
  };
  row.addEventListener('pointerup', release);
  row.addEventListener('pointercancel', release);
}

// Formularios [data-book]: no envían nada; preparan el correo con lo escrito, etiqueta a etiqueta.
for (const form of document.querySelectorAll<HTMLFormElement>('form[data-book]')) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const body = [...form.querySelectorAll('label')]
      .map((label) => {
        const field = form.querySelector<HTMLInputElement | HTMLSelectElement>(`#${CSS.escape(label.htmlFor)}`);
        return `${label.textContent ?? ''}: ${field ? (data.get(field.name) ?? '') : ''}`;
      })
      .join('\n');
    const type = data.get('type');
    const subject = type ? `${form.dataset.subject} · ${type}` : (form.dataset.subject ?? '');
    form.querySelector('output')?.removeAttribute('hidden');
    location.href = `mailto:${form.dataset.mail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}
