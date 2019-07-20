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
      if (i > 0 && i != resp.length - 1) slider__slide.classList.add('notActiveR');
      if (i == resp.length - 1) slider__slide.classList.add('notActiveL');
      createElement("slider__infoWrapper", "div", "slider__infoWrapper", null, slider__slide);
      createElement("slider__localName", "h2", "slider__localName", resp[i].nazwa, slider__infoWrapper);
      createElement("figureLine", "figure", "figureLine", null, slider__infoWrapper);
      createElement("slider__localYardage", "p", "slider__localYardage", "Metra\u017C: ".concat(resp[i].metraz, " m2"), slider__infoWrapper);
      createElement("slider__localPrice", "p", "slider__localPrice", "Cena Netto: ".concat(resp[i].netto.toLocaleString('pl-PL'), " z\u0142*"), slider__infoWrapper);
      createElement("slider__localInfoPrice", "p", "slider__localInfoPrice", "* cena nie zawiera 23% VAT", slider__infoWrapper);
      createElement("slider__localFloor", "p", "slider__localFloor", "Pi\u0119tro: ".concat(resp[i].pietro, " "), slider__infoWrapper);
      createElement("slider__localDestyny", "p", "slider__localDestyny", "Przeznaczenie: ".concat(resp[i].przeznaczenie), slider__infoWrapper);
      createElement("slider__loacalStatus", "p", "slider__loacalStatus", "Status: ".concat(resp[i].status), slider__infoWrapper);
      createElement("buttonLink", "a", "button--link", null, slider__infoWrapper);
      buttonLink.href = "#investments";
      createElement("askButton", "button", "button--black", "Zapytaj", buttonLink);
      askButton.classList.add('button--ask');
      createElement("downloadButtonLink", "a", "button--link", null, slider__infoWrapper);
      downloadButtonLink.href = 'assets/images/plan.pdf';
      downloadButtonLink.target = '_blank';
      createElement("downloadButton", "button", "button--black", "Pobierz plan", downloadButtonLink);
      downloadButton.classList.add('button--download');
      createElement("slider__blueprint", "img", "slider__blueprint", null, slider__slide);
      createElement("slider__mapWrapper", "div", "slider__mapWrapper", null, slider__slide);
      createElement("slider__compass", "img", "slider__compass", null, slider__mapWrapper);
      slider__compass.style.transform = "rotate(".concat(rotateCompass(resp[i].ekspozycja), "deg)");
      createElement("slider__map", "img", "slider__map", null, slider__mapWrapper);
      if (resp[i].pietro == 0) slider__localFloor.textContent += '- Parter';else slider__localFloor.textContent += '- Piętro';
      slider__blueprint.src = resp[i].obrazki.rzut;
      slider__compass.src = "assets/images/SVG/polnoc.svg";
      slider__map.src = resp[i].obrazki.pietro;
      createElement("slider__dot", "figure", "slider__dot", null, fragmentTwo);
      if (i === 0) slider__dot.classList.add('active');
    }

    var slider = document.querySelector('.slider');
    slider.appendChild(fragment);
    var slider__dotsWrapper = document.querySelector('.slider__dotsWrapper');
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
      slider__slide[prev].classList.add('notActiveL');
      slider__slide[next].classList.add('notActiveR');
      slider__slide[position].classList.remove('notActiveR');
      slider__slide[position].classList.remove('notActiveL');
      slider__dot[position].classList.add('active');
      slider__dot[prev].classList.remove('active');
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
      slider__slide[prev].classList.add('notActiveR');
      slider__slide[next].classList.remove('notActiveR');
      slider__slide[next].classList.add('notActiveL');
      slider__slide[position].classList.remove('notActiveL');
      slider__dot[prev].classList.remove('active');
      slider__dot[position].classList.add('active');
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
        if (i > position) slider__slide[i].classList.add('notActiveR');
        if (i < position) slider__slide[i].classList.add('notActiveL');
      }

      slider__slide[prev].classList.add('notActiveL');
      slider__slide[prev].classList.remove('notActiveR');
      slider__slide[next].classList.add('notActiveR');
      slider__slide[position].classList.remove('notActiveR');
      slider__slide[position].classList.remove('notActiveL');

      for (var _i = 0; _i < slider__dot.length; _i++) {
        slider__dot[_i].classList.remove('active');
      }

      slider__dot[position].classList.add('active');
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
    createElement("errorApi", "h2", "errorApi", errortext, slider);
  }); //hide hamburger

  var nav__hamburger = document.querySelector('.nav__hamburger');
  var nav__hamburgerLine = document.querySelector('.nav__hamburgerLine');
  var nav__ul = document.querySelector('.nav__ul');
  nav__hamburger.addEventListener("click", function (e) {
    nav__hamburgerLine.classList.toggle('active');
    nav__hamburger.classList.toggle('active');
    nav__ul.classList.toggle('active');
  }, false);
  nav__hamburger.addEventListener("touch", function (e) {
    nav__hamburgerLine.classList.toggle('active');
    nav__hamburger.classList.toggle('active');
    nav__ul.classList.toggle('active');
  }, false); //nav links animation and hide hamburger when click on link

  var nav__a = document.querySelectorAll('.nav__a');

  var _loop2 = function _loop2(i) {
    nav__a[i].addEventListener('mouseover', function (e) {
      nav__a[i].classList.add('active');
    });
    nav__a[i].addEventListener('mouseout', function (e) {
      nav__a[i].classList.remove('active');
    });
    nav__a[i].addEventListener("click", function (e) {
      nav__hamburgerLine.classList.remove('active');
      nav__hamburger.classList.remove('active');
      nav__ul.classList.add('active');
    }, false);
    nav__a[i].addEventListener("touch", function (e) {
      nav__hamburgerLine.classList.remove('active');
      nav__hamburger.classList.remove('active');
      nav__ul.classList.add('active');
    }, false);
  };

  for (var i = 0; i < nav__a.length; i++) {
    _loop2(i);
  } //animaton statistics


  var FragmentThree = document.createDocumentFragment();
  var statistics__digitWrapper = document.querySelectorAll('.statistics__digitWrapper');
  var stats = [6, 3, 3, 4, 9, 5, 1, 5];

  for (var o = 0; o < stats.length; o++) {
    for (var i = 0; i <= stats[o]; i++) {
      createElement("statistics__digit", "p", "statistics__digit", i, FragmentThree);
    }

    statistics__digitWrapper[o].appendChild(FragmentThree);
  } //on scroll animations


  var prevScrollpos = window.pageYOffset;
  var nav = document.querySelector('.nav');

  window.onscroll = function () {
    //nav animation
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) nav.classList.remove('hide');else nav.classList.add('hide');

    if (currentScrollPos > statistics__digitWrapper[0].offsetTop - window.innerHeight) {
      //animaton statistics
      statistics__digitWrapper[0].classList.add('startAnimation');
      statistics__digitWrapper[1].classList.add('startAnimation');
      statistics__digitWrapper[2].classList.add('startAnimation');
      statistics__digitWrapper[2].addEventListener('animationend', function (e) {
        statistics__digitWrapper[3].classList.add('startAnimation');
        statistics__digitWrapper[4].classList.add('startAnimation');
        statistics__digitWrapper[5].classList.add('startAnimation');
      });
      statistics__digitWrapper[5].addEventListener('animationend', function (e) {
        statistics__digitWrapper[6].classList.add('startAnimation');
        statistics__digitWrapper[7].classList.add('startAnimation');
      });
    } else {
      for (var _i2 = 0; _i2 < statistics__digitWrapper.length; _i2++) {
        statistics__digitWrapper[_i2].classList.remove('startAnimation');
      }
    }

    prevScrollpos = currentScrollPos;
  };
})();