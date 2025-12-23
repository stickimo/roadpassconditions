// Light helper utilities shared across pages.
export function qs(selector, scope = document) {
  return scope.querySelector(selector);
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
