document.querySelectorAll('form[action*="formspree.io"]').forEach(function (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var data = new FormData(form);
    var btn = form.querySelector('[type="submit"]');
    if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }
    fetch(form.action, {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' }
    }).then(function (res) {
      if (res.ok) {
        form.innerHTML =
          '<div style="text-align:center; padding:28px 16px; color:inherit;">' +
          '<div style="font-size:40px; line-height:1; margin-bottom:10px;">&#10003;</div>' +
          '<h3 style="margin:0 0 8px; font-size:20px;">Thank you!</h3>' +
          '<p style="margin:0; opacity:.85;">Thanks for reaching out to Impact Logic&trade;. ' +
          'We\'ve received your message and will be in touch soon.</p></div>';
      } else {
        if (btn) { btn.disabled = false; btn.textContent = 'Submit'; }
        alert('Sorry, something went wrong. Please try again, or email bob@impactlogic.net.');
      }
    }).catch(function () {
      if (btn) { btn.disabled = false; btn.textContent = 'Submit'; }
      alert('Sorry, something went wrong. Please try again, or email bob@impactlogic.net.');
    });
  });
});
