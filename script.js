document.addEventListener("DOMContentLoaded", () => {
  // 👇 Cookie-Scroll-Sperre aktivieren
  document.body.classList.add('no-scroll');

  const blockScroll = (e) => {
    e.preventDefault();
  };

  window.addEventListener('touchmove', blockScroll, { passive: false });
  window.addEventListener('wheel', blockScroll, { passive: false });

  const acceptBtn = document.getElementById('accept-cookies');
  if (acceptBtn) {
    acceptBtn.addEventListener('click', () => {
      const cookieBanner = document.getElementById('cookie-banner');
      cookieBanner.classList.add('flip-out');

      // Nach Animation freigeben
      setTimeout(() => {
        cookieBanner.remove();
        document.body.classList.remove('no-scroll');
        window.removeEventListener('touchmove', blockScroll);
        window.removeEventListener('wheel', blockScroll);
      }, 600);
    });
  }

  // 👇 Discord Checkbox-Logik
  const noDiscord = document.getElementById('no-discord');
  const discordInputWrapper = document.getElementById('discord-input-wrapper');

  noDiscord.addEventListener('change', () => {
    if (noDiscord.checked) {
      discordInputWrapper.style.display = 'none';
    } else {
      discordInputWrapper.style.display = 'block';
    }
  });

  // 👇 Scroll-Animation
  const animatedItems = document.querySelectorAll(".animate-on-scroll");

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1
  };

  const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove("animate-on-scroll");
        entry.target.classList.add("bounce-in");
        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);
  animatedItems.forEach(item => observer.observe(item));
});
