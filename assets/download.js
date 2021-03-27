(function() {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
  overlay.style.display = 'flex';
  overlay.style.alignItems = 'center';
  overlay.style.justifyContent = 'center';
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.right = '0';
  overlay.style.bottom = '0';
  overlay.style.left = '0';

  const dialog = document.createElement('div');
  dialog.className = 'modal-dialog';
  dialog.style.backgroundColor = 'white';
  dialog.style.padding = '20px';
  dialog.style.width = '400px';
  overlay.appendChild(dialog);

  function open(el) {
    const first = Math.floor(5 * Math.random());
    const second = Math.floor(5 * Math.random());
    dialog.innerHTML = [
      '<h1>Are you human?</h1>',
      `<p>What is ${first} + ${second}?</p>`,
      '<input class="captcha"/> <button>Download</button>',
      `<p>Having trouble? Download from <a href="${el.getAttribute('href')}">Mediafire</a>.`
    ].join('');

    document.body.appendChild(overlay);
  }


  Array.from(document.querySelectorAll('a[data-download]')).forEach(function(el) {
    el.addEventListener('click', function(evt) { open(el, evt) });
  });
}());