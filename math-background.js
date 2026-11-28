// Math behind the page: scatters the LaTeX equations from math-equations.js down the whole page as one
// seamless collage. Each equation's level comes from the section it sits in (arithmetic at the top, beyond
// calculus at the bottom), equations never overlap, and spots fully hidden behind the white panels are skipped.
(function () {
  var data = window.MATH_BG;
  if (!data || !document.createElementNS) return;
  var NS = 'http://www.w3.org/2000/svg';
  var EXTRA = 1500; // draw a little past the bottom so the page can grow (e.g. About Me opening) without a bare strip

  var holder = document.createElement('div');
  holder.id = 'math-bg';
  holder.setAttribute('aria-hidden', 'true');
  var svg = document.createElementNS(NS, 'svg');
  var defs = document.createElementNS(NS, 'defs');
  var layer = document.createElementNS(NS, 'g');
  svg.appendChild(defs); svg.appendChild(layer); holder.appendChild(svg);
  document.body.insertBefore(holder, document.body.firstChild);

  // One reusable drawing per equation, centred on (0,0) at 1 px = 1 unit.
  Object.keys(data.levels).forEach(function (L) {
    data.levels[L].forEach(function (e, i) {
      var g = document.createElementNS(NS, 'g');
      g.id = 'mbg-' + L + '-' + i;
      g.setAttribute('transform', 'scale(' + (e.w / e.vw) + ') translate(' + (-(e.vx + e.vw / 2)) + ' ' + (-(e.vy + e.vh / 2)) + ')');
      g.innerHTML = e.d;
      defs.appendChild(g);
    });
  });

  function rng(seed) { return function () { return (seed = (seed * 1664525 + 1013904223) % 4294967296) / 4294967296; }; }

  function layout() {
    var W = document.documentElement.clientWidth;
    var H = document.documentElement.scrollHeight + EXTRA;
    var sy = window.scrollY || window.pageYOffset || 0;
    var phone = W <= 860;
    var base = phone ? 0.8 : 1;            // equation size multiplier
    var gap = phone ? 22 : 28;             // minimum empty space around each equation
    svg.setAttribute('width', W); svg.setAttribute('height', H);
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
    layer.textContent = '';

    // Which level each vertical stretch of the page uses, one per section, in order.
    var bands = Array.prototype.map.call(document.querySelectorAll('main > section'), function (s, i) {
      var r = s.getBoundingClientRect();
      return { top: r.top + sy, bottom: r.bottom + sy, level: Math.min(7, i + 1) };
    });
    function levelAt(y) {
      if (!bands.length || y < bands[0].top) return 1;
      for (var i = 0; i < bands.length; i++) if (y < bands[i].bottom) return bands[i].level;
      return 7;
    }
    // White panels: an equation fully inside one would never be seen, so it is skipped.
    var panels = Array.prototype.map.call(document.querySelectorAll('.hero > .wrap, .section > .wrap'), function (p) {
      var r = p.getBoundingClientRect();
      return { x: r.left, y: r.top + sy, w: r.width, h: r.height };
    });
    function hidden(b) {
      for (var i = 0; i < panels.length; i++) {
        var p = panels[i];
        if (b.x >= p.x && b.y >= p.y && b.x + b.w <= p.x + p.w && b.y + b.h <= p.y + p.h) return true;
      }
      return false;
    }

    // Spatial grid so overlap checks stay fast on long pages.
    var CELL = 160, grid = {};
    function cells(b, fn) {
      for (var cx = Math.floor(b.x / CELL); cx <= Math.floor((b.x + b.w) / CELL); cx++)
        for (var cy = Math.floor(b.y / CELL); cy <= Math.floor((b.y + b.h) / CELL); cy++) fn(cx + ',' + cy);
    }
    function clashes(b) {
      var hit = false;
      cells(b, function (k) {
        var list = grid[k]; if (!list || hit) return;
        for (var i = 0; i < list.length; i++) {
          var o = list[i];
          if (b.x < o.x + o.w && o.x < b.x + b.w && b.y < o.y + o.h && o.y < b.y + b.h) { hit = true; return; }
        }
      });
      return hit;
    }

    var r = rng(20261127), seen = {}, frag = document.createDocumentFragment();
    var attempts = Math.min(150000, Math.round(W * H / 120));
    var APART = 300; // the same equation never appears twice within this distance
    function tooClose(key, x, y) {
      var list = seen[key]; if (!list) return false;
      for (var j = 0; j < list.length; j++) { var dx = list[j][0] - x, dy = list[j][1] - y; if (dx * dx + dy * dy < APART * APART) return true; }
      return false;
    }
    for (var a = 0; a < attempts; a++) {
      var cx = r() * W, cy = r() * H, L = levelAt(cy), list = data.levels[L];
      var i = Math.floor(r() * list.length), key = L + '-' + i;
      if (tooClose(key, cx, cy)) continue;
      var e = list[i];
      var size = base * (0.85 + r() * 0.4), angle = r() * 24 - 12, rad = angle * Math.PI / 180;
      var w = e.w * size, h = e.h * size;
      var bw = Math.abs(w * Math.cos(rad)) + Math.abs(h * Math.sin(rad));
      var bh = Math.abs(w * Math.sin(rad)) + Math.abs(h * Math.cos(rad));
      var box = { x: cx - bw / 2 - gap / 2, y: cy - bh / 2 - gap / 2, w: bw + gap, h: bh + gap };
      if (box.x < 0 || box.x + box.w > W) continue;   // keep every equation fully on screen sideways
      if (hidden(box) || clashes(box)) continue;
      cells(box, function (k) { (grid[k] = grid[k] || []).push(box); });
      (seen[key] = seen[key] || []).push([cx, cy]);
      var use = document.createElementNS(NS, 'use');
      use.setAttribute('href', '#mbg-' + L + '-' + i);
      use.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '#mbg-' + L + '-' + i);
      use.setAttribute('transform', 'translate(' + cx.toFixed(1) + ' ' + cy.toFixed(1) + ') rotate(' + angle.toFixed(1) + ') scale(' + size.toFixed(3) + ')');
      frag.appendChild(use);
    }
    layer.appendChild(frag);
    holder.setAttribute('data-count', layer.childNodes.length);
  }

  // Lay out once the page has its final size, and again only if the screen width changes,
  // so the math stays put while scrolling or opening the About Me card.
  var lastW = 0, timer = null;
  function schedule() { clearTimeout(timer); timer = setTimeout(function () { lastW = document.documentElement.clientWidth; layout(); }, 120); }
  schedule();
  window.addEventListener('load', schedule);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(schedule);
  window.addEventListener('resize', function () { if (document.documentElement.clientWidth !== lastW) schedule(); });
})();
