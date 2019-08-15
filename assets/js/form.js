"use strict";

(function () {
  //form animations
  var form__input = document.querySelectorAll('.form__input');
  var form__label = document.querySelectorAll('.form__label');
  var form__checkboxWrapper = document.querySelectorAll('.form__checkbox-wrapper');
  var form__inputWrapper = document.querySelectorAll('.form__input-wrapper');
  var form__checkbox = document.querySelectorAll('.form__checkbox');

  for (var i = 0; i < form__input.length; i++) {
    if (form__input[i].value.length != 0) form__label[i].classList.add('form__label--active');
  }

  var _loop = function _loop(_i) {
    form__input[_i].addEventListener('focus', function (e) {
      form__label[_i].classList.add('form__label--active');
    });

    form__input[_i].addEventListener('focusout', function (e) {
      if (form__input[_i].value == '') form__label[_i].classList.remove('form__label--active');
    });
  };

  for (var _i = 0; _i < form__input.length; _i++) {
    _loop(_i);
  } //form validation


  var form = document.querySelectorAll('#form');
  var form__status = document.querySelectorAll('.form__status');

  var removeErrors = function removeErrors() {
    for (var _i2 = 0; _i2 < form__input.length; _i2++) {
      if (createElements['error' + _i2]) {
        createElements['error' + _i2].remove();

        delete createElements['error' + _i2];
      }
    }

    for (var _i3 = 0; _i3 < form__checkbox.length; _i3++) {
      if (createElements['errorBox' + _i3]) {
        createElements['errorBox' + _i3].remove();

        delete createElements['errorBox' + _i3];
      }
    }

    for (var _i4 = 0; _i4 < form__status.length; _i4++) {
      form__status[_i4].classList.remove('form__status--active');
    }
  };

  document.body.addEventListener('click', removeErrors);
  document.body.addEventListener('touch', removeErrors);

  var formValidation = function formValidation(firstBox, lastBox, firstInput, lastInput) {
    var regPhone = /^(?:\(?\+?48)?(?:[-\.\(\)\s]*(\d)){9}\)?$/;
    var regEmail = /^\S+@\S+\.[A-Za-z]+$/;

    for (var _i5 = firstInput; _i5 < lastInput; _i5++) {
      if (form__input[_i5].value.length == 0) {
        if (!createElements['error' + _i5]) {
          if (_i5 < 3) createElement("error" + _i5, "div", ["form__error"], "Proszę uzupełnić pole.", form__inputWrapper[_i5]);else createElement("error" + _i5, "div", ["form__error", "form__error--white"], "Proszę uzupełnić pole.", form__inputWrapper[_i5]);
        }

        form__input[_i5].focus();

        return false;
      }

      if (_i5 == 1 && !form__input[_i5].value.match(regPhone)) {
        if (!createElements['error' + _i5]) createElement("error" + _i5, "div", ["form__error"], "Błędny numer telefonu.", form__inputWrapper[_i5]);

        form__input[_i5].focus();

        return false;
      }

      if (_i5 == 4 && !form__input[_i5].value.match(regPhone) && !form__input[_i5].value.match(regEmail)) {
        if (!createElements['error' + _i5]) createElement("error" + _i5, "div", ["form__error", "form__error--white"], "Błędny telefon lub adres email.", form__inputWrapper[_i5]);

        form__input[_i5].focus();

        return false;
      }
    }

    for (var _i6 = firstBox; _i6 < lastBox; _i6++) {
      if (!form__checkbox[_i6].checked) {
        if (!createElements['errorBox' + _i6]) {
          if (_i6 < 2) createElement("errorBox" + _i6, "div", ["form__error", "form__error--checkbox"], "Wymagana zgoda.", form__checkboxWrapper[_i6]);else createElement("errorBox" + _i6, "div", ["form__error", "form__error--checkbox", "form__error--white"], "Wymagana zgoda.", form__checkboxWrapper[_i6]);
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

      for (var _i7 = 0; _i7 < 3; _i7++) {
        form__label[_i7].classList.remove('form__label--active');
      }

      loader[0].classList.remove('loader--hidden');
    }
  });
  form[1].addEventListener('submit', function (e) {
    e.preventDefault();
    if (formValidation(2, 4, 3, 6) == false) return false;else {
      sendFormToPHP('../../inc/send_contact.php', 1);
      form[1].reset();

      for (var _i8 = 3; _i8 < form__input.length; _i8++) {
        form__label[_i8].classList.remove('form__label--active');
      }

      loader[1].classList.remove('loader--hidden');
    }
  });
})();