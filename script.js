// Frage 9: Discord Eingabefeld ein-/ausblenden, je nach Checkbox
document.addEventListener("DOMContentLoaded", () => {
  const noDiscordCheckbox = document.getElementById("no-discord");
  const discordInputField = document.getElementById("discord");

  if (noDiscordCheckbox && discordInputField) {
    noDiscordCheckbox.addEventListener("change", () => {
      if (noDiscordCheckbox.checked) {
        discordInputField.classList.add("hidden");
      } else {
        discordInputField.classList.remove("hidden");
      }
    });
  }

  // Falls bei Neuladen Checkbox noch aktiviert ist (z. B. nach Zurück-Button im Browser)
  if (noDiscordCheckbox.checked) {
    discordInputField.classList.add("hidden");
  }
});
