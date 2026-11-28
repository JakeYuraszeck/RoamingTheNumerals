// Header links: underline the section you're scrolled to. The underline colour follows the header stripe's
// gradient (navy -> magenta -> coral) by how far down the page you are.
(function () {
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav-row nav a[href^="#"]'));
  if (!links.length) return;
  var targets = links.map(function (a) { return document.querySelector(a.getAttribute('href')); });
  var header = document.querySelector('.site-header');
  var root = document.documentElement;

  // Same colour stops as the stripe under the header: navy at 0%, magenta at 65%, coral at 100%.
  var STOPS = [[0, [49, 59, 136]], [0.65, [152, 4, 83]], [1, [250, 132, 125]]];
  function mix(t) {
    for (var s = 1; s < STOPS.length; s++) {
      if (t <= STOPS[s][0]) {
        var a = STOPS[s - 1], b = STOPS[s], u = (t - a[0]) / (b[0] - a[0]);
        return a[1].map(function (v, i) { return Math.round(v + (b[1][i] - v) * u); });
      }
    }
    return STOPS[STOPS.length - 1][1];
  }

  function update() {
    var line = header.getBoundingClientRect().bottom + 60;
    var current = -1;
    targets.forEach(function (t, i) { if (t && t.getBoundingClientRect().top <= line) current = i; });
    var max = root.scrollHeight - window.innerHeight;
    var y = window.scrollY || window.pageYOffset || 0;
    if (max > 0 && y >= max - 4) current = links.length - 1; // at the very bottom, the last link
    var bg = mix(max > 0 ? Math.min(1, Math.max(0, y / max)) : 0);
    root.style.setProperty('--nav-bg', 'rgb(' + bg.join(',') + ')');
    links.forEach(function (a, i) {
      var on = i === current;
      a.classList.toggle('is-current', on);
      if (on) a.setAttribute('aria-current', 'location'); else a.removeAttribute('aria-current');
    });
  }

  var queued = false;
  function onScroll() { if (!queued) { queued = true; requestAnimationFrame(function () { queued = false; update(); }); } }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  window.addEventListener('load', update);
  update();
})();
