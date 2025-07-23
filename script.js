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
