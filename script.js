/* ROAMING THE NUMERALS — INTERACTIVE BEHAVIOR
   Loaded with defer in index.html, so page elements exist before this runs.
   Calendly keeps its own separate third-party script in index.html.
   Sections below retain their original order and explanatory comments. */


  /*
    Pair each sidebar link with its destination.
    The links should follow the same order as the page sections.
  */
  const sidebarLinks = [...document.querySelectorAll('aside nav a')];

  const sidebarSections = sidebarLinks.map(link => ({
    link,
    section: document.querySelector(link.getAttribute('href'))
  })).filter(item => item.section);

  function updateHighlight() {
    if (!sidebarSections.length) return;

    /*
      Start with Introduction selected.

      As each section reaches 100 pixels below the top of the
      window, select its link. Keep it selected until the next
      section reaches that point.

      This keeps Introduction highlighted through the video
      and biography, even though the biography is a separate section.
    */
    let current = sidebarSections[0];

    sidebarSections.forEach(item => {
      if (item.section.getBoundingClientRect().top <= 100) {
        current = item;
      }
    });

    /*
      At the bottom of the page, select the final section.
      This handles sections too short to reach the top.
      Only apply this when the page is tall enough to scroll.
    */
    const pageHeight = document.documentElement.scrollHeight;
    const canScroll = pageHeight > window.innerHeight + 2;
    const atBottom =
      window.scrollY + window.innerHeight >= pageHeight - 2;

    if (canScroll && atBottom) {
      current = sidebarSections[sidebarSections.length - 1];
    }

    /*
      Highlight exactly one link and identify it for
      screen-reader users.
    */
    sidebarLinks.forEach(link => {
      const isCurrent = link === current.link;

      link.classList.toggle('active', isCurrent);

      if (isCurrent) {
        link.setAttribute('aria-current', 'location');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }

  window.addEventListener('scroll', updateHighlight, { passive: true });
  window.addEventListener('resize', updateHighlight);
  window.addEventListener('load', updateHighlight);

  // Dropdowns change section positions without scrolling.
  document.querySelectorAll('.booking-calendar').forEach(dropdown => {
    dropdown.addEventListener('toggle', updateHighlight);
  });

  updateHighlight();



  /* Package selection controls only the standard math booking section.
     No booking or purchase happens just by selecting an option. */
  const packageSelect = document.getElementById('session-package');
  const mathCalendar = document.getElementById('math-calendar');
  const mathFrame = document.getElementById('math-calendar-frame');
  const mathLink = document.getElementById('math-booking-link');

  function updatePackage() {
    const url = packageSelect.value;
    // Discard the previous checkout so another package cannot remain visible.
    mathCalendar.open = false;
    mathFrame.replaceChildren();
    mathCalendar.hidden = !url;
    mathLink.removeAttribute('href');
    if (url) {
      mathLink.href = url;
      const frame = document.createElement('iframe');
      frame.title = packageSelect.selectedOptions[0].textContent + ' booking';
      frame.src = url;
      mathFrame.append(frame);
    }
    // Recalculate sidebar highlighting after the section's height changes.
    updateHighlight();
  }
  packageSelect.addEventListener('change', updatePackage);
  // pageshow also handles a browser restoring a previous selection on Back.
  window.addEventListener('pageshow', updatePackage);
  updatePackage();



  /* Buttons advance by one card. No timer moves the reviews while someone
     is reading. Respect the visitor's reduced-motion setting. */
  const reviewTrack = document.getElementById('reviews-track');
  const reviewPrev = document.getElementById('reviews-prev');
  const reviewNext = document.getElementById('reviews-next');
  function moveReviews(direction) {
    const card = reviewTrack.querySelector('.review-card');
    const gap = parseFloat(getComputedStyle(reviewTrack).gap) || 20;
    reviewTrack.scrollBy({
      left: direction * (card.getBoundingClientRect().width + gap),
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
    });
  }
  function updateReviewButtons() {
    reviewPrev.disabled = reviewTrack.scrollLeft <= 2;
    reviewNext.disabled = reviewTrack.scrollLeft + reviewTrack.clientWidth >= reviewTrack.scrollWidth - 2;
  }
  reviewPrev.addEventListener('click', () => moveReviews(-1));
  reviewNext.addEventListener('click', () => moveReviews(1));
  reviewTrack.addEventListener('scroll', updateReviewButtons, { passive: true });
  window.addEventListener('resize', updateReviewButtons);
  window.addEventListener('load', updateReviewButtons);
  updateReviewButtons();



  /* Only long reviews need an expansion button. Without JavaScript, all
     reviews remain fully readable. Recheck after a resize or fonts load. */
  function sizeReviewQuotes() {
    document.querySelectorAll('.review-card').forEach(card => {
      const paragraph = card.querySelector('blockquote p');
      const button = card.querySelector('.review-expand');
      if (card.classList.contains('review-expanded')) return;
      card.classList.remove('has-review-toggle');
      const lineHeight = parseFloat(getComputedStyle(paragraph).lineHeight);
      const isLong = paragraph.scrollHeight > lineHeight * 5 + 2;
      card.classList.toggle('has-review-toggle', isLong);
      button.hidden = !isLong;
    });
  }
  document.querySelectorAll('.review-expand').forEach(button => {
    button.addEventListener('click', () => {
      const card = button.closest('.review-card');
      const expanded = card.classList.toggle('review-expanded');
      button.setAttribute('aria-expanded', String(expanded));
      button.textContent = expanded ? 'Read less' : 'Read more';
      if (!expanded) sizeReviewQuotes();
    });
  });
  window.addEventListener('resize', sizeReviewQuotes);
  window.addEventListener('load', sizeReviewQuotes);
  if (document.fonts) document.fonts.ready.then(sizeReviewQuotes);
  sizeReviewQuotes();



  // Add more objects to this list to include more photos.
  // The folder, filename, and extension must match your actual image files.
  const aboutPhotos = [
    { src: 'Images/Normal Photo.jpg', alt: 'Jake' },
    { src: 'Images/Ponder Photo.jpg', alt: 'Jake pondering' }
  ];
  const aboutPhoto = document.getElementById('about-photo');
  const photoPosition = document.getElementById('photo-position');
  let aboutPhotoIndex = 0;

  function showAboutPhoto(step) {
    // Wrap around: Next on the last photo returns to the first.
    aboutPhotoIndex = (aboutPhotoIndex + step + aboutPhotos.length) % aboutPhotos.length;
    const photo = aboutPhotos[aboutPhotoIndex];
    aboutPhoto.src = photo.src;
    aboutPhoto.alt = photo.alt;
    photoPosition.textContent = `${aboutPhotoIndex + 1} / ${aboutPhotos.length}`;
  }
  document.getElementById('photo-previous').addEventListener('click', () => showAboutPhoto(-1));
  document.getElementById('photo-next').addEventListener('click', () => showAboutPhoto(1));
  showAboutPhoto(0);

