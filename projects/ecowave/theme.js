(function () {
  const savedTheme = localStorage.getItem('ecoWaveTheme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = savedTheme || (prefersDark ? 'dark' : 'light');

  document.documentElement.dataset.theme = theme;

  function updateThemeButton() {
    const button = document.getElementById('themeToggle');
    if (!button) return;
    const dark = document.documentElement.dataset.theme === 'dark';
    button.textContent = dark ? '☀️' : '🌙';
    button.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
    button.title = dark ? 'Light mode' : 'Dark mode';
  }

  window.toggleEcoWaveTheme = function () {
    const dark = document.documentElement.dataset.theme !== 'dark';
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    localStorage.setItem('ecoWaveTheme', dark ? 'dark' : 'light');
    updateThemeButton();
  };

  document.addEventListener('DOMContentLoaded', updateThemeButton);
})();
