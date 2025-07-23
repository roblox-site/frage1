document.addEventListener("DOMContentLoaded", () => {
  // Discord checkbox logik
  const noDiscord = document.getElementById('no-discord');
  const discordInputWrapper = document.getElementById('discord-input-wrapper');

  if (noDiscord) {
    noDiscord.addEventListener('change', () => {
      if (noDiscord.checked) {
        discordInputWrapper.style.display = 'none';
      } else {
        discordInputWrapper.style.display = 'block';
      }
    });
  }

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
        entry.target.classList.remove("animate-on-scroll");
        entry.target.classList.add("bounce-in");
        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);
  animatedItems.forEach(item => observer.observe(item));

  // Cookie Banner – immer anzeigen
  const cookieBanner = document.getElementById('cookie-banner');
  const acceptBtn = document.getElementById('accept-cookies');

  document.body.classList.add('no-scroll');
  cookieBanner.style.display = 'block';

  acceptBtn.addEventListener('click', () => {
    cookieBanner.classList.add('flip-out');
    document.body.classList.remove('no-scroll');

    setTimeout(() => {
      cookieBanner.remove();
    }, 600);
  });
});
