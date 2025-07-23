document.addEventListener('DOMContentLoaded', function () {
  const banner = document.getElementById('cookie-banner');
  const overlay = document.getElementById('overlay');
  const acceptBtn = document.getElementById('accept-btn');

  function showCookieBanner() {
    overlay.style.display = 'block';
    banner.style.display = 'block';
    // Scroll und Interaktion blockieren
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
  }

  function hideCookieBanner() {
    // Flip-Out-Klasse hinzufügen
    banner.classList.add('flip-out');
    // Nach Animation Overlay und Banner entfernen
    setTimeout(() => {
      overlay.style.display = 'none';
      banner.style.display = 'none';
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }, 600);
  }

  // Prüfen, ob bereits akzeptiert wurde
  const consent = localStorage.getItem('cookieConsent');
  if (!consent) {
    showCookieBanner();
  }

  acceptBtn.addEventListener('click', function () {
    localStorage.setItem('cookieConsent', 'accepted');
    hideCookieBanner();
  });
});
