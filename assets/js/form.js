"use strict";

(function () {
  //checkbox
  var checkbox = document.querySelectorAll('#checbox');

  var _loop = function _loop(i) {
    checkbox[i].addEventListener('click', function (e) {
      checkbox[i].classList.toggle('chec');
    });
    checkbox[i].addEventListener('touch', function (e) {
      checkbox[i].classList.toggle('chec');
    });
  };

  for (var i = 0; i < checkbox.length; i++) {
    _loop(i);
  } //form animations


  var inputForm = document.querySelectorAll('.input');
  var labelForm = document.querySelectorAll('#label');

  var _loop2 = function _loop2(i) {
    inputForm[i].addEventListener('focus', function (e) {
      labelForm[i].classList.add('active');
    });
    inputForm[i].addEventListener('focusout', function (e) {
      if (inputForm[i].value == '') labelForm[i].classList.remove('active');
    });
  };

  for (var i = 0; i < inputForm.length; i++) {
    _loop2(i);
  } //form validation


  var contact_form = document.querySelectorAll('#contact_form');
  var checkboxValid = document.querySelectorAll('.checkbox');
  var errorsBox = document.querySelectorAll('#errorChec');
  var errors = document.querySelectorAll('#error');

  var _loop3 = function _loop3(i) {
    inputForm[i].addEventListener('focus', function (e) {
      errors[i].classList.add('notActive');
    });
  };

  for (var i = 0; i < inputForm.length; i++) {
    _loop3(i);
  }

  var _loop4 = function _loop4(i) {
    checkbox[i].addEventListener('click', function (e) {
      errorsBox[i].classList.add('notActive');
    });
  };

  for (var i = 0; i < checkbox.length; i++) {
    _loop4(i);
  }

  var formValidation = function formValidation(firstBox, lastBox, firstInput, lastInput) {
    var notChec = 0;
    var notEmpty = 0;

    for (var i = firstBox; i < lastBox; i++) {
      if (checkboxValid[i].checked == false) {
        errorsBox[i].classList.remove('notActive');
        notChec++;
      }
    }

    for (var _i = firstInput; _i < lastInput; _i++) {
      if (inputForm[_i].value.length == 0) {
        errors[_i].classList.remove('notActive');

        notEmpty++;
      }
    }

    if (notChec > 0 || notEmpty > 0) return false;
  };

  contact_form[0].onsubmit = function () {
    return formValidation(0, 2, 0, 3);
  };

  contact_form[1].onsubmit = function () {
    return formValidation(2, 4, 3, 6);
  }; //ajax send


  $('.submit').click(function (e) {
    e.preventDefault();
    $.ajax({
      type: 'POST',
      url: '../../inc/send_inwestments.php',
      //dataType: 'json',
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
  });
})();