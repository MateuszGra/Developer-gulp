"use strict";

(function () {
  var createElements = [];

  var createElement = function createElement(name, type, clas, txt, parent) {
    createElements[name] = document.createElement(type);

    for (var i = 0; i < clas.length; i++) {
      createElements[name].classList.add(clas[i]);
    }

    createElements[name].innerText = txt;
    parent.appendChild(createElements[name]);
  }; //checkbox


  var form__checkboxInfo = document.querySelectorAll('.form__checkbox-info');
  var form__checkbox = document.querySelectorAll('.form__checkbox');

  var _loop = function _loop(i) {
    form__checkboxInfo[i].addEventListener('click', function (e) {
      if (form__checkbox[i].checked == true) form__checkboxInfo[i].classList.remove('form__checkbox-info--chec');
      if (form__checkbox[i].checked == false) form__checkboxInfo[i].classList.add('form__checkbox-info--chec');
    });
    form__checkboxInfo[i].addEventListener('touch', function (e) {
      if (form__checkbox[i].checked == true) form__checkboxInfo[i].classList.remove('form__checkbox-info--chec');
      if (form__checkbox[i].checked == false) form__checkboxInfo[i].classList.add('form__checkbox-info--chec');
    });
  };

  for (var i = 0; i < form__checkboxInfo.length; i++) {
    _loop(i);
  } //form animations


  var form__input = document.querySelectorAll('.form__input');
  var form__label = document.querySelectorAll('.form__label');
  var form__checkboxWrapper = document.querySelectorAll('.form__checkbox-wrapper');
  var form__inputWrapper = document.querySelectorAll('.form__input-wrapper');

  var _loop2 = function _loop2(i) {
    form__input[i].addEventListener('focus', function (e) {
      form__label[i].classList.add('form__label--active');
    });
    form__input[i].addEventListener('focusout', function (e) {
      if (form__input[i].value == '') form__label[i].classList.remove('form__label--active');
    });
  };

  for (var i = 0; i < form__input.length; i++) {
    _loop2(i);
  } //form validation


  var form = document.querySelectorAll('#form');

  var _loop3 = function _loop3(i) {
    form__input[i].addEventListener('focus', function (e) {
      if (createElements['error' + i]) {
        createElements['error' + i].remove();
        delete createElements['error' + i];
      }
    });
  };

  for (var i = 0; i < form__input.length; i++) {
    _loop3(i);
  }

  var _loop4 = function _loop4(i) {
    form__checkboxInfo[i].addEventListener('click', function (e) {
      if (createElements['errorBox' + i]) {
        createElements['errorBox' + i].remove();
        delete createElements['errorBox' + i];
      }
    });
  };

  for (var i = 0; i < form__checkboxInfo.length; i++) {
    _loop4(i);
  }

  var formValidation = function formValidation(firstBox, lastBox, firstInput, lastInput) {
    var notChec = 0;
    var notEmpty = 0;

    for (var i = firstBox; i < lastBox; i++) {
      if (form__checkbox[i].checked == false) {
        if (!createElements['errorBox' + i]) {
          if (i < 2) createElement("errorBox" + i, "div", ["form__error", "form__error--checkbox"], "Wymagana zgoda.", form__checkboxWrapper[i]);else createElement("errorBox" + i, "div", ["form__error", "form__error--checkbox", "form__error--white"], "Wymagana zgoda.", form__checkboxWrapper[i]);
        }

        notChec++;
      }
    }

    for (var _i = firstInput; _i < lastInput; _i++) {
      if (form__input[_i].value.length == 0) {
        if (!createElements['error' + _i]) {
          if (_i < 3) createElement("error" + _i, "div", ["form__error"], "Proszę uzupełnić pole.", form__inputWrapper[_i]);else createElement("error" + _i, "div", ["form__error", "form__error--white"], "Proszę uzupełnić pole.", form__inputWrapper[_i]);
        }

        notEmpty++;
      }
    }

    if (notChec > 0 || notEmpty > 0) return false;
  }; //send email


  var form__status = document.querySelectorAll('.form__status');
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

      for (var i = 0; i < 2; i++) {
        form__checkboxInfo[i].classList.remove('form__checkbox-info--chec');
        form__checkbox[i].checked = false;
      }

      for (var _i2 = 0; _i2 < 3; _i2++) {
        form__input[_i2].value = '';

        form__label[_i2].classList.remove('form__label--active');
      }

      loader[0].classList.remove('loader--hidden');
    }
  });
  form[1].addEventListener('submit', function (e) {
    e.preventDefault();
    if (formValidation(2, 4, 3, 6) == false) return false;else {
      sendFormToPHP('../../inc/send_contact.php', 1);

      for (var i = 2; i < form__checkboxInfo.length; i++) {
        form__checkboxInfo[i].classList.remove('form__checkbox-info--chec');
        form__checkbox[i].checked = false;
      }

      for (var _i3 = 3; _i3 < form__input.length; _i3++) {
        form__input[_i3].value = '';

        form__label[_i3].classList.remove('form__label--active');
      }

      loader[1].classList.remove('loader--hidden');
    }
  }); //remove form status

  var _loop5 = function _loop5(i) {
    form[i].addEventListener('click', function () {
      form__status[i].classList.remove('form__status--active');
    });
    form[i].addEventListener('touch', function () {
      form__status[i].classList.remove('form__status--active');
    });
  };

  for (var i = 0; i < form__status.length; i++) {
    _loop5(i);
  }
})();