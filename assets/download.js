(function() {
  const s3BaseUrl = ['http', 's://', 'wmyt-series', '.s3.', 'amazonaws', '.com'].join('');
  const fileNames = {
    stitchWin: 'stitch_windows.zip',
    stitchMac: 'stitch_macos.zip',
    wmytWin: 'wmyt_windows.zip',
    wmytMac: 'wmyt_macos.zip',
  };
  const fileDesc = {
    stitchWin: 'Download <strong>"A Stitch in Time"</strong> for Windows',
    stitchMac: 'Download <strong>"A Stitch in Time"</strong> for Mac OS',
    wmytWin: 'Download <strong>"What Makes You Tick"</strong> for Windows',
    wmytMac: 'Download <strong>"What Makes You Tick"</strong> for Mac OS',
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
      if (evt.target === overlay || /close/.test(evt.target.className)) {
        evt.preventDefault();
        close();
      }
    };

    dialog.innerHTML = [
      `<h1>${fileDesc[fileref]}</h1>`,
      `<p>Please confirm you're human: <strong class="prompt">what is ${first} + ${second}?</strong></p>`,
      '<form><input id="captcha" placeholder="answer"/> <button type="submit">Download</button></form>',
      `<p>Having trouble? Download from <a href="${el.getAttribute('href')}">MEGA</a>.`,
      '<a class="close" href="#">×</a>'
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
})();

(function() {
  const settingName = 'withDownloads';
  let downloadsEnabled = false;

  if (/\?downloads?/.test(location.search)) {
    downloadsEnabled = true;
    localStorage.setItem(settingName, 'y');
  } else if (location.search === '?reset') {
    localStorage.removeItem(settingName);
  } else if (localStorage.getItem(settingName) === 'y') {
    downloadsEnabled = true;
  }

  if (downloadsEnabled) {
    Array.from(document.querySelectorAll('.with-downloads')).forEach(function(el) {
      el.classList.remove('with-downloads');
    });

    var div = document.createElement('div');
    div.innerHTML = '<style>.sans-downloads { display:none !important; }</style>';
    document.body.appendChild(div.firstChild);
  }
})();