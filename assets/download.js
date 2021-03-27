(function() {
  const s3BaseUrl = ['http', 's://', 'wmyt-series', '.s3.', 'amazonaws', '.com'].join('');
  const fileNames = {
    stitchWin: 'sheep_f32.zip',
    stitchMac: 'sheep_f32.zip',
    wmytWin: 'sheep_f32.zip',
    wmytMac: 'sheep_f32.zip',
  };
  const fileDesc = {
    stitchWin: '<em>A Stitch in Time</em> for Windows',
    stitchMac: '<em>A Stitch in Time</em> for Mac OS',
    wmytWin: '<em>What Makes You Tick</em> for Windows',
    wmytMac: '<em>What Makes You Tick</em> for Mac OS',
  };

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

  function saveS3File(fileref) {
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = [s3BaseUrl, fileNames[fileref]].join('/');
    a.download = fileNames[fileref];
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  function open(el) {
    const first = Math.floor(10 * Math.random());
    const second = Math.floor(10 * Math.random());
    const fileref = el.getAttribute('data-download');

    const close = function() {
      dialog.removeEventListener('submit', onSubmit);
      overlay.removeEventListener('click', onClose);
      overlay.parentElement.removeChild(overlay);
    };
    const onSubmit = function(evt) {
      evt.preventDefault();
      const captcha = dialog.querySelector('#captcha');
      if (Number(captcha.value) === first + second) {
        saveS3File(fileref);
        close();
      }
    };
    const onClose = function(evt) {
      if (evt.target === overlay) {
        evt.preventDefault();
        close();
      }
    };

    dialog.innerHTML = [
      `<h1>${fileDesc[fileref]}</h1>`,
      `<p>Please verify that you're human: <strong>what is ${first} + ${second}?</strong></p>`,
      '<form><input id="captcha" placeholder="answer"/> <button>Download</button></form>',
      `<p>Having trouble? Download from <a href="${el.getAttribute('href')}">Mediafire</a>.`
    ].join('');

    document.body.appendChild(overlay);
    dialog.addEventListener('submit', onSubmit);
    overlay.addEventListener('click', onClose);
  }

  Array.from(document.querySelectorAll('a[data-download]')).forEach(function(el) {
    el.addEventListener('click', function(evt) {
      evt.preventDefault();
      open(el, evt);
    });
  });
}());