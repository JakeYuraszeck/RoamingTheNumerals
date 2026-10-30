(() => {
  const select = document.getElementById('session-package');
  const calendar = document.getElementById('math-calendar');
  const frame = document.getElementById('math-calendar-frame');
  const link = document.getElementById('math-booking-link');
  if (!select || !calendar || !frame || !link) return;

  function updatePackage() {
    const url = select.value;
    calendar.open = false;
    calendar.hidden = !url;
    frame.replaceChildren();
    link.removeAttribute('href');
    if (!url) return;

    link.href = url;
    const iframe = document.createElement('iframe');
    iframe.title = `${select.selectedOptions[0].textContent} booking`;
    iframe.src = url;
    frame.append(iframe);
  }

  select.addEventListener('change', updatePackage);
  window.addEventListener('pageshow', updatePackage);
  updatePackage();
})();
