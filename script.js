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

  // Validierungsfunktionen pro Frage
  const validators = [
    // Frage 1: Name 3–20 Zeichen
    () => {
      const v = document.getElementById("name").value.trim();
      return v.length >= 3 && v.length <= 20
        ? null
        : "Du hast bei Frage 1 keinen gültigen Namen eingegeben";
    },
    // Frage 2: Tag, Monat, Jahr ausgefüllt
    () => {
      const d = document.getElementById("day").value,
            m = document.getElementById("month").value,
            y = document.getElementById("year").value;
      return (d && m && y)
        ? null
        : "Du hast Frage 2 nicht vollständig bearbeitet.";
    },
    // Frage 3–7: Textarea ≥ 200 Zeichen
    id => {
      const v = document.getElementById(id).value.trim();
      return v.length >= 200
        ? null
        : "Du musst bei Frage " + idMap[id] + " mindestens 200 Zeichen eingeben.";
    },
    // Frage 8: Bundesland 3–20 Zeichen
    () => {
      const v = document.getElementById("bundesland").value.trim();
      return v.length >= 3 && v.length <= 20
        ? null
        : "Du hast bei Frage 8 keinen gültigen Namen eingegeben";
    },
    // Frage 9: Wenn kein Discord angekreuzt, dann Text 3–30 Zeichen
    () => {
      const noDisc = document.getElementById("no-discord").checked;
      const v = document.getElementById("discord").value.trim();
      if (noDisc) return null;
      return v.length >= 3 && v.length <= 30
        ? null
        : "Du benötigst einen gültigen Discord Benutzernamen bei Frage 9, um mitzumachen";
    },
    // Frage 11: Checkbox angekreuzt
    () => {
      return document.getElementById("confirm-join").checked
        ? null
        : "Du musst dir bei Frage 11 sicher sein, teilzunehmen";
    },
    // Frage 12: Unterschrift 3–20 Zeichen
    () => {
      const v = document.getElementById("unterschrift").value.trim();
      return v.length >= 3 && v.length <= 20
        ? null
        : "Du hast bei Frage 12 keinen gültigen Namen eingegeben";
    },
  ];

  // Hilfs-Map für Textarea-IDs zu Nummer
  const idMap = {
    motivation: 3,
    einzigartig: 4,
    erwartungen: 5,
    aufbau: 6,
    erfahrungen: 7
  };

  // Prüft das gesamte Formular, gibt Fehlermeldung oder null
  function validateForm() {
    // Frage 1
    let err = validators[0]();
    if (err) return err;
    // Frage 2
    err = validators[1]();
    if (err) return err;
    // Frage 3–7
    for (let i = 2; i < 7; i++) {
      const id = Object.keys(idMap)[i - 2];
      err = validators[i](id);
      if (err) return err;
    }
    // Frage 8
    err = validators[7]();
    if (err) return err;
    // Frage 9
    err = validators[8]();
    if (err) return err;
    // Frage 11
    err = validators[9]();
    if (err) return err;
    // Frage 12
    err = validators[10]();
    if (err) return err;

    return null;
  }

  // Event: Submit
  form.addEventListener("submit", e => {
    e.preventDefault();
    const err = validateForm();
    if (err) {
      // Fehler anzeigen und Button deaktivieren
      errorMessage.textContent = err;
      submitBtn.classList.add("disabled");
      submitBtn.disabled = true;
    } else {
      // Weiterleiten
      window.location.href = "https://MeineSeite.de/Fertig";
    }
  });

  // Bei jeder Änderung: Fehlermeldung löschen, Button aktivieren
  const allInputs = form.querySelectorAll("input, textarea, select");
  allInputs.forEach(el => {
    el.addEventListener("input", () => resetError());
    el.addEventListener("change", () => resetError());
  });

  function resetError() {
    if (submitBtn.disabled) {
      submitBtn.disabled = false;
      submitBtn.classList.remove("disabled");
    }
    errorMessage.textContent = "";
  }


});
