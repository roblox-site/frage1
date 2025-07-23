document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("overlay");
  const banner = document.getElementById("cookie-banner");
  const acceptBtn = document.getElementById("accept-cookies");

  const showCookieBanner = () => {
    overlay.style.display = "block";
    banner.style.display = "block";
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
  };

  const hideCookieBanner = () => {
    overlay.style.display = "none";
    banner.style.display = "none";
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";
  };

  if (!localStorage.getItem("cookieAccepted")) {
    showCookieBanner();
  }

  acceptBtn.addEventListener("click", () => {
    localStorage.setItem("cookieAccepted", "true");
    hideCookieBanner();
  });
});
