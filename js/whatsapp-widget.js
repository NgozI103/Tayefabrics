(function initWhatsAppWidget() {
  if (document.getElementById('whatsapp-widget-link')) return;

  var link = document.createElement('a');
  link.id = 'whatsapp-widget-link';
  link.className = 'whatsapp-float';
  link.href = 'https://wa.me/2347063701725';
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.setAttribute('aria-label', 'Chat with us on WhatsApp');
  link.innerHTML = '<i class="bx bxl-whatsapp" aria-hidden="true"></i>';

  document.body.appendChild(link);
})();
