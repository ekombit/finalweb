/**
 * API base URL for fetch("/api/...").
 * - Пустая строка: тот же хост, что и страница (Render с Express, или localhost при npm start).
 * - На Vercel/Netlify фронт на другом домене → запросы идут на бэкенд ниже.
 * Поменяй URL, если переименуешь сервис на Render.
 */
(function () {
  var BACKEND_ORIGIN = "https://finalweb-2-bru1.onrender.com";

  var origin = window.location.origin || "";
  var isLocal =
    /^https?:\/\/localhost\b/.test(origin) ||
    /^https?:\/\/127\.0\.0\.1\b/.test(origin);
  var isSameAsBackend = origin === BACKEND_ORIGIN;

  window.API_BASE = isLocal || isSameAsBackend ? "" : BACKEND_ORIGIN;
})();
