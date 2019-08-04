"use strict";

(function () {
  //additional functions
  var createElements = [];

  var createElement = function createElement(name, type, clas, txt, parent) {
    createElements[name] = document.createElement(type);

    for (var i = 0; i < clas.length; i++) {
      createElements[name].classList.add(clas[i]);
    }

    createElements[name].innerText = txt;
    parent.appendChild(createElements[name]);
  }; //API


  var slider = document.querySelector('.slider');
  fetch('https://api.adcookie.usermd.net/deweloper/') //create elements API 
  .then(function (resp) {
    return resp.json();
  }).then(function (resp) {
    var slider__dotsWrapper = document.querySelector('.slider__dots-wrapper');

    var rotateCompass = function rotateCompass(n) {
      var direction = ['Północ', 'Północny-Wschód', 'Wschód', 'Południowy-Wschód', 'Południe', 'Południowy-Zachód', 'Zachód', 'Północny-Zachód'];

      for (var i = 1; i < direction.length; i++) {
        if (n == direction[i]) return i * 45;
      }
    };

    for (var i = 0; i < resp.length; i++) {
      var floor = void 0;
      if (resp[i].pietro == 0) floor = '- Parter';else floor = '- Piętro';
      createElement("slider__slide" + i, "div", ["slider__slide"], null, slider);
      if (i > 0 && i != resp.length - 1) createElements['slider__slide' + i].classList.add('slider__slide--right');
      if (i == resp.length - 1) createElements['slider__slide' + i].classList.add('slider__slide--left');
      createElements['slider__slide' + i].innerHTML = "\n                <div class=\"slider__info-wrapper\">\n                    <h2 class=\"slider__local-name\">".concat(resp[i].nazwa, "</h2>\n                    <figure class=\"figure-line\"></figure>\n                    <p class=\"slider__local-yardage\">Metra\u017C: ").concat(resp[i].metraz, " m2</p>\n                    <p class=\"slider__local-price\">Cena Netto: ").concat(resp[i].netto.toLocaleString('pl-PL'), " z\u0142*</p>\n                    <p class=\"slider__local-info-price\">* cena nie zawiera 23% VAT</p>\n                    <p class=\"slider__local-floor\">Pi\u0119tro: ").concat(resp[i].pietro + floor, " </p>\n                    <p class=\"slider__local-destyny\">Przeznaczenie: ").concat(resp[i].przeznaczenie, "</p>\n                    <p class=\"slider__loacal-status\">Status: ").concat(resp[i].status, "</p>\n                    <button class=\"button--black button--ask button\"><a id=\"button-scroll\" class=\"button__link\" href=\"#investments\"></a>Zapytaj</button><button class=\"button--black button--download button\"><a class=\"button__link\" href=\"../assets/images/plan.pdf\" target=\"_blank\"></a>Pobierz plan</button>\n                </div>\n                <img class=\"slider__blueprint\" src=\"").concat(resp[i].obrazki.rzut, "\">\n                <div class=\"slider__map-wrapper\">\n                    <img class=\"slider__compass\" src=\"../assets/images/SVG/polnoc.svg\" style=\"transform: rotate(").concat(rotateCompass(resp[i].ekspozycja), "deg)\">\n                    <img class=\"slider__map\" src=\"").concat(resp[i].obrazki.pietro, "\">\n                </div>\n                ");
      createElement("slider__dot" + i, "figure", ["slider__dot"], null, slider__dotsWrapper);
      if (i === 0) createElements['slider__dot' + i].classList.add('slider__dot--active');
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
      if (history.pushState) history.pushState(null, null, targetId);else location.hash = targetId;

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
  }).then(function (resp) {
    //animate serch menu
    var arrow = document.querySelectorAll('#arrow');
    var slider__dot = document.querySelectorAll('.slider__dot');
    var slider__slide = document.querySelectorAll('.slider__slide');
    var position = 0;
    var prev;
    var next;

    var rightMove = function rightMove() {
      position++;
      prev = position - 1;
      next = position + 1;

      if (position == slider__slide.length) {
        position = 0;
        prev = slider__slide.length - 1;
        next = position + 1;
      }

      if (position == slider__slide.length - 1) next = 0;
      slider__slide[prev].classList.add('slider__slide--left');
      slider__slide[next].classList.add('slider__slide--right');
      slider__slide[position].classList.remove('slider__slide--right');
      slider__slide[position].classList.remove('slider__slide--left');
      slider__dot[position].classList.add('slider__dot--active');
      slider__dot[prev].classList.remove('slider__dot--active');
    };

    var leftMove = function leftMove() {
      position--;
      prev = position + 1;
      next = position - 1;

      if (position < 0) {
        position = slider__slide.length - 1;
        prev = 0;
        next = position - 1;
      }

      if (position == 0) next = slider__slide.length - 1;
      slider__slide[prev].classList.add('slider__slide--right');
      slider__slide[next].classList.remove('slider__slide--right');
      slider__slide[next].classList.add('slider__slide--left');
      slider__slide[position].classList.remove('slider__slide--left');
      slider__dot[prev].classList.remove('slider__dot--active');
      slider__dot[position].classList.add('slider__dot--active');
    };

    arrow[1].addEventListener("click", rightMove);
    arrow[1].addEventListener("touch", rightMove);
    arrow[0].addEventListener("click", leftMove);
    arrow[0].addEventListener("touch", leftMove);
    document.addEventListener("keydown", function (event) {
      //keybord (left and right arrows)
      if (event.keyCode == 37) leftMove();
      if (event.keyCode == 39) rightMove();
    });

    var dotClick = function dotClick(click) {
      position = click;
      prev = position - 1;
      next = position + 1;
      if (position == slider__slide.length - 1) next = 0;
      if (position == 0) prev = slider__slide.length - 1;

      for (var i = 0; i < slider__slide.length; i++) {
        if (i > position) slider__slide[i].classList.add('slider__slide--right');
        if (i < position) slider__slide[i].classList.add('slider__slide--left');
      }

      slider__slide[prev].classList.add('slider__slide--left');
      slider__slide[prev].classList.remove('slider__slide--right');
      slider__slide[next].classList.add('slider__slide--right');
      slider__slide[position].classList.remove('slider__slide--right');
      slider__slide[position].classList.remove('slider__slide--left');

      for (var _i2 = 0; _i2 < slider__dot.length; _i2++) {
        slider__dot[_i2].classList.remove('slider__dot--active');
      }

      slider__dot[position].classList.add('slider__dot--active');
    };

    var _loop = function _loop(i) {
      slider__dot[i].addEventListener('click', function (e) {
        dotClick(i);
      });
      slider__dot[i].addEventListener('touch', function (e) {
        dotClick(i);
      });
    };

    for (var i = 0; i < slider__dot.length; i++) {
      _loop(i);
    }
  }).catch(function (error) {
    console.log('Błąd API: ', error);
    var errortext = 'Przepraszamy. Brak połączenia z serwerem.';
    createElement("slider__errorApi", "h2", ["slider__error-api"], errortext, slider);
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
    for (var _i3 = 0; _i3 <= stats[o]; _i3++) {
      createElement("statistics__digit", "p", ["statistics__digit"], _i3, fragment);
    }

    statistics__digitWrapper[o].appendChild(fragment);
  } //on scroll animations


  var prevScrollpos = window.pageYOffset + 60;
  var nav = document.querySelector('.nav');

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
    } else {
      for (var _i4 = 0; _i4 < statistics__digitWrapper.length; _i4++) {
        statistics__digitWrapper[_i4].classList.remove('statistics__digit-wrapper--animate');
      }
    }

    prevScrollpos = currentScrollPos;
  };
})();