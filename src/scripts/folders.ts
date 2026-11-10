// Carpetas con pestaña (FolderStack) y su hoja (FolderSheet). Al elegir una carpeta, pasa delante del
// montón, presta su color a la hoja y la hoja enseña solo sus elementos. Al señalar o abrir un elemento,
// su foto sale en el marco fijo. Emite «folderchange» con el id para quien lo necesite (el formulario).

const stack = document.querySelector<HTMLElement>('[data-stack]');
const sheet = document.querySelector<HTMLElement>('[data-sheet]');

if (stack && sheet) {
  const folders = [...stack.querySelectorAll<HTMLElement>('.folder')];
  const ids = folders.map((f) => f.dataset.id ?? '');
  let current = folders.find((f) => f.classList.contains('front'))?.dataset.id ?? ids[0];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');

  // Con JavaScript, las pestañas pasan a ser pestañas: una lista vacía que las reúne con aria-owns (la
  // lista no puede contener los paneles) y cada carpeta abierta como su panel.
  const list = document.createElement('div');
  list.setAttribute('role', 'tablist');
  list.setAttribute('aria-label', stack.dataset.label ?? '');
  list.setAttribute('aria-owns', ids.map((id) => `tab-${id}`).join(' '));
  stack.prepend(list);
  for (const f of folders) {
    const tab = f.querySelector<HTMLElement>('.tab');
    const body = f.querySelector<HTMLElement>('.body');
    tab?.setAttribute('role', 'tab');
    tab?.setAttribute('aria-controls', `body-${f.dataset.id}`);
    body?.setAttribute('role', 'tabpanel');
    body?.setAttribute('aria-labelledby', `tab-${f.dataset.id}`);
  }

  const apply = (id: string) => {
    const others = ids.filter((x) => x !== id);
    for (const f of folders) {
      const front = f.dataset.id === id;
      f.classList.toggle('front', front);
      f.style.setProperty('--o', String(front ? 99 : others.indexOf(f.dataset.id ?? '')));
      const tab = f.querySelector<HTMLElement>('.tab');
      tab?.setAttribute('aria-selected', String(front));
      if (tab) tab.tabIndex = front ? 0 : -1;
    }
    const color = folders.find((f) => f.dataset.id === id)?.dataset.color;
    if (color) sheet.style.setProperty('--folder', `var(--${color})`);
    for (const el of sheet.querySelectorAll<HTMLElement>('[data-folder]')) {
      el.classList.toggle('active', el.dataset.folder === id);
    }
    dispatchEvent(new CustomEvent('folderchange', { detail: id }));
  };

  const choose = (id: string) => {
    if (id === current) return;
    // Al momento: si llega otra flecha antes de que acabe la transición, parte de aquí.
    current = id;
    // El montón se reordena con una transición de vista donde la hay; si no, de golpe.
    if (document.startViewTransition && !reduce.matches) {
      for (const f of folders) f.style.setProperty('view-transition-name', `folder-${f.dataset.id}`);
      document.startViewTransition(() => apply(id));
    } else {
      apply(id);
    }
  };

  apply(current);

  stack.addEventListener('click', (e) => {
    const tab = (e.target as Element).closest<HTMLElement>('.tab');
    if (!tab) return;
    choose(tab.closest<HTMLElement>('.folder')?.dataset.id ?? current);
  });
  stack.addEventListener('keydown', (e) => {
    if (!(e.target as Element).classList.contains('tab') || !['ArrowLeft', 'ArrowRight'].includes(e.key)) return;
    e.preventDefault();
    const i = ids.indexOf(current);
    const next = ids[(i + (e.key === 'ArrowRight' ? 1 : ids.length - 1)) % ids.length];
    choose(next);
    requestAnimationFrame(() => document.getElementById(`tab-${next}`)?.focus());
  });

  // Marco fijo: la foto del elemento señalado o abierto.
  const show = (details: HTMLDetailsElement) => {
    const set = details.closest<HTMLElement>('[data-folder]');
    const frame = sheet.querySelector<HTMLElement>(`.preview[data-folder="${set?.dataset.folder}"]`);
    if (!frame) return;
    for (const pv of frame.querySelectorAll<HTMLElement>('.pv')) pv.classList.toggle('on', pv.dataset.i === details.dataset.i);
    const name = frame.querySelector('[data-pv-name]');
    const h = frame.querySelector('[data-pv-h]');
    if (name) name.textContent = details.dataset.name ?? '';
    if (h) h.textContent = details.dataset.h || details.querySelector('.meta')?.textContent || '';
  };
  sheet.addEventListener('pointerover', (e) => {
    const d = (e.target as Element).closest<HTMLDetailsElement>('details');
    if (d) show(d);
  });

  // Un panel cerrado queda oculto del todo: Chrome sigue midiendo lo que hay dentro de un details cerrado.
  // Solo con JavaScript, para que sin él abrir un elemento siempre enseñe su contenido.
  const sync = (d: HTMLDetailsElement) => {
    const panel = d.querySelector<HTMLElement>('.panel');
    if (panel) panel.hidden = !d.open;
  };
  for (const d of sheet.querySelectorAll('details')) sync(d);
  sheet.addEventListener(
    'toggle',
    (e) => {
      const d = e.target as HTMLDetailsElement;
      sync(d);
      if (d.open) show(d);
    },
    true,
  );
}
