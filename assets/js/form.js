"use strict";

(function () {
  //checkbox
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
  var form__errorCheckBox = document.querySelectorAll('.form__error--checkbox');
  var errors = document.querySelectorAll('#error');
  var form__status = document.querySelectorAll('.form__status');
  var loader = document.querySelectorAll('.loader');

  var _loop3 = function _loop3(i) {
    form__input[i].addEventListener('focus', function (e) {
      errors[i].classList.add('form__error--not-active');
    });
  };

  for (var i = 0; i < form__input.length; i++) {
    _loop3(i);
  }

  var _loop4 = function _loop4(i) {
    form__checkboxInfo[i].addEventListener('click', function (e) {
      form__errorCheckBox[i].classList.add('form__error--not-active');
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
        loader[0].classList.add('loader--hidden');
        form__status[0].textContent = "Wiadomość została wysłana";
        form__status[0].classList.add('form__status--active');
      },
      error: function error(XMLHttpRequest, textStatus, errorThrown) {
        console.log(XMLHttpRequest + textStatus + errorThrown);
        loader[0].classList.add('loader--hidden');
        form__status[0].textContent = "Bład systemu";
        form__status[0].classList.add('form__status--active');
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
        loader[1].classList.add('loader--hidden');
        form__status[1].textContent = "Wiadomość została wysłana";
        form__status[1].classList.add('form__status--active');
      },
      error: function error(XMLHttpRequest, textStatus, errorThrown) {
        console.log(XMLHttpRequest + textStatus + errorThrown);
        loader[1].classList.add('loader--hidden');
        form__status[1].textContent = "Bład systemu";
        form__status[1].classList.add('form__status--active');
      }
    });
  };

  var formValidation = function formValidation(firstBox, lastBox, firstInput, lastInput) {
    var notChec = 0;
    var notEmpty = 0;

    for (var i = firstBox; i < lastBox; i++) {
      if (form__checkbox[i].checked == false) {
        form__errorCheckBox[i].classList.remove('form__error--not-active');
        notChec++;
      }
    }

    for (var _i = firstInput; _i < lastInput; _i++) {
      if (form__input[_i].value.length == 0) {
        errors[_i].classList.remove('form__error--not-active');

        notEmpty++;
      }
    }

    if (notChec > 0 || notEmpty > 0) return false;
  };

  form[0].addEventListener('submit', function (e) {
    e.preventDefault();
    if (formValidation(0, 2, 0, 3) == false) return false;else {
      sendFormInvestments();

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
      sendFormContact();

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