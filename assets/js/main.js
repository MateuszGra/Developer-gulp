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
      createElement("devWrapper", "div", "devWrapper", null, fragment);
      if (i > 0 && i != resp.length - 1) devWrapper.classList.add('notActiveR');
      if (i == resp.length - 1) devWrapper.classList.add('notActiveL');
      createElement("devInfo", "div", "devInfo", null, devWrapper);
      createElement("devName", "h2", "devName", resp[i].nazwa, devInfo);
      createElement("figureLine", "figure", "figureLine", null, devInfo);
      createElement("devYardage", "p", "devYardage", "Metra\u017C: ".concat(resp[i].metraz, " m2"), devInfo);
      createElement("devPrice", "p", "devPrice", "Cena Netto: ".concat(resp[i].netto.toLocaleString('pl-PL'), " z\u0142*"), devInfo);
      createElement("devInfoPrice", "p", "devInfoPrice", "* cena nie zawiera 23% VAT", devInfo);
      createElement("devfloor", "p", "devfloor", "Pi\u0119tro: ".concat(resp[i].pietro, " "), devInfo);
      createElement("devDestiny", "p", "devDestiny", "Przeznaczenie: ".concat(resp[i].przeznaczenie), devInfo);
      createElement("devStatus", "p", "devStatus", "Status: ".concat(resp[i].status), devInfo);
      createElement("askButtonLink", "a", "askButtonLink", null, devInfo);
      askButtonLink.href = "#investments";
      createElement("askButton", "button", "buttonSecend", "Zapytaj", askButtonLink);
      askButton.classList.add('askButton');
      createElement("downloadButtonLink", "a", "downloadButtonLink", null, devInfo);
      downloadButtonLink.href = 'assets/images/plan.pdf';
      downloadButtonLink.target = '_blank';
      createElement("downloadButton", "button", "buttonSecend", "Pobierz plan", downloadButtonLink);
      downloadButton.classList.add('downButton');
      createElement("drop", "img", "drop", null, devWrapper);
      createElement("imgWrapper", "div", "imgWrapper", null, devWrapper);
      createElement("compass", "img", "compass", null, imgWrapper);
      compass.style.transform = "rotate(".concat(rotateCompass(resp[i].ekspozycja), "deg)");
      createElement("floor", "img", "floor", null, imgWrapper);
      if (resp[i].pietro == 0) devfloor.textContent += '- Parter';else devfloor.textContent += '- Piętro';
      drop.src = resp[i].obrazki.rzut;
      compass.src = "assets/images/SVG/polnoc.svg";
      floor.src = resp[i].obrazki.pietro;
      createElement("dot", "figure", "dot", null, fragmentTwo);
      if (i === 0) dot.classList.add('active');
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
    var dot = document.querySelectorAll('.dot');
    var devWrapper = document.querySelectorAll('.devWrapper');
    var position = 0;
    var prev;
    var next;

    var rightMove = function rightMove() {
      var devWrapper = document.querySelectorAll('.devWrapper');
      var dot = document.querySelectorAll('.dot');
      position++;
      prev = position - 1;
      next = position + 1;

      if (position == devWrapper.length) {
        position = 0;
        prev = devWrapper.length - 1;
        next = position + 1;
      }

      if (position == devWrapper.length - 1) next = 0;
      devWrapper[prev].classList.add('notActiveL');
      devWrapper[next].classList.add('notActiveR');
      devWrapper[position].classList.remove('notActiveR');
      devWrapper[position].classList.remove('notActiveL');
      dot[position].classList.add('active');
      dot[prev].classList.remove('active');
    };

    var leftMove = function leftMove() {
      position--;
      prev = position + 1;
      next = position - 1;

      if (position < 0) {
        position = devWrapper.length - 1;
        prev = 0;
        next = position - 1;
      }

      if (position == 0) next = devWrapper.length - 1;
      devWrapper[prev].classList.add('notActiveR');
      devWrapper[next].classList.remove('notActiveR');
      devWrapper[next].classList.add('notActiveL');
      devWrapper[position].classList.remove('notActiveL');
      dot[prev].classList.remove('active');
      dot[position].classList.add('active');
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
      if (position == devWrapper.length - 1) next = 0;
      if (position == 0) prev = devWrapper.length - 1;

      for (var i = 0; i < devWrapper.length; i++) {
        if (i > position) devWrapper[i].classList.add('notActiveR');
        if (i < position) devWrapper[i].classList.add('notActiveL');
      }

      devWrapper[prev].classList.add('notActiveL');
      devWrapper[prev].classList.remove('notActiveR');
      devWrapper[next].classList.add('notActiveR');
      devWrapper[position].classList.remove('notActiveR');
      devWrapper[position].classList.remove('notActiveL');

      for (var _i = 0; _i < dot.length; _i++) {
        dot[_i].classList.remove('active');
      }

      dot[position].classList.add('active');
    };

    var _loop = function _loop(i) {
      dot[i].addEventListener('click', function (e) {
        dotClick(i);
      });
      dot[i].addEventListener('touch', function (e) {
        dotClick(i);
      });
    };

    for (var i = 0; i < dot.length; i++) {
      _loop(i);
    }
  }).catch(function (error) {
    console.log('Błąd API: ', error);
    var errortext = 'Przepraszamy. Brak połączenia z serwerem.';
    createElement(name = "errorApi", type = "h2", clas = "errorApi", txt = errortext, parent = slider);
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