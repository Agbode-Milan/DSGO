const $ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => r.querySelector<T>(s);
const $$ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => [...r.querySelectorAll<T>(s)];
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const WA = document.body.dataset.wa || '233266284398';

/* ── Header + give bar on scroll ─────────────── */
const hdr = $('[data-hdr]');
const giveBar = $('[data-givebar]');
const onScroll = () => {
  const y = scrollY;
  hdr?.classList.toggle('scrolled', y > 24);
  if (giveBar) {
    const nearEnd = innerHeight + y > document.body.scrollHeight - 520;
    const show = y > innerHeight * 0.75 && !nearEnd;
    giveBar.classList.toggle('show', show);
    giveBar.setAttribute('aria-hidden', String(!show));
    $$('a', giveBar).forEach((a) => (a.tabIndex = show ? 0 : -1));
  }
};
addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ── Mobile menu ─────────────────────────────── */
const menu = $('[data-menu]');
const openBtn = $<HTMLButtonElement>('[data-menu-open]');
const setMenu = (open: boolean) => {
  if (!menu) return;
  menu.hidden = !open;
  document.documentElement.style.overflow = open ? 'hidden' : '';
  openBtn?.setAttribute('aria-expanded', String(open));
  if (open) $<HTMLElement>('[data-menu-close]')?.focus();
  else openBtn?.focus();
};
openBtn?.addEventListener('click', () => setMenu(true));
$('[data-menu-close]')?.addEventListener('click', () => setMenu(false));
$$('a', menu ?? document.createElement('div')).forEach((a) => a.addEventListener('click', () => setMenu(false)));

