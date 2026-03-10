/**
 * work.js — shared script for all DvlprStudio work/case-study pages
 *
 * Accent colour is read from data-accent on .proj-title and applied
 * after paint to avoid forced-layout jitter on load.
 */

(function () {
  // Apply accent after first paint — avoids FOUC and layout thrash on load
  requestAnimationFrame(function () {
    applyAccent();
  });

  function applyAccent() {
    const titleEl = document.querySelector('.proj-title[data-accent]');
    if (!titleEl) return;

    const accent = titleEl.dataset.accent;
    titleEl.style.color = accent;

    // Tint step numbers
    document.querySelectorAll('.step-num').forEach(function (el) {
      el.style.color = accent;
    });

    // Tint callout borders — use element's own data-accent if set, else project accent
    document.querySelectorAll('.callout').forEach(function (el) {
      const ca = el.dataset.accent || accent;
      el.style.borderLeftColor = ca;
      el.style.background = hexToAlpha(ca, 0.06);
    });
  }

  function hexToAlpha(hex, alpha) {
    hex = hex.replace('#', '');
    if (hex.length === 3) hex = hex.split('').map(function(c){ return c+c; }).join('');
    var r = parseInt(hex.substring(0, 2), 16);
    var g = parseInt(hex.substring(2, 4), 16);
    var b = parseInt(hex.substring(4, 6), 16);
    return 'rgba(' + r + ',' + g + ',' + b + ',' + alpha + ')';
  }
})();
