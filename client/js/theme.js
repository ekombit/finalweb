$(document).ready(function () {
  const $toggle = $("#themeToggle");
  if (!$toggle.length) return;

  const currentTheme = localStorage.getItem("theme");
  if (currentTheme === "light") {
    $("body").addClass("light-mode");
    $toggle.text("🌞 Light Mode");
  }

  $toggle.on("click", function () {
    $("body").toggleClass("light-mode");
    const isLight = $("body").hasClass("light-mode");
    $toggle.text(isLight ? "🌞 Light Mode" : "🌙 Dark Mode");
    localStorage.setItem("theme", isLight ? "light" : "dark");
  });
});


