document.addEventListener("DOMContentLoaded", () => {
  // 👇 Cookie-Scroll-Sperre aktivieren
  document.getElementById('cookie-banner').style.display = 'block';
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

  // Cookie- und Scroll-Logik unverändert …
  // … (deine bisherigen Cookie- und Discord-Skripte)

  // =========== Validierungs-Logik ===========

  const form = document.querySelector("form");
  const submitBtn = document.querySelector(".submit-btn");
  const errorMessage = document.getElementById("error-message");

  const idMap = {
    motivation: 3,
    einzigartig: 4,
    erwartungen: 5,
    aufbau: 6,
    erfahrungen: 7
  };

  // Validierungsfunktion
  function validateForm() {
    // Frage 1
    const name = document.getElementById("name").value.trim();
    if (name.length < 3 || name.length > 20) {
      return "Du hast bei Frage 1 keinen gültigen Namen eingegeben";
    }

    // Frage 2
    const day = document.getElementById("day").value;
    const month = document.getElementById("month").value;
    const year = document.getElementById("year").value;
    if (!day || !month || !year) {
      return "Du hast Frage 2 nicht vollständig bearbeitet.";
    }

    // Fragen 3–7 (Textarea ≥ 200 Zeichen)
    for (const [id, num] of Object.entries(idMap)) {
      const val = document.getElementById(id).value.trim();
      if (val.length < 200) {
        return `Du musst bei Frage ${num} mindestens 200 Zeichen eingeben.`;
      }
    }

    // Frage 8
    const bundesland = document.getElementById("bundesland").value.trim();
    if (bundesland.length < 3 || bundesland.length > 20) {
      return "Du hast bei Frage 8 keinen gültigen Namen eingegeben";
    }

    // Frage 9 (Discord)
const noDiscord = document.getElementById("no-discord").checked;
const discord = document.getElementById("discord").value.trim();
if (noDiscord || discord.length < 3 || discord.length > 30) {
  return "Du benötigst einen gültigen Discord Benutzernamen bei Frage 9, um mitzumachen";
}

    // Frage 11
    const confirmJoin = document.getElementById("confirm-join").checked;
    if (!confirmJoin) {
      return "Du musst dir bei Frage 11 sicher sein, teilzunehmen";
    }

    // Frage 12
    const unterschrift = document.getElementById("unterschrift").value.trim();
    if (unterschrift.length < 3 || unterschrift.length > 20) {
      return "Du hast bei Frage 12 keinen gültigen Namen eingegeben";
    }

    // ✅ Alles OK
    return null;
  }

  // 🟢 Validierung bei Absenden
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const error = validateForm();

    if (error) {
      errorMessage.textContent = error;
      submitBtn.classList.add("disabled");
      submitBtn.disabled = true;
    } else {
      window.location.href = "https://MeineSeite.de/Fertig";
    }
  });

  // 🔁 Eingaben beobachten: Fehler entfernen, Button aktivieren
  const allInputs = form.querySelectorAll("input, textarea, select");
  allInputs.forEach((input) => {
    input.addEventListener("input", resetErrors);
    input.addEventListener("change", resetErrors);
  });

  function resetErrors() {
    errorMessage.textContent = "";
    submitBtn.disabled = false;
    submitBtn.classList.remove("disabled");
  }
});
