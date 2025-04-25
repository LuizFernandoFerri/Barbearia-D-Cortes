// Inicialização AOS (Animate On Scroll) - Verifica se AOS existe antes de inicializar
document.addEventListener('DOMContentLoaded', function() {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }

  // Elementos DOM - Verificamos se existem antes de usar
  const menuMobile = document.getElementById('menu-mobile');
  const mobileMenu = document.getElementById('mobile-menu');
  const closeMenu = document.getElementById('close-menu');
  const backToTop = document.getElementById('backToTop');

  // Funções do Menu Mobile - Com verificação de existência
  if (menuMobile && mobileMenu && closeMenu) {
    // Abrir menu
    menuMobile.addEventListener('click', function() {
      mobileMenu.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
    
    // Fechar menu
    closeMenu.addEventListener('click', function() {
      mobileMenu.classList.remove('active');
      document.body.style.overflow = 'auto';
    });
    
    // Fechar ao clicar em links
    const mobileMenuLinks = document.querySelectorAll('.mobile-nav-menu a');
    mobileMenuLinks.forEach(link => {
      link.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
      });
    });
    
    // Fechar ao clicar fora
    document.addEventListener('click', function(e) {
      if (mobileMenu.classList.contains('active') && 
          !mobileMenu.contains(e.target) &&
          !menuMobile.contains(e.target)) {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });
  }

  // Botão voltar ao topo
  if (backToTop) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 300) {
        backToTop.classList.add('active');
      } else {
        backToTop.classList.remove('active');
      }
    });
    
    backToTop.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Ajuste de altura do vídeo
  const videoContainer = document.querySelector('.video-container');
  if (videoContainer) {
    const video = videoContainer.querySelector('video');
    if (video) {
      if (video.readyState >= 1) {
        adjustVideoHeight(video, videoContainer);
      } else {
        video.addEventListener('loadedmetadata', function() {
          adjustVideoHeight(video, videoContainer);
        });
      }
    }
  }
});

function adjustVideoHeight(video, container) {
  const videoRatio = video.videoWidth / video.videoHeight;
  const containerWidth = container.clientWidth;
  container.style.paddingBottom = `${containerWidth / videoRatio}px`;
}

// Destaque do menu conforme a seção visível
function highlightMenuOnScroll() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.menu-desktop a');
  
  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (pageYOffset >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').includes(current)) {
        link.classList.add('active');
      }
    });
  });
}

// Inicializar destaque do menu
highlightMenuOnScroll();

// Lazy loading para imagens (opcional)
function lazyLoadImages() {
  const images = document.querySelectorAll('img[data-src]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });
    
    images.forEach(img => {
      imageObserver.observe(img);
    });
  } else {
    // Fallback para navegadores que não suportam IntersectionObserver
    images.forEach(img => {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    });
  }
}

// Inicializar funções quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  lazyLoadImages();
});

// Adicione no final do arquivo script.js
document.addEventListener('DOMContentLoaded', function() {
  // Função para verificar se uma imagem existe
  function checkImageExists(url, callback) {
    const img = new Image();
    img.onload = function() { callback(true); };
    img.onerror = function() { callback(false); };
    img.src = url;
  }
  
  // Adicionar fallback padrão para imagens que falharem
  const defaultAvatar = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" fill="%23333333"/><circle cx="100" cy="80" r="40" fill="%23666666"/><rect x="60" y="120" width="80" height="60" rx="4" fill="%23666666"/></svg>';
  
  // Verificar todas as imagens com atributo onerror
  const imagesWithFallback = document.querySelectorAll('img[onerror]');
  imagesWithFallback.forEach(img => {
    img.onerror = function() {
      this.src = defaultAvatar;
      this.onerror = null; // previne loops infinitos
    };
  });
}); 