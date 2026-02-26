// Theme toggle logic for Uiverse switch
(function() {
  const html = document.documentElement;
  const toggleCheckbox = document.getElementById('theme-toggle');

  // Get saved theme or system preference
  function getPreferredTheme() {
    const stored = localStorage.getItem('theme');
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  // Set theme and update checkbox
  function setTheme(theme) {
    if (theme === 'light') {
      html.classList.add('light-theme');
      html.classList.remove('dark-theme');
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
      if (toggleCheckbox) toggleCheckbox.checked = false; // Show sun for light
    } else {
      html.classList.add('dark-theme');
      html.classList.remove('light-theme');
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
      if (toggleCheckbox) toggleCheckbox.checked = true; // Show moon for dark
    }
  }

  // Set light theme as the default theme
  if (!localStorage.getItem('theme')) {
    document.body.classList.add('light-theme');
    localStorage.setItem('theme', 'light');
  } else if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-theme');
  } else {
    document.body.classList.remove('light-theme');
  }

  // On page load, always set theme based on saved or preferred
  setTheme(getPreferredTheme());

  if (toggleCheckbox) {
    toggleCheckbox.addEventListener('change', function() {
      const next = toggleCheckbox.checked ? 'dark' : 'light';
      setTheme(next);
      localStorage.setItem('theme', next);
    });
  }

  // Listen for tab visibility changes to re-apply theme instantly
  document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
      setTheme(getPreferredTheme());
    }
  });
})();
