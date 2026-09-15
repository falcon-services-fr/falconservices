/* ==========================================================================
   FALCON SERVICES — Interactions
   Vanilla JS, sans dépendance. Chaque module sort tôt s'il n'a rien à faire.
   ========================================================================== */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------------- Header */
  function header() {
    var el = document.querySelector('.site-header');
    if (!el) return;

    var onScroll = function () {
      el.classList.toggle('is-stuck', window.scrollY > 12);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ------------------------------------------------------------ Nav mobile */
  function nav() {
    var burger = document.querySelector('.burger');
    var menu = document.querySelector('.nav');
    if (!burger || !menu) return;

    var close = function () {
      burger.classList.remove('is-open');
      menu.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('is-locked');
    };

    burger.addEventListener('click', function () {
      var open = !menu.classList.contains('is-open');
      burger.classList.toggle('is-open', open);
      menu.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', String(open));
      document.body.classList.toggle('is-locked', open);
    });

    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) close();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') close();
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 860) close();
    });
  }

  /* --------------------------------------------------------- Mot tournant */
  function rotator() {
    var box = document.querySelector('.rotator');
    if (!box || reduced) return;

    var items = Array.prototype.slice.call(box.children);
    if (items.length < 2) return;

    var i = 0;
    items[0].classList.add('is-in');

    setInterval(function () {
      items[i].classList.remove('is-in');
      items[i].classList.add('is-out');

      var prev = items[i];
      setTimeout(function () { prev.classList.remove('is-out'); }, 500);

      i = (i + 1) % items.length;
      items[i].classList.add('is-in');
    }, 2600);
  }

  /* ------------------------------------------------- Révélations au scroll */
  function reveal() {
    var els = document.querySelectorAll('.reveal, .step');
    if (!els.length) return;

    if (reduced || !('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('is-revealed'); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-revealed');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });

    els.forEach(function (el) { io.observe(el); });
  }

  /* ------------------------------------------------------------- Compteurs */
  function counters() {
    var els = document.querySelectorAll('[data-count]');
    if (!els.length) return;

    var run = function (el) {
      var target = parseFloat(el.dataset.count);
      var suffix = el.dataset.suffix || '';

      if (reduced) {
        el.textContent = target + suffix;
        return;
      }

      var duration = 1500;
      var start = performance.now();

      var tick = function (now) {
        var p = Math.min((now - start) / duration, 1);
        // easeOutExpo — démarrage vif, arrivée douce
        var eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
        el.textContent = Math.round(target * eased) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    if (!('IntersectionObserver' in window)) {
      els.forEach(run);
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        run(entry.target);
        io.unobserve(entry.target);
      });
    }, { threshold: 0.5 });

    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------------------------------------------------------------- Onglets */
  function tabs() {
    var groups = document.querySelectorAll('[data-tabs]');
    if (!groups.length) return;

    groups.forEach(function (group) {
      var buttons = group.querySelectorAll('.tab');
      var panels = group.querySelectorAll('.tab-panel');

      buttons.forEach(function (btn) {
        btn.addEventListener('click', function () {
          var id = btn.dataset.tab;

          buttons.forEach(function (b) {
            var on = b === btn;
            b.classList.toggle('is-active', on);
            b.setAttribute('aria-selected', String(on));
          });

          panels.forEach(function (p) {
            p.classList.toggle('is-active', p.dataset.panel === id);
          });
        });
      });
    });
  }

  /* -------------------------------------------------------- Filtre projets */
  function filters() {
    var bar = document.querySelector('[data-filters]');
    if (!bar) return;

    var items = document.querySelectorAll('[data-cat]');

    bar.addEventListener('click', function (e) {
      var btn = e.target.closest('.filter');
      if (!btn) return;

      var value = btn.dataset.filter;

      bar.querySelectorAll('.filter').forEach(function (b) {
        b.classList.toggle('is-active', b === btn);
        b.setAttribute('aria-pressed', String(b === btn));
      });

      items.forEach(function (item) {
        var show = value === 'all' || item.dataset.cat === value;
        item.classList.toggle('is-hidden', !show);
      });
    });
  }

  /* --------------------------------------------------------------- Marquee */
  function marquee() {
    // Le CSS translate de -50% : on duplique la piste pour boucler sans saut.
    document.querySelectorAll('.marquee__track').forEach(function (track) {
      if (track.dataset.cloned) return;
      track.innerHTML += track.innerHTML;
      track.dataset.cloned = 'true';
      track.setAttribute('aria-hidden', 'false');
    });
  }

  /* ----------------------------------------------------------------- Année */
  function year() {
    document.querySelectorAll('[data-year]').forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  }

  /* ------------------------------------------------------------------ Boot */
  function init() {
    header();
    nav();
    rotator();
    reveal();
    counters();
    tabs();
    filters();
    marquee();
    year();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
