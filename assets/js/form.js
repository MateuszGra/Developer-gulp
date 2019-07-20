"use strict";

(function () {
  //checkbox
  var form__checkboxInfo = document.querySelectorAll('.form__checkboxInfo');

  var _loop = function _loop(i) {
    form__checkboxInfo[i].addEventListener('click', function (e) {
      form__checkboxInfo[i].classList.toggle('form__checkboxInfo--chec');
    });
    form__checkboxInfo[i].addEventListener('touch', function (e) {
      form__checkboxInfo[i].classList.toggle('form__checkboxInfo--chec');
    });
  };

  for (var i = 0; i < form__checkboxInfo.length; i++) {
    _loop(i);
  } //form animations


  var form__input = document.querySelectorAll('.form__input');
  var form__label = document.querySelectorAll('.form__label');

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
  var form__checkbox = document.querySelectorAll('.form__checkbox');
  var form__errorCheckBox = document.querySelectorAll('.form__error--checkbox');
  var errors = document.querySelectorAll('#error');

  var _loop3 = function _loop3(i) {
    form__input[i].addEventListener('focus', function (e) {
      errors[i].classList.add('form__error--notActive');
    });
  };

  for (var i = 0; i < form__input.length; i++) {
    _loop3(i);
  }

  var _loop4 = function _loop4(i) {
    form__checkboxInfo[i].addEventListener('click', function (e) {
      form__errorCheckBox[i].classList.add('form__error--notActive');
    });
  };

  for (var i = 0; i < form__checkboxInfo.length; i++) {
    _loop4(i);
  } //send email


  var sendFormInvestments = function sendFormInvestments(e) {
    $.ajax({
      type: 'POST',
      url: '../../inc/send_inwestments.php',
      data: {
        name: $('#name').val(),
        phone: $('#phone').val(),
        message: $('#message').val()
      },
      success: function success(data) {
        console.log(data);
      },
      error: function error(XMLHttpRequest, textStatus, errorThrown) {
        console.log(XMLHttpRequest + textStatus + errorThrown);
      }
    });
  };

  var sendFormContact = function sendFormContact(e) {
    $.ajax({
      type: 'POST',
      url: '../../inc/send_contact.php',
      data: {
        name: $('#nameContact').val(),
        phone: $('#phoneContact').val(),
        message: $('#messageContact').val()
      },
      success: function success(data) {
        console.log(data);
      },
      error: function error(XMLHttpRequest, textStatus, errorThrown) {
        console.log(XMLHttpRequest + textStatus + errorThrown);
      }
    });
  };

  var formValidation = function formValidation(firstBox, lastBox, firstInput, lastInput) {
    var notChec = 0;
    var notEmpty = 0;

    for (var i = firstBox; i < lastBox; i++) {
      if (form__checkbox[i].checked == false) {
        form__errorCheckBox[i].classList.remove('form__error--notActive');
        notChec++;
      }
    }

    for (var _i = firstInput; _i < lastInput; _i++) {
      if (form__input[_i].value.length == 0) {
        errors[_i].classList.remove('form__error--notActive');

        notEmpty++;
      }
    }

    if (notChec > 0 || notEmpty > 0) return false;
  };

  form[0].addEventListener('submit', function (e) {
    e.preventDefault();
    if (formValidation(0, 2, 0, 3) == false) return false;else sendFormInvestments();
  });
  form[1].addEventListener('submit', function (e) {
    e.preventDefault();
    if (formValidation(2, 4, 3, 6) == false) return false;else sendFormContact();
  });
})();