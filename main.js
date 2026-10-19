$(function () {
  $('.menu-toggle').on('click', function () {
    $('.mobile-menu').toggleClass('open');
    $(this).toggleClass('open');
  });

  $('.mobile-menu a').on('click', function () {
    $('.mobile-menu').removeClass('open');
    $('.menu-toggle').removeClass('open');
  });

  const sections = $('section[id]');

  $(window).on('scroll', function() {
    let scrollY = $(this).scrollTop();

    if (scrollY > 40) {
      $('nav').css('background', 'rgba(13, 17, 23, 0.97)');
    } else {
      $('nav').css('background', 'rgba(13, 17, 23, 0.85)');
    }

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

  const progressObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const fill = entry.target.querySelector('.progress-fill');
        const width = fill.getAttribute('data-width');

        setTimeout(() => {
          fill.style.width = width + '%';
        }, 200);

        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  $('.progress-wrap').each(function() {
    progressObserver.observe(this);
  });

  $('#contactForm').on('submit', function (e) {
    e.preventDefault();

    var form = $(this);
    var btn = form.find('.btn-primary');
    var originalText = btn.text();
    var successMsg = $('#formSuccess');

    btn.text('Envoi en cours…').prop('disabled', true);

    $.ajax({
      url: form.attr('action'),
      method: form.attr('method'),
      data: form.serialize(),
      dataType: 'json',
      success: function() {
        successMsg.text("Message envoyé avec succès ! Je vous répondrai bientôt.").css('color', '#10b981').fadeIn(300);
        form[0].reset();
      },
      error: function() {
        successMsg.text("Oops! Il y a eu un problème lors de l'envoi.").css('color', '#ef4444').fadeIn(300);
      },
      complete: function() {
        btn.text(originalText).prop('disabled', false);

        setTimeout(() => successMsg.fadeOut(300), 5000);
      }
    });
  });

});
