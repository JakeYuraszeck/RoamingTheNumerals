


  
  
  
  const navToggle = document.getElementById('nav-toggle');
  const siteSidebar = document.getElementById('site-sidebar');
  const narrowMenu = window.matchMedia('(max-width: 900px)');

  function setSidebarCollapsed(collapsed) {
    document.body.classList.toggle('sidebar-collapsed', collapsed);
    if (navToggle) {
      navToggle.setAttribute('aria-expanded', String(!collapsed));
      navToggle.setAttribute(
        'aria-label',
        collapsed ? 'Open navigation menu' : 'Close navigation menu'
      );
    }
  }

  if (navToggle && siteSidebar) {
    setSidebarCollapsed(narrowMenu.matches);

    navToggle.addEventListener('click', event => {
      event.stopPropagation();
      setSidebarCollapsed(!document.body.classList.contains('sidebar-collapsed'));
    });

    document.querySelectorAll('#site-navigation a').forEach(link => {
      link.addEventListener('click', () => {
        if (narrowMenu.matches) setSidebarCollapsed(true);
      });
    });

    document.addEventListener('click', event => {
      if (!narrowMenu.matches) return;
      if (document.body.classList.contains('sidebar-collapsed')) return;
      if (siteSidebar.contains(event.target)) return;
      setSidebarCollapsed(true);
    });

    narrowMenu.addEventListener('change', event => {
      setSidebarCollapsed(event.matches);
    });
  }

const sidebarLinks = [...document.querySelectorAll('aside nav a')];

  const sidebarSections = sidebarLinks.map(link => ({
    link,
    section: document.querySelector(link.getAttribute('href'))
  })).filter(item => item.section);

  const bookingOptions = document.getElementById('booking-options');
  const bookingTrack = document.getElementById('booking-track');
  const bookingCards = bookingTrack ? [...bookingTrack.querySelectorAll('.booking-card')] : [];

  function updateHighlight() {
    if (!sidebarSections.length) return;

    
    let current = sidebarSections[0];

    sidebarSections.forEach(item => {
      if (item.section.classList.contains('booking-card')) return;

      if (item.section.getBoundingClientRect().top <= 100) {
        current = item;
      }
    });

    if (bookingOptions && bookingTrack && bookingCards.length) {
      const bookingTop = bookingOptions.getBoundingClientRect().top;
      const contact = document.getElementById('contact');
      const contactTop = contact ? contact.getBoundingClientRect().top : Infinity;

      if (bookingTop <= 100 && contactTop > 100) {
        const trackLeft = bookingTrack.getBoundingClientRect().left;
        const visibleCard = bookingCards.reduce((closest, card) => {
          const distance = Math.abs(card.getBoundingClientRect().left - trackLeft);
          const closestDistance = Math.abs(closest.getBoundingClientRect().left - trackLeft);
          return distance < closestDistance ? card : closest;
        });

        const bookingItem = sidebarSections.find(item => item.section === visibleCard);
        if (bookingItem) current = bookingItem;
      }
    }

    
    const pageHeight = document.documentElement.scrollHeight;
    const canScroll = pageHeight > window.innerHeight + 2;
    const atBottom =
      window.scrollY + window.innerHeight >= pageHeight - 2;

    if (canScroll && atBottom) {
      current = sidebarSections[sidebarSections.length - 1];
    }

    
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

  document.querySelectorAll('.booking-calendar').forEach(dropdown => {
    dropdown.addEventListener('toggle', updateHighlight);
  });

  updateHighlight();



  
  const packageSelect = document.getElementById('session-package');
  const mathCalendar = document.getElementById('math-calendar');
  const mathFrame = document.getElementById('math-calendar-frame');
  const mathLink = document.getElementById('math-booking-link');

  function updatePackage() {
    const url = packageSelect.value;
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
    updateHighlight();
  }
  if (packageSelect && mathCalendar && mathFrame && mathLink) {
    packageSelect.addEventListener('change', updatePackage);
    window.addEventListener('pageshow', updatePackage);
    updatePackage();
  }



  
  const bookingPrev = document.getElementById('booking-prev');
  const bookingNext = document.getElementById('booking-next');

  function moveBookings(direction) {
    if (!bookingTrack || !bookingCards.length) return;
    const card = bookingCards[0];
    const gap = parseFloat(getComputedStyle(bookingTrack).gap) || 16;
    bookingTrack.scrollBy({
      left: direction * (card.getBoundingClientRect().width + gap),
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
    });
  }

  function updateBookingButtons() {
    if (!bookingTrack || !bookingPrev || !bookingNext) return;
    bookingPrev.disabled = bookingTrack.scrollLeft <= 2;
    bookingNext.disabled = bookingTrack.scrollLeft + bookingTrack.clientWidth >= bookingTrack.scrollWidth - 2;
  }

  if (bookingTrack && bookingPrev && bookingNext) {
    bookingPrev.addEventListener('click', () => moveBookings(-1));
    bookingNext.addEventListener('click', () => moveBookings(1));
    bookingTrack.addEventListener('scroll', () => {
      updateBookingButtons();
      updateHighlight();
    }, { passive: true });
    window.addEventListener('resize', updateBookingButtons);
    window.addEventListener('load', updateBookingButtons);
    updateBookingButtons();
  }

  sidebarLinks.forEach(link => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target || !target.classList.contains('booking-card')) return;

    link.addEventListener('click', event => {
      event.preventDefault();
      target.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
        block: 'start',
        inline: 'start'
      });
      history.pushState(null, '', link.getAttribute('href'));
    });
  });


  
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
  if (reviewTrack && reviewPrev && reviewNext) {
    reviewPrev.addEventListener('click', () => moveReviews(-1));
    reviewNext.addEventListener('click', () => moveReviews(1));
    reviewTrack.addEventListener('scroll', updateReviewButtons, { passive: true });
    window.addEventListener('resize', updateReviewButtons);
    window.addEventListener('load', updateReviewButtons);
    updateReviewButtons();
  }



  
  function sizeReviewQuotes() {
    document.querySelectorAll('.review-card').forEach(card => {
      const paragraph = card.querySelector('blockquote p');
      const button = card.querySelector('.review-expand');
      if (card.classList.contains('review-expanded')) return;
      card.classList.remove('has-review-toggle');
      const lineHeight = parseFloat(getComputedStyle(paragraph).lineHeight);
      const isLong = paragraph.scrollHeight > lineHeight * 4 + 2;
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



  const aboutPhotos = [
    { src: 'Images/Normal Photo.jpg', alt: 'Jake' },
    { src: 'Images/Ponder Photo.jpg', alt: 'Jake pondering' }
  ];
  const aboutPhoto = document.getElementById('about-photo');
  const photoPosition = document.getElementById('photo-position');
  let aboutPhotoIndex = 0;

  function showAboutPhoto(step) {
    aboutPhotoIndex = (aboutPhotoIndex + step + aboutPhotos.length) % aboutPhotos.length;
    const photo = aboutPhotos[aboutPhotoIndex];
    aboutPhoto.src = photo.src;
    aboutPhoto.alt = photo.alt;
    photoPosition.textContent = `${aboutPhotoIndex + 1} / ${aboutPhotos.length}`;
  }
  document.getElementById('photo-previous').addEventListener('click', () => showAboutPhoto(-1));
  document.getElementById('photo-next').addEventListener('click', () => showAboutPhoto(1));
  showAboutPhoto(0);

