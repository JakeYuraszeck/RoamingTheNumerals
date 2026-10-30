
(() => {
  const prices = JSON.parse(document.getElementById('tutoring-prices').textContent);
  const keys = ['singleSession', 'twoSessionRate', 'fourSessionRate', 'satSession'];
  if (!keys.every(key => typeof prices[key] === 'number' && Number.isFinite(prices[key]) && prices[key] >= 0)) {
    console.error('Website prices must be finite, nonnegative numbers.');
    return;
  }
  const cents = value => Math.round(value * 100);
  const currency = new Intl.NumberFormat('en-US', {
    style: 'currency', currency: 'USD', maximumFractionDigits: 2,
    minimumFractionDigits: 0
  });
  const money = value => currency.format(value / 100);
  const single = money(cents(prices.singleSession));
  const twoEach = money(cents(prices.twoSessionRate));
  const fourEach = money(cents(prices.fourSessionRate));
  const twoTotal = money(cents(prices.twoSessionRate) * 2);
  const fourTotal = money(cents(prices.fourSessionRate) * 4);
  const sat = money(cents(prices.satSession));
  const labels = {
    single: `One 60-minute session: ${single}`,
    two: `Two 60-minute sessions package: ${twoTotal} total (${twoEach} each)`,
    four: `Four 60-minute sessions package: ${fourTotal} total (${fourEach} each)`,
    sat: `One 60-minute session: ${sat}`,
    'single-option': `1 tutoring session (${single})`,
    'two-option': `2 tutoring sessions package (${twoTotal} total; ${twoEach} each)`,
    'four-option': `4 tutoring sessions package (${fourTotal} total; ${fourEach} each)`
  };
  document.querySelectorAll('[data-price]').forEach(element => {
    if (labels[element.dataset.price]) element.textContent = labels[element.dataset.price];
  });
})();
