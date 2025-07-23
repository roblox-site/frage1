// script.js

document.addEventListener('DOMContentLoaded', () => {
  const noDiscord = document.getElementById('no-discord');
  const discordWrapper = document.querySelector('.discord-input-wrapper');

  noDiscord.addEventListener('change', () => {
    // Nur das Textfeld verbergen/anzeigen
    discordWrapper.classList.toggle('hidden', noDiscord.checked);
  });
});
