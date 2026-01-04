// Light helper utilities shared across pages.
export function qs(selector, scope = document) {
  return scope.querySelector(selector);
}

// Theme management
const THEME_KEY = 'rpc-theme';

function getSystemTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function getSavedTheme() {
  try {
    return localStorage.getItem(THEME_KEY);
  } catch {
    return null;
  }
}

function saveTheme(theme) {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    // Storage unavailable
  }
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
}

function getCurrentTheme() {
  return document.documentElement.getAttribute('data-theme') || 'light';
}

export function initTheme() {
  const saved = getSavedTheme();
  const theme = saved || getSystemTheme();
  applyTheme(theme);

  // Listen for OS theme changes (only if user hasn't set preference)
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!getSavedTheme()) {
      applyTheme(e.matches ? 'dark' : 'light');
      updateToggleButton();
    }
  });
}

function updateToggleButton() {
  const toggle = document.querySelector('.theme-toggle');
  if (!toggle) return;
  const theme = getCurrentTheme();
  const icon = toggle.querySelector('.theme-toggle-icon');
  const label = toggle.querySelector('.theme-toggle-label');
  if (icon) icon.textContent = theme === 'dark' ? '☀️' : '🌙';
  if (label) label.textContent = theme === 'dark' ? 'Light' : 'Dark';
}

export function setupThemeToggle() {
  const toggle = document.querySelector('.theme-toggle');
  if (!toggle) return;

  updateToggleButton();

  toggle.addEventListener('click', () => {
    const current = getCurrentTheme();
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    saveTheme(next);
    updateToggleButton();
  });
}

export function formatElevation(feet) {
  return feet ? `${feet.toLocaleString()} ft` : 'Elevation N/A';
}

export function formatTime(isoString) {
  if (!isoString) return 'Time unavailable';
  const date = new Date(isoString);
  return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
}

export function handleError(message, node) {
  if (node) node.textContent = message;
  console.error(message);
}

export function createList(items) {
  const ul = document.createElement('ul');
  items.forEach((item) => {
    const li = document.createElement('li');
    li.textContent = item;
    ul.appendChild(li);
  });
  return ul;
}

export function onReady(callback) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', callback);
  } else {
    callback();
  }
}
