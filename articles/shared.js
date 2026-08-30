/* AY. Design — shared.js
   Language toggle + bilingual content for service & article pages.
   Matches the language system in index.html exactly.
   --------------------------------------------------------------- */

(function () {
  'use strict';

  /* ─── Helpers ──────────────────────────────────────── */

  function applyLang(lang) {
    const isAr = lang === 'ar';
    document.documentElement.lang = lang;
    document.body.dir = isAr ? 'rtl' : 'ltr';

    // Swap textContent from data-ar / data-en
    document.querySelectorAll('[data-ar]').forEach(function (el) {
      el.textContent = isAr ? el.dataset.ar : el.dataset.en;
    });

    // Swap innerHTML from data-ar-html / data-en-html
    document.querySelectorAll('[data-ar-html]').forEach(function (el) {
      el.innerHTML = isAr ? el.dataset.arHtml : el.dataset.enHtml;
    });

    // Update lang button label (shows the *other* language)
    var btn = document.getElementById('langToggle');
    if (btn) btn.textContent = isAr ? 'EN' : 'عر';

    localStorage.setItem('ay_lang', lang);
  }

  /* ─── Init ──────────────────────────────────────────── */

  var saved = localStorage.getItem('ay_lang') || 'ar';
  applyLang(saved);

  document.addEventListener('DOMContentLoaded', function () {
    // Re-apply after DOM is fully ready (handles late hydration)
    applyLang(localStorage.getItem('ay_lang') || 'ar');

    var btn = document.getElementById('langToggle');
    if (btn) {
      btn.addEventListener('click', function () {
        var current = localStorage.getItem('ay_lang') || 'ar';
        applyLang(current === 'ar' ? 'en' : 'ar');
      });
    }
  });
})();
