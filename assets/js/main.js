"use strict";

(function () {
  //API
  var swiper = document.querySelector('.swiper-wrapper');
  fetch('https://api.adcookie.usermd.net/deweloper/') //create elements API 
  .then(function (resp) {
    return resp.json();
  }).then(function (resp) {
    var rotateCompass = function rotateCompass(n) {
      var direction = ['Północ', 'Północny-Wschód', 'Wschód', 'Południowy-Wschód', 'Południe', 'Południowy-Zachód', 'Zachód', 'Północny-Zachód'];

      for (var i = 1; i < direction.length; i++) {
        if (n == direction[i]) return i * 45;
      }
    };

    for (var i = 0; i < resp.length; i++) {
      var floor = void 0;
      if (resp[i].pietro == 0) floor = '- Parter';else floor = '- Piętro';
      createElement("swiper__slide".concat(i), "div", ["swiper-slide"], null, swiper);
      createElements["swiper__slide".concat(i)].innerHTML = "\n                <div class=\"swiper-slide-content\">\n                    <div class=\"swiper__info-wrapper\">\n                        <h2 class=\"swiper__local-name\">".concat(resp[i].nazwa, "</h2>\n                        <figure class=\"figure-line\"></figure>\n                        <p class=\"swiper__local-yardage\">Metra\u017C: ").concat(resp[i].metraz, " m2</p>\n                        <p class=\"swiper__local-price\">Cena Netto: ").concat(resp[i].netto.toLocaleString('pl-PL'), " z\u0142*</p>\n                        <p class=\"swiper__local-info-price\">* cena nie zawiera 23% VAT</p>\n                        <p class=\"swiper__local-floor\">Pi\u0119tro: ").concat(resp[i].pietro + floor, " </p>\n                        <p class=\"swiper__local-destyny\">Przeznaczenie: ").concat(resp[i].przeznaczenie, "</p>\n                        <p class=\"swiper__loacal-status\">Status: ").concat(resp[i].status, "</p>\n                        <button class=\"button--black button--ask button\"><a id=\"button-scroll\" class=\"button__link\" href=\"#investments\"></a>Zapytaj</button><button class=\"button--black button--download button\"><a class=\"button__link\" href=\"assets/images/plan.pdf\" target=\"_blank\"></a>Pobierz plan</button>\n                    </div>\n                    <img class=\"swiper__blueprint\" src=\"").concat(resp[i].obrazki.rzut, "\">\n                    <div class=\"swiper__map-wrapper\">\n                        <img class=\"swiper__compass\" src=\"assets/images/SVG/polnoc.svg\" style=\"transform: rotate(").concat(rotateCompass(resp[i].ekspozycja), "deg)\">\n                        <img class=\"swiper__map\" src=\"").concat(resp[i].obrazki.pietro, "\">\n                    </div>\n                </div>\n                ");
      mySwiper.appendSlide(createElements["swiper__slide".concat(i)]);
    }
  }) //scroll_animation 
  .then(function (resp) {
    var link = document.querySelectorAll('.nav__menu-link');
    var button = document.querySelectorAll('#button-scroll');

    for (var i = 0; i < button.length; i++) {
      button[i].addEventListener("click", smoothScroll);
      button[i].addEventListener("touch", smoothScroll);
    }

    for (var _i = 0; _i < link.length; _i++) {
      link[_i].addEventListener("click", smoothScroll);

      link[_i].addEventListener("touch", smoothScroll);
    }

    function smoothScroll(event) {
      event.preventDefault();
      var targetId = event.currentTarget.getAttribute("href") === "#" ? "header" : event.currentTarget.getAttribute("href");
      var targetPosition = document.querySelector(targetId).offsetTop - 60;
      var startPosition = window.pageYOffset;
      var distance = targetPosition - startPosition;
      var duration = 700;
      var start = null;
      window.requestAnimationFrame(step);
      if (history.replaceState) history.replaceState(null, null, targetId);else location.hash = targetId;

      function step(timestamp) {
        if (!start) start = timestamp;
        var progress = timestamp - start;
        window.scrollTo(0, easeInOutCubic(progress, startPosition, distance, duration));
        if (progress < duration) window.requestAnimationFrame(step);
      }
    }

    var easeInOutCubic = function easeInOutCubic(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t * t + b;
      t -= 2;
      return c / 2 * (t * t * t + 2) + b;
    };
  }).catch(function (error) {
    console.log('Błąd API: ', error);
    var errortext = 'Przepraszamy. Brak połączenia z serwerem.';
    createElement("swiper__errorApi", "h2", ["swiper__error-api"], errortext, swiper);
  }); //hide hamburger

  var nav__hamburger = document.querySelector('.nav__hamburger');
  var nav__hamburgerLine = document.querySelector('.nav__hamburger-line');
  var nav__menu = document.querySelector('.nav__menu');
  nav__hamburger.addEventListener("click", function (e) {
    nav__hamburgerLine.classList.toggle('nav__hamburger-line--active');
    nav__hamburger.classList.toggle('nav__hamburger--active');
    nav__menu.classList.toggle('nav__menu--active');
  }, false);
  nav__hamburger.addEventListener("touch", function (e) {
    nav__hamburgerLine.classList.toggle('nav__hamburger-line--active');
    nav__hamburger.classList.toggle('nav__hamburger--active');
    nav__menu.classList.toggle('nav__menu--active');
  }, false); //hide menu when click on link

  var nav__menuLink = document.querySelectorAll('.nav__menu-link');

  for (var i = 0; i < nav__menuLink.length; i++) {
    nav__menuLink[i].addEventListener("click", function (e) {
      nav__hamburgerLine.classList.remove('nav__hamburger-line--active');
      nav__hamburger.classList.remove('nav__hamburger--active');
      nav__menu.classList.add('nav__menu--active');
    }, false);
    nav__menuLink[i].addEventListener("touch", function (e) {
      nav__hamburgerLine.classList.remove('nav__hamburger-line--active');
      nav__hamburger.classList.remove('nav__hamburger--active');
      nav__menu.classList.add('nav__menu--active');
    }, false);
  } //animaton statistics


  var fragment = document.createDocumentFragment();
  var statistics__digitWrapper = document.querySelectorAll('.statistics__digit-wrapper');
  var stats = [6, 3, 3, 4, 9, 5, 1, 5];

  for (var o = 0; o < stats.length; o++) {
    for (var _i2 = 0; _i2 <= stats[o]; _i2++) {
      createElement("statistics__digit", "p", ["statistics__digit"], _i2, fragment);
    }

    statistics__digitWrapper[o].appendChild(fragment);
  } //on scroll animations


  var prevScrollpos = window.pageYOffset + 60;
  var nav = document.querySelector('.nav');
  var sectionAnimation = document.querySelectorAll('.section-animation');

  window.onscroll = function () {
    //nav animation
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) nav.classList.remove('nav--hide');else nav.classList.add('nav--hide');

    if (currentScrollPos > statistics__digitWrapper[0].offsetTop - window.innerHeight) {
      //animaton statistics
      statistics__digitWrapper[0].classList.add('statistics__digit-wrapper--animate');
      statistics__digitWrapper[1].classList.add('statistics__digit-wrapper--animate');
      statistics__digitWrapper[2].classList.add('statistics__digit-wrapper--animate');
      statistics__digitWrapper[2].addEventListener('animationend', function (e) {
        statistics__digitWrapper[3].classList.add('statistics__digit-wrapper--animate');
        statistics__digitWrapper[4].classList.add('statistics__digit-wrapper--animate');
        statistics__digitWrapper[5].classList.add('statistics__digit-wrapper--animate');
      });
      statistics__digitWrapper[5].addEventListener('animationend', function (e) {
        statistics__digitWrapper[6].classList.add('statistics__digit-wrapper--animate');
        statistics__digitWrapper[7].classList.add('statistics__digit-wrapper--animate');
      });
    } //section animation


    for (var _i3 = 0; _i3 < sectionAnimation.length; _i3++) {
      if (currentScrollPos > sectionAnimation[_i3].offsetTop - window.innerHeight + 200 && currentScrollPos < sectionAnimation[_i3].offsetTop + sectionAnimation[_i3].offsetHeight - 200) {
        sectionAnimation[_i3].classList.add('section-animation-stop');
      }
    }

    prevScrollpos = currentScrollPos;
  };
})();