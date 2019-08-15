"use strict";

(function () {
  //form animations
  var form__input = document.querySelectorAll('.form__input');
  var form__label = document.querySelectorAll('.form__label');
  var form__checkboxWrapper = document.querySelectorAll('.form__checkbox-wrapper');
  var form__inputWrapper = document.querySelectorAll('.form__input-wrapper');
  var form__checkbox = document.querySelectorAll('.form__checkbox');

  var _loop = function _loop(i) {
    form__input[i].addEventListener('focus', function (e) {
      form__label[i].classList.add('form__label--active');
    });
    form__input[i].addEventListener('focusout', function (e) {
      if (form__input[i].value == '') form__label[i].classList.remove('form__label--active');
    });
  };

  for (var i = 0; i < form__input.length; i++) {
    _loop(i);
  } //form validation


  var form = document.querySelectorAll('#form');
  var form__status = document.querySelectorAll('.form__status');

  var removeErrors = function removeErrors() {
    for (var i = 0; i < form__input.length; i++) {
      if (createElements['error' + i]) {
        createElements['error' + i].remove();
        delete createElements['error' + i];
      }
    }

    for (var _i = 0; _i < form__checkbox.length; _i++) {
      if (createElements['errorBox' + _i]) {
        createElements['errorBox' + _i].remove();

        delete createElements['errorBox' + _i];
      }
    }

    for (var _i2 = 0; _i2 < form__status.length; _i2++) {
      form__status[_i2].classList.remove('form__status--active');
    }
  };

  document.body.addEventListener('click', removeErrors);
  document.body.addEventListener('touch', removeErrors);

  var formValidation = function formValidation(firstBox, lastBox, firstInput, lastInput) {
    var regPhone = /^(?:\(?\+?48)?(?:[-\.\(\)\s]*(\d)){9}\)?$/;
    var regEmail = /^\S+@\S+\.[A-Za-z]+$/;

    for (var i = firstInput; i < lastInput; i++) {
      if (form__input[i].value.length == 0) {
        if (!createElements['error' + i]) {
          if (i < 3) createElement("error" + i, "div", ["form__error"], "Proszę uzupełnić pole.", form__inputWrapper[i]);else createElement("error" + i, "div", ["form__error", "form__error--white"], "Proszę uzupełnić pole.", form__inputWrapper[i]);
        }

        form__input[i].focus();
        return false;
      }

      if (i == 1 && !form__input[i].value.match(regPhone)) {
        if (!createElements['error' + i]) createElement("error" + i, "div", ["form__error"], "Błędny numer telefonu.", form__inputWrapper[i]);
        form__input[i].focus();
        return false;
      }

      if (i == 4 && !form__input[i].value.match(regPhone) && !form__input[i].value.match(regEmail)) {
        if (!createElements['error' + i]) createElement("error" + i, "div", ["form__error", "form__error--white"], "Błędny telefon lub adres email.", form__inputWrapper[i]);
        form__input[i].focus();
        return false;
      }
    }

    for (var _i3 = firstBox; _i3 < lastBox; _i3++) {
      if (!form__checkbox[_i3].checked) {
        if (!createElements['errorBox' + _i3]) {
          if (_i3 < 2) createElement("errorBox" + _i3, "div", ["form__error", "form__error--checkbox"], "Wymagana zgoda.", form__checkboxWrapper[_i3]);else createElement("errorBox" + _i3, "div", ["form__error", "form__error--checkbox", "form__error--white"], "Wymagana zgoda.", form__checkboxWrapper[_i3]);
        }

        return false;
      }
    }
  }; //send email


  var loader = document.querySelectorAll('.loader');

  var sendFormToPHP = function sendFormToPHP(adress, n) {
    var data = new FormData();
    data.append('name', document.querySelectorAll('#name')[n].value);
    data.append('phone', document.querySelectorAll('#phone')[n].value);
    data.append('message', document.querySelectorAll('#message')[n].value);
    fetch(adress, {
      method: 'POST',
      body: data
    }).then(function (resp) {
      loader[n].classList.add('loader--hidden');
      form__status[n].textContent = "Wiadomość została wysłana.";
      form__status[n].classList.add('form__status--active');
    }).catch(function (error) {
      console.log(error);
      loader[n].classList.add('loader--hidden');
      form__status[n].textContent = "Błąd systemu.";
      form__status[n].classList.add('form__status--active');
    });
  };

  form[0].addEventListener('submit', function (e) {
    e.preventDefault();
    if (formValidation(0, 2, 0, 3) == false) return false;else {
      sendFormToPHP('../../inc/send_inwestments.php', 0);
      form[0].reset();

      for (var i = 0; i < 3; i++) {
        form__label[i].classList.remove('form__label--active');
      }

      loader[0].classList.remove('loader--hidden');
    }
  });
  form[1].addEventListener('submit', function (e) {
    e.preventDefault();
    if (formValidation(2, 4, 3, 6) == false) return false;else {
      sendFormToPHP('../../inc/send_contact.php', 1);
      form[1].reset();

      for (var i = 3; i < form__input.length; i++) {
        form__label[i].classList.remove('form__label--active');
      }

      loader[1].classList.remove('loader--hidden');
    }
  });
})();