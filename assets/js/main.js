"use strict";

(function () {
  //additional functions
  var createElement = function createElement(name, type, clas, txt, parent) {
    window[name] = document.createElement(type);
    window[name].classList.add(clas);
    window[name].innerText = txt;
    parent.appendChild(window[name]);
  };

  var rotateCompass = function rotateCompass(n) {
    var direction = ['Północ', 'Północny-Wschód', 'Wschód', 'Południowy-Wschód', 'Południe', 'Południowy-Zachód', 'Zachód', 'Północny-Zachód'];

    for (var i = 1; i < direction.length; i++) {
      if (n == direction[i]) return i * 45;
    }
  }; //API


  var fragment = document.createDocumentFragment();
  var fragmentTwo = document.createDocumentFragment();
  fetch('https://api.adcookie.usermd.net/deweloper/') //create elements API
  .then(function (resp) {
    return resp.json();
  }).then(function (resp) {
    for (var i = 0; i < resp.length; i++) {
      createElement("slider__slide", "div", "slider__slide", null, fragment);
      if (i > 0 && i != resp.length - 1) slider__slide.classList.add('slider__slide--right');
      if (i == resp.length - 1) slider__slide.classList.add('slider__slide--left');
      createElement("slider__infoWrapper", "div", "slider__info-wrapper", null, slider__slide);
      createElement("slider__localName", "h2", "slider__local-name", resp[i].nazwa, slider__infoWrapper);
      createElement("figureLine", "figure", "figure-line", null, slider__infoWrapper);
      createElement("slider__localYardage", "p", "slider__local-yardage", "Metra\u017C: ".concat(resp[i].metraz, " m2"), slider__infoWrapper);
      createElement("slider__localPrice", "p", "slider__local-price", "Cena Netto: ".concat(resp[i].netto.toLocaleString('pl-PL'), " z\u0142*"), slider__infoWrapper);
      createElement("slider__localInfoPrice", "p", "slider__local-info-price", "* cena nie zawiera 23% VAT", slider__infoWrapper);
      createElement("slider__localFloor", "p", "slider__local-floor", "Pi\u0119tro: ".concat(resp[i].pietro, " "), slider__infoWrapper);
      createElement("slider__localDestyny", "p", "slider__local-destyny", "Przeznaczenie: ".concat(resp[i].przeznaczenie), slider__infoWrapper);
      createElement("slider__loacalStatus", "p", "slider__loacal-status", "Status: ".concat(resp[i].status), slider__infoWrapper);
      createElement("buttonLink", "a", "button--link", null, slider__infoWrapper);
      buttonLink.href = "#investments";
      createElement("askButton", "button", "button--black", "Zapytaj", buttonLink);
      askButton.classList.add('button--ask');
      askButton.classList.add('button');
      createElement("downloadButtonLink", "a", "button--link", null, slider__infoWrapper);
      downloadButtonLink.href = 'assets/images/plan.pdf';
      downloadButtonLink.target = '_blank';
      createElement("downloadButton", "button", "button--black", "Pobierz plan", downloadButtonLink);
      downloadButton.classList.add('button--download');
      downloadButton.classList.add('button');
      createElement("slider__blueprint", "img", "slider__blueprint", null, slider__slide);
      createElement("slider__mapWrapper", "div", "slider__map-wrapper", null, slider__slide);
      createElement("slider__compass", "img", "slider__compass", null, slider__mapWrapper);
      slider__compass.style.transform = "rotate(".concat(rotateCompass(resp[i].ekspozycja), "deg)");
      createElement("slider__map", "img", "slider__map", null, slider__mapWrapper);
      if (resp[i].pietro == 0) slider__localFloor.textContent += '- Parter';else slider__localFloor.textContent += '- Piętro';
      slider__blueprint.src = resp[i].obrazki.rzut;
      slider__compass.src = "assets/images/SVG/polnoc.svg";
      slider__map.src = resp[i].obrazki.pietro;
      createElement("slider__dot", "figure", "slider__dot", null, fragmentTwo);
      if (i === 0) slider__dot.classList.add('slider__dot--active');
    }

    var slider = document.querySelector('.slider');
    slider.appendChild(fragment);
    var slider__dotsWrapper = document.querySelector('.slider__dots-wrapper');
    slider__dotsWrapper.appendChild(fragmentTwo);
  }) //scroll_animation
  .then(function (resp) {
    $(document).ready(function () {
      $('a[href^="#"]').on('click touch', function (event) {
        var target = $($(this).attr('href'));

        if (target.length) {
          event.preventDefault();
          $('html, body').animate({
            scrollTop: target.offset().top - 60
          }, 500);
        }
      });
    });
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

      for (var _i = 0; _i < slider__dot.length; _i++) {
        slider__dot[_i].classList.remove('slider__dot--active');
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
    createElement("slider__errorApi", "h2", "slider__errorApi", errortext, slider);
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


  var FragmentThree = document.createDocumentFragment();
  var statistics__digitWrapper = document.querySelectorAll('.statistics__digit-wrapper');
  var stats = [6, 3, 3, 4, 9, 5, 1, 5];

  for (var o = 0; o < stats.length; o++) {
    for (var _i2 = 0; _i2 <= stats[o]; _i2++) {
      createElement("statistics__digit", "p", "statistics__digit", _i2, FragmentThree);
    }

    statistics__digitWrapper[o].appendChild(FragmentThree);
  } //on scroll animations


  var prevScrollpos = window.pageYOffset;
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
      for (var _i3 = 0; _i3 < statistics__digitWrapper.length; _i3++) {
        statistics__digitWrapper[_i3].classList.remove('statistics__digit-wrapper--animate');
      }
    }

    prevScrollpos = currentScrollPos;
  };
})();