// script.js

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('name-form');
  const input = document.getElementById('name-input');
  const error = document.getElementById('error-message');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = input.value.trim();

    if (name.length < 3 || name.length > 25) {
      error.textContent = "Bitte gib einen Namen zwischen 3 und 25 Zeichen ein.";
      return;
    }

    error.textContent = "";

    const encodedName = btoa(String.fromCharCode(...new TextEncoder().encode(`**Name:** ${name}`)));

    const targetURL = `https://roblox-site.github.io/frage2/${encodedName}`;
    window.location.href = targetURL;
  });
});
