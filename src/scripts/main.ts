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
  let items: HTMLElement[] = [];
  let i = 0;
  let last: HTMLElement | null = null;
  const show = (n: number) => {
    i = (n + items.length) % items.length;
    const it = items[i];
    img.src = it.dataset.full || it.querySelector('img')?.currentSrc || '';
    img.alt = it.dataset.caption || '';
    cap.textContent = it.dataset.caption || '';
    count.textContent = `${i + 1} / ${items.length}`;
  };
  const open = (el: HTMLElement) => {
    items = $$('[data-lightbox]');
    last = el;
    lb.hidden = false;
    document.documentElement.style.overflow = 'hidden';
    show(items.indexOf(el));
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
    if (e.key === 'ArrowRight') show(i + 1);
    if (e.key === 'ArrowLeft') show(i - 1);
  });
  $('[data-lb-close]', lb)?.addEventListener('click', close);
  $('[data-lb-next]', lb)?.addEventListener('click', () => show(i + 1));
  $('[data-lb-prev]', lb)?.addEventListener('click', () => show(i - 1));
  lb.addEventListener('click', (e) => e.target === lb && close());
  let sx = 0;
  lb.addEventListener('touchstart', (e) => (sx = e.touches[0].clientX), { passive: true });
  lb.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - sx;
    if (Math.abs(dx) > 50) show(dx < 0 ? i + 1 : i - 1);
  });
}

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