/* ── Reveal + count-up ───────────────────────── */
const countUp = (el: HTMLElement) => {
  const target = Number(el.dataset.count);
  if (reduceMotion || !target) return void (el.textContent = target.toLocaleString());
  const dur = 1600;
  const t0 = performance.now();
  const tick = (t: number) => {
    const p = Math.min(1, (t - t0) / dur);
    el.textContent = Math.round(target * (1 - Math.pow(1 - p, 4))).toLocaleString();
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};
const io = new IntersectionObserver(
  (entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      const el = e.target as HTMLElement;
      el.classList.add('in');
      if (el.dataset.count) countUp(el);
      io.unobserve(el);
    }
  },
  { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
);
$$('.reveal, [data-count], .scribble').forEach((el) => io.observe(el));

/* ── Countdown to 26 December ─────────────────── */
$$('[data-countdown]').forEach((el) => {
  const [m, d] = (el.dataset.countdown || '12-26').split('-').map(Number);
  const now = new Date();
  let target = new Date(now.getFullYear(), m - 1, d);
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  if (target < today) target = new Date(now.getFullYear() + 1, m - 1, d);
  const days = Math.round((target.getTime() - today.getTime()) / 864e5);
  const num = $('[data-days]', el);
  const label = $('[data-days-label]', el);
  if (num) num.textContent = days === 0 ? 'Today' : String(days);
  if (label) label.textContent = days === 0 ? 'is outreach day' : days === 1 ? 'day to go' : 'days to go';
  $$('[data-year]').forEach((y) => (y.textContent = String(target.getFullYear())));
});

/* ── Gift picker ──────────────────────────────── */
$$<HTMLElement>('[data-give]').forEach((box) => {
  const link = box.dataset.link || '';
  const radios = $$<HTMLInputElement>('input[name="amt"]', box);
  const custom = $<HTMLInputElement>('[data-custom]', box);
  const impact = $('[data-impact]', box);
  const btn = $<HTMLAnchorElement>('[data-give-btn]', box);
  const btnAmt = $('[data-give-amt]', box);
  const update = () => {
    const sel = radios.find((r) => r.checked);
    let amt = 0;
    let text = '';
    if (sel && sel.value !== 'other') {
      amt = Number(sel.value);
      text = sel.dataset.impact || '';
    } else {
      amt = Number(custom?.value) || 0;
      text = amt
        ? 'Every cedi goes straight into food, clothing and essentials for outreach day.'
        : 'Type any amount. Every cedi counts.';
    }
    box.classList.toggle('is-other', sel?.value === 'other');
    if (impact) impact.textContent = text;
    if (btnAmt) btnAmt.textContent = amt ? `GH₵${amt.toLocaleString()}` : '';
    if (btn) {
      const msg = `Hi DSGO! I'd like to give${amt ? ` GH₵${amt.toLocaleString()}` : ''} towards the 26th December outreach. How do I send it?`;
      btn.href = link || `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;
    }
  };
  radios.forEach((r) => r.addEventListener('change', () => {
    update();
    if (r.value === 'other') custom?.focus();
  }));
  custom?.addEventListener('input', update);
  custom?.addEventListener('focus', () => {
    const o = radios.find((r) => r.value === 'other');
    if (o && !o.checked) {
      o.checked = true;
      update();
    }
  });
  update();
});

/* ── Forms → WhatsApp ─────────────────────────── */
$$<HTMLFormElement>('form[data-wa-form]').forEach((form) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    const lines = [form.dataset.waForm || 'Hi DSGO!', ''];
    for (const [k, v] of new FormData(form)) {
      const val = String(v).trim();
      if (!val) continue;
      const label = form.querySelector(`[name="${k}"]`)?.closest('.field')?.querySelector('label')?.textContent?.trim() || k;
      lines.push(`*${label}:* ${val}`);
    }
    window.open(`https://wa.me/${WA}?text=${encodeURIComponent(lines.join('\n'))}`, '_blank', 'noopener');
  });
});

/* ── Share + copy ─────────────────────────────── */
$$<HTMLButtonElement>('[data-share]').forEach((b) =>
  b.addEventListener('click', async () => {
    const data = { title: 'Divine Selasi Global Outreach', text: 'Standing with Kayayes and young mothers in Accra. Take a look 👇', url: location.origin };
    if (navigator.share) return navigator.share(data).catch(() => {});
    await navigator.clipboard?.writeText(data.url);
    const old = b.innerHTML;
    b.textContent = 'Link copied ✓';
    setTimeout(() => (b.innerHTML = old), 1800);
  }),
);

/* ── Lightbox ─────────────────────────────────── */
const lb = $('[data-lb]');
if (lb) {
  const img = $<HTMLImageElement>('[data-lb-img]', lb)!;
  const cap = $('[data-lb-cap]', lb)!;
  const count = $('[data-lb-count]', lb)!;
  const loaded = new Set<string>();
  let items: HTMLElement[] = [];
  let i = 0;
  let last: HTMLElement | null = null;
  let busy = false;
  const ease = 'cubic-bezier(0.22, 1, 0.36, 1)';
  const dur = (ms: number) => (reduceMotion ? 0 : ms);
  const wrapI = (n: number) => (n + items.length) % items.length;
  const fullOf = (el: HTMLElement) => el.dataset.full || el.querySelector('img')?.currentSrc || '';
  const thumbOf = (el: HTMLElement) => el.querySelector('img')?.currentSrc || '';

  // Warm the cache so neighbours open instantly.
  const preload = (n: number) => {
    const src = fullOf(items[wrapI(n)]);
    if (!src || loaded.has(src)) return;
    const p = new Image();
    p.decoding = 'async';
    p.onload = () => loaded.add(src);
    p.src = src;
  };

  // Show the (already loaded) thumbnail at once, then swap in the sharp version.
  const show = (n: number) => {
    i = wrapI(n);
    const it = items[i];
    const full = fullOf(it);
    img.alt = it.dataset.caption || '';
    cap.textContent = it.dataset.caption || '';
    count.textContent = `${i + 1} / ${items.length}`;
    if (loaded.has(full)) img.src = full;
    else {
      img.src = thumbOf(it) || full;
      const p = new Image();
      p.onload = () => {
        loaded.add(full);
        if (items[i] === it) img.src = full;
      };
      p.src = full;
    }
    preload(i + 1);
    preload(i - 1);
  };

  // Slide out in the swipe direction, then slide the next photo in.
  const go = async (delta: number, fromX = 0) => {
    if (busy || items.length < 2) return;
    busy = true;
    const w = Math.min(innerWidth, 900);
    await img.animate(
      [
        { transform: `translateX(${fromX}px)`, opacity: 1 - Math.min(Math.abs(fromX) / w, 0.6) },
        { transform: `translateX(${-delta * w * 0.55}px)`, opacity: 0 },
      ],
      { duration: dur(200), easing: 'ease-in' },
    ).finished;
    show(i + delta);
    img.style.transform = '';
    img.style.opacity = '';
    await img.animate(
      [
        { transform: `translateX(${delta * w * 0.35}px)`, opacity: 0 },
        { transform: 'translateX(0)', opacity: 1 },
      ],
      { duration: dur(360), easing: ease },
    ).finished;
    busy = false;
  };

  const open = (el: HTMLElement) => {
    items = $$('[data-lightbox]');
    last = el;
    lb.hidden = false;
    document.documentElement.style.overflow = 'hidden';
    show(items.indexOf(el));
    img.animate([{ transform: 'scale(0.94)', opacity: 0 }, { transform: 'scale(1)', opacity: 1 }], { duration: dur(320), easing: ease });
    $<HTMLElement>('[data-lb-close]', lb)?.focus();
  };
  const close = () => {
    lb.hidden = true;
    document.documentElement.style.overflow = '';
    last?.focus();
  };

  document.addEventListener('click', (e) => {
    const t = (e.target as HTMLElement).closest<HTMLElement>('[data-lightbox]');
    if (t) {
      e.preventDefault();
      open(t);
    }
  });
  document.addEventListener('keydown', (e) => {
    const t = (e.target as HTMLElement).closest?.<HTMLElement>('[data-lightbox]');
    if (lb.hidden) {
      if (t && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        open(t);
      }
      if (e.key === 'Escape' && menu && !menu.hidden) setMenu(false);
      return;
    }
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowRight') go(1);
    if (e.key === 'ArrowLeft') go(-1);
  });
  $('[data-lb-close]', lb)?.addEventListener('click', close);
  $('[data-lb-next]', lb)?.addEventListener('click', () => go(1));
  $('[data-lb-prev]', lb)?.addEventListener('click', () => go(-1));
  lb.addEventListener('click', (e) => e.target === lb && close());

  // Drag: the photo follows your finger, then glides to the next one or snaps back.
  let sx = 0;
  let sy = 0;
  let dx = 0;
  let dragging = false;
  let horizontal: boolean | null = null;
  lb.addEventListener(
    'touchstart',
    (e) => {
      if (busy || e.touches.length > 1) return;
      sx = e.touches[0].clientX;
      sy = e.touches[0].clientY;
      dx = 0;
      dragging = true;
      horizontal = null;
    },
    { passive: true },
  );
  lb.addEventListener(
    'touchmove',
    (e) => {
      if (!dragging) return;
      const x = e.touches[0].clientX - sx;
      const y = e.touches[0].clientY - sy;
      if (horizontal === null && Math.abs(x) + Math.abs(y) > 8) horizontal = Math.abs(x) > Math.abs(y);
      if (!horizontal) return;
      e.preventDefault();
      dx = x;
      img.style.transform = `translateX(${dx}px)`;
      img.style.opacity = String(1 - Math.min(Math.abs(dx) / innerWidth, 0.5));
    },
    { passive: false },
  );
  lb.addEventListener('touchend', () => {
    if (!dragging) return;
    dragging = false;
    if (!horizontal) return;
    if (Math.abs(dx) > Math.min(80, innerWidth * 0.18)) {
      go(dx < 0 ? 1 : -1, dx);
    } else {
      const from = dx;
      img.style.transform = '';
      img.style.opacity = '';
      img.animate([{ transform: `translateX(${from}px)` }, { transform: 'translateX(0)' }], { duration: dur(300), easing: ease });
    }
  });
}

/* ── Photos fade in as they load ─────────────── */
$$<HTMLImageElement>('.ph img').forEach((im) => {
  const done = () => im.classList.add('ld');
  if (im.complete && im.naturalWidth) done();
  else {
    im.addEventListener('load', done, { once: true });
    im.addEventListener('error', done, { once: true });
  }
});

/* ── Hero slideshow ───────────────────────────── */
$$('[data-slides]').forEach((wrap) => {
  const slides = $$('.slide', wrap);
  if (slides.length < 2 || reduceMotion) return;
  let n = 0;
  setInterval(() => {
    if (document.hidden) return;
    slides[n].classList.remove('on');
    n = (n + 1) % slides.length;
    slides[n].classList.add('on');
  }, 6000);
});
