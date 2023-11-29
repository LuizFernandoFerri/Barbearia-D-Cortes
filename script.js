AOS.init();

function isElementInViewport(el) {
  var rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Função para pausar o vídeo quando estiver fora da tela
function pauseVideoOnScroll() {
  var video = document.querySelector('video');
  if (!isElementInViewport(video)) {
    video.pause();
  }
}

// Evento de rolagem para checar quando o vídeo está visível
window.addEventListener('scroll', pauseVideoOnScroll);