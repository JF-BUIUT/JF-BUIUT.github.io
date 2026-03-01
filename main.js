/* =========================================
   JONAEL FELICIEN — Portfolio JS
   ========================================= */

$(function () {

  /* ------------------------------------------
     1. Menu Mobile & Animation du bouton
  ------------------------------------------ */
  $('.menu-toggle').on('click', function () {
    $('.mobile-menu').toggleClass('open');
    $(this).toggleClass('open'); // Anime le burger en croix
  });

  // Fermer le menu au clic sur un lien
  $('.mobile-menu a').on('click', function () {
    $('.mobile-menu').removeClass('open');
    $('.menu-toggle').removeClass('open');
  });

  /* ------------------------------------------
     2. Navigation active link on scroll
     (Plus fluide avec requestAnimationFrame)
  ------------------------------------------ */
  const sections = $('section[id]');
  
  $(window).on('scroll', function() {
    let scrollY = $(this).scrollTop();
    
    // Gérer l'opacité de la navbar
    if (scrollY > 40) {
      $('nav').css('background', 'rgba(13, 17, 23, 0.97)');
    } else {
      $('nav').css('background', 'rgba(13, 17, 23, 0.85)');
    }

    // Gérer le lien actif
    sections.each(function () {
      const top = $(this).offset().top - 100;
      const bottom = top + $(this).outerHeight();
      const id = $(this).attr('id');
      
      if (scrollY >= top && scrollY < bottom) {
        $('nav ul a').removeClass('active');
        $(`nav ul a[href="#${id}"]`).addClass('active');
      }
    });
  });

  /* ------------------------------------------
     3. Scroll-reveal (Apparition des éléments)
  ------------------------------------------ */
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  $('[data-reveal]').each(function() {
    revealObserver.observe(this);
  });

  /* ------------------------------------------
     4. Animation des barres de progression
  ------------------------------------------ */
  const progressObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const fill = entry.target.querySelector('.progress-fill');
        const width = fill.getAttribute('data-width');
        
        // Petit délai pour laisser le temps au scroll d'arriver
        setTimeout(() => {
          fill.style.width = width + '%';
        }, 200);
        
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 }); // 0.5 signifie que l'animation se lance quand la barre est à moitié visible

  $('.progress-wrap').each(function() {
    progressObserver.observe(this);
  });

  /* ------------------------------------------
     5. Contact form submit (simulé)
  ------------------------------------------ */
  $('#contactForm').on('submit', function (e) {
    e.preventDefault();
    const btn = $(this).find('.btn-primary');
    const originalText = btn.text();
    
    btn.text('Envoi en cours…').prop('disabled', true);

    setTimeout(function () {
      btn.text(originalText).prop('disabled', false);
      $('#formSuccess').fadeIn(300);
      $('#contactForm')[0].reset();
      
      setTimeout(() => $('#formSuccess').fadeOut(300), 5000);
    }, 1500);
  });

});