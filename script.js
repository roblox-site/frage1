document.addEventListener("DOMContentLoaded", () => {
  // Discord checkbox logik
  const noDiscord = document.getElementById('no-discord');
  const discordInputWrapper = document.getElementById('discord-input-wrapper');

  noDiscord.addEventListener('change', () => {
    if (noDiscord.checked) {
      discordInputWrapper.style.display = 'none';
    } else {
      discordInputWrapper.style.display = 'block';
    }
  });

  // Scroll-Animation
  const animatedItems = document.querySelectorAll(".animate-on-scroll");

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1
  };

  const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
  entry.target.classList.remove("animate-on-scroll"); // WICHTIG!
  entry.target.classList.add("bounce-in");
  observer.unobserve(entry.target);
}

    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);

  animatedItems.forEach(item => observer.observe(item));
});

  // COOKIE-BANNER LOGIK
  const overlay = document.getElementById('overlay');
  const banner = document.getElementById('cookie-banner');
  const acceptBtn = document.getElementById('accept-cookies');

  function showCookieBanner() {
    overlay.style.display = 'block';
    banner.style.display = 'block';
    // Scroll und Interaktion blockieren
    document.body.style.overflow = 'hidden';
  }

  function hideCookieBanner() {
    // Flip-Out-Klasse hinzufügen
    banner.classList.add('flip-out');
    // Nach Animation Overlay und Banner entfernen
    setTimeout(() => {
      overlay.style.display = 'none';
      banner.style.display = 'none';
      document.body.style.overflow = ''; // Scroll wieder erlauben
    }, 600);
  }

  document.addEventListener('DOMContentLoaded', () => {
    // Prüfen, ob bereits akzeptiert
    if (!localStorage.getItem('cookieAccepted')) {
      showCookieBanner();
    }
    acceptBtn.addEventListener('click', () => {
      localStorage.setItem('cookieAccepted', 'true');
      hideCookieBanner();
    });
  });
