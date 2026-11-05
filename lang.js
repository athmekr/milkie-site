// Picks English or Greek. The choice lives in the address (#el or #en), never in cookies or storage.
(function () {
  var root = document.documentElement;
  function fromHash() {
    var h = location.hash.replace('#', '');
    return h === 'el' || h === 'en' ? h : null;
  }
  function apply(lang) {
    root.setAttribute('data-lang', lang);
    root.lang = lang;
    document.querySelectorAll('a[href$=".html"], a[href*=".html#"]').forEach(function (a) {
      a.setAttribute('href', a.getAttribute('href').split('#')[0] + '#' + lang);
    });
    document.querySelectorAll('[data-set-lang]').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-set-lang') === lang));
    });
  }
  var start = fromHash() || ((navigator.language || 'en').toLowerCase().indexOf('el') === 0 ? 'el' : 'en');
  root.setAttribute('data-lang', start);
  document.addEventListener('DOMContentLoaded', function () {
    apply(start);
    document.querySelectorAll('[data-set-lang]').forEach(function (b) {
      b.addEventListener('click', function () {
        var lang = b.getAttribute('data-set-lang');
        apply(lang);
        history.replaceState(null, '', location.pathname + '#' + lang);
      });
    });
  });
  window.addEventListener('hashchange', function () { var l = fromHash(); if (l) apply(l); });
})();
