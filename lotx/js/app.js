(function() {
  'use strict';

  window.onload = function() {
    let content = localStorage.getItem("qrCodeMessage") || 'QR Codes are great!';
    $('#qrCodeMessage').val(content);
    $('#qrcode').qrcode(content);
  }

   $('#buttonGenerate').click(() => {
     console.log('click');
     let message = $('#qrCodeMessage').val();
     localStorage.setItem("qrCodeMessage", message);
     $('#qrcode').html('');
     $('#qrcode').qrcode(message);
   });


  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('../service-worker.js')
    .then(function(registration) {
      console.log('Registration successful, scope is:', registration.scope);
    })
    .catch(function(error) {
      console.log('Service worker registration failed, error:', error);
    });
  }

})();
