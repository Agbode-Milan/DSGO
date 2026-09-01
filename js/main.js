/* ==========================================================================
   DIVINE SELASI GLOBAL OUTREACH — site scripts
   Nav, scroll reveal, gallery filter + lightbox, forms.
   ========================================================================== */
(function () {
  "use strict";

  /* ---------- Header scroll state ---------- */
  const header = document.querySelector(".site-header");
  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 40);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Mobile nav ---------- */
  const navToggle = document.querySelector(".nav-toggle");
  const navPrimary = document.querySelector(".nav-primary");
  if (navToggle && navPrimary) {
    navToggle.addEventListener("click", () => {
      const isOpen = navPrimary.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
      document.body.style.overflow = isOpen ? "hidden" : "";
    });
    navPrimary.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navPrimary.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });
  }

  /* ---------- Hero carousel ---------- */
  document.querySelectorAll("[data-hero-carousel]").forEach((carousel) => {
    const slides = Array.from(carousel.querySelectorAll("[data-slide]"));
    if (slides.length < 2) return;
    const dotsWrap = carousel.querySelector("[data-hero-dots]");
    const captionEl = carousel.querySelector("[data-hero-caption]");
    const prevBtn = carousel.querySelector("[data-hero-prev]");
    const nextBtn = carousel.querySelector("[data-hero-next]");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let index = Math.max(0, slides.findIndex((s) => s.classList.contains("is-active")));
    let timer = null;
    const INTERVAL = 6500;

    const dots = slides.map((slide, i) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "hero-dot" + (i === index ? " is-active" : "");
      btn.setAttribute("role", "tab");
      btn.setAttribute("aria-label", "Show photo " + (i + 1) + " of " + slides.length);
      btn.setAttribute("aria-selected", i === index ? "true" : "false");
      btn.addEventListener("click", () => goTo(i, true));
      dotsWrap && dotsWrap.appendChild(btn);
      return btn;
    });

    function render() {
      slides.forEach((s, i) => s.classList.toggle("is-active", i === index));
      dots.forEach((d, i) => {
        d.classList.toggle("is-active", i === index);
        d.setAttribute("aria-selected", i === index ? "true" : "false");
      });
      if (captionEl) {
        captionEl.style.opacity = "0";
        setTimeout(() => {
          captionEl.textContent = slides[index].dataset.caption || "";
          captionEl.style.opacity = "1";
        }, 200);
      }
    }
    function goTo(i, isManual) {
      index = ((i % slides.length) + slides.length) % slides.length;
      render();
      if (isManual) restart();
    }
    function next() { goTo(index + 1); }
    function prev() { goTo(index - 1, true); }
    function start() {
      if (reduceMotion) return;
      stop();
      timer = setInterval(next, INTERVAL);
    }
    function stop() { if (timer) { clearInterval(timer); timer = null; } }
    function restart() { stop(); start(); }

    nextBtn && nextBtn.addEventListener("click", () => goTo(index + 1, true));
    prevBtn && prevBtn.addEventListener("click", () => goTo(index - 1, true));
    carousel.addEventListener("mouseenter", stop);
    carousel.addEventListener("mouseleave", start);
    carousel.addEventListener("focusin", stop);
    carousel.addEventListener("focusout", start);

    /* touch swipe */
    let touchStartX = 0;
    carousel.addEventListener("touchstart", (e) => { touchStartX = e.changedTouches[0].screenX; stop(); }, { passive: true });
    carousel.addEventListener("touchend", (e) => {
      const dx = e.changedTouches[0].screenX - touchStartX;
      if (Math.abs(dx) > 40) goTo(index + (dx > 0 ? -1 : 1), true);
      else start();
    }, { passive: true });

    render();
    start();
  });

  /* ---------- Scroll reveal ----------
     IntersectionObserver is the primary trigger. It's paired with a lightweight
     manual geometry fallback (checked on scroll/resize) because items inside
     CSS multi-column layouts (the gallery masonry) can be fragmented in a way
     some browsers fail to report via IntersectionObserver — the fallback makes
     sure nothing is ever left permanently invisible. */
  const revealEls = document.querySelectorAll(".reveal, .masonry-item");
  if (revealEls.length) {
    const pending = new Set(revealEls);
    const reveal = (el) => {
      el.classList.add("is-visible");
      pending.delete(el);
    };

    let io = null;
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              reveal(entry.target);
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
      );
      revealEls.forEach((el) => io.observe(el));
    }

    const checkPending = () => {
      if (!pending.size) {
        window.removeEventListener("scroll", onScrollCheck);
        window.removeEventListener("resize", onScrollCheck);
        return;
      }
      const vh = window.innerHeight || document.documentElement.clientHeight;
      pending.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < vh - 40 && r.bottom > 0) {
          if (io) io.unobserve(el);
          reveal(el);
        }
      });
    };

    let ticking = false;
    function onScrollCheck() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        checkPending();
        ticking = false;
      });
    }
    window.addEventListener("scroll", onScrollCheck, { passive: true });
    window.addEventListener("resize", onScrollCheck, { passive: true });
    checkPending();

    /* Final safety net: if anything is still pending after images/layout
       settle (e.g. an observer quirk in a particular browser), reveal it —
       content should never stay invisible. */
    window.addEventListener("load", () => setTimeout(checkPending, 400));
    setTimeout(() => pending.forEach((el) => reveal(el)), 4000);
  }

  /* ---------- Gallery filtering ---------- */
  const filterBtns = document.querySelectorAll(".filter-btn");
  const galleryItems = document.querySelectorAll(".masonry-item");
  if (filterBtns.length && galleryItems.length) {
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        filterBtns.forEach((b) => b.classList.remove("is-active"));
        btn.classList.add("is-active");
        const cat = btn.dataset.filter;
        galleryItems.forEach((item) => {
          const match = cat === "all" || item.dataset.category === cat;
          item.style.display = match ? "" : "none";
        });
      });
    });
  }

  /* ---------- Lightbox ---------- */
  const lightbox = document.querySelector(".lightbox");
  if (lightbox) {
    const lbImg = lightbox.querySelector("img");
    const lbCaption = lightbox.querySelector("figcaption");
    const closeBtn = lightbox.querySelector(".lightbox-close");
    const prevBtn = lightbox.querySelector(".lightbox-prev");
    const nextBtn = lightbox.querySelector(".lightbox-next");
    const items = Array.from(document.querySelectorAll("[data-lightbox]"));
    let currentIndex = 0;

    function visibleItems() {
      return items.filter((el) => el.offsetParent !== null);
    }

    function openAt(index) {
      const list = visibleItems();
      if (!list.length) return;
      currentIndex = ((index % list.length) + list.length) % list.length;
      const el = list[currentIndex];
      const fullSrc = el.dataset.full || el.querySelector("img").src;
      lbImg.src = fullSrc;
      lbImg.alt = el.querySelector("img").alt || "";
      lbCaption.textContent = el.dataset.caption || "";
      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }
    function close() {
      lightbox.classList.remove("is-open");
      lightbox.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }
    function step(dir) {
      const list = visibleItems();
      const el = list[currentIndex];
      const pos = list.indexOf(el);
      openAt(pos + dir);
    }

    items.forEach((el, i) => {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        openAt(visibleItems().indexOf(el));
      });
      el.setAttribute("tabindex", "0");
      el.setAttribute("role", "button");
      el.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openAt(visibleItems().indexOf(el));
        }
      });
    });
    closeBtn && closeBtn.addEventListener("click", close);
    prevBtn && prevBtn.addEventListener("click", () => step(-1));
    nextBtn && nextBtn.addEventListener("click", () => step(1));
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) close();
    });
    document.addEventListener("keydown", (e) => {
      if (!lightbox.classList.contains("is-open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    });

    /* basic touch swipe */
    let touchStartX = 0;
    lightbox.addEventListener("touchstart", (e) => (touchStartX = e.changedTouches[0].screenX), { passive: true });
    lightbox.addEventListener(
      "touchend",
      (e) => {
        const dx = e.changedTouches[0].screenX - touchStartX;
        if (Math.abs(dx) > 40) step(dx > 0 ? -1 : 1);
      },
      { passive: true }
    );
  }

  /* ---------- Forms (no backend yet — friendly confirmation state) ---------- */
  document.querySelectorAll("form[data-form]").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const status = form.querySelector(".form-status");
      const required = Array.from(form.querySelectorAll("[required]"));
      const missing = required.some((f) => !f.value.trim());
      if (missing) {
        if (status) {
          status.textContent = "Please fill in the required fields marked above.";
          status.className = "form-status is-error";
        }
        return;
      }
      if (status) {
        status.textContent =
          form.dataset.form === "donation"
            ? "Thank you — your donation details have been recorded. Our team will contact you shortly to arrange handover."
            : "Thank you — we've received your message and will be in touch soon.";
        status.className = "form-status is-success";
      }
      form.reset();
    });
  });

  /* ---------- Copy-to-clipboard for donation details ---------- */
  document.querySelectorAll(".copy-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const value = btn.dataset.copy || "";
      navigator.clipboard
        ?.writeText(value)
        .then(() => {
          const original = btn.textContent;
          btn.textContent = "Copied";
          setTimeout(() => (btn.textContent = original), 1600);
        })
        .catch(() => {});
    });
  });

  /* ---------- Current year in footer ---------- */
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
})();
