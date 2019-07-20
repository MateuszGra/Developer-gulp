(() => {
    //checkbox
    const checkbox = document.querySelectorAll('#checbox');

    for (let i = 0; i < checkbox.length; i++) {
        checkbox[i].addEventListener('click', (e) => {
            checkbox[i].classList.toggle('form__checkboxInfo--chec');
        });
        checkbox[i].addEventListener('touch', (e) => {
            checkbox[i].classList.toggle('form__checkboxInfo--chec');
        });
    }
    //form animations
    const inputForm = document.querySelectorAll('.input');
    const labelForm = document.querySelectorAll('#label');

    for (let i = 0; i < inputForm.length; i++) {
        inputForm[i].addEventListener('focus', (e) => {
            labelForm[i].classList.add('form__label--active');
        });
        inputForm[i].addEventListener('focusout', (e) => {
            if (inputForm[i].value == '') labelForm[i].classList.remove('form__label--active');
        });
    }
    //form validation
    const form = document.querySelectorAll('#form');
    const checkboxValid = document.querySelectorAll('.form__checkbox');
    const errorsBox = document.querySelectorAll('#errorChec');
    const errors = document.querySelectorAll('#error');


    for (let i = 0; i < inputForm.length; i++) {
        inputForm[i].addEventListener('focus', (e) => {
            errors[i].classList.add('form__error--notActive')
        });
    }

    for (let i = 0; i < checkbox.length; i++) {
        checkbox[i].addEventListener('click', (e) => {
            errorsBox[i].classList.add('form__error--notActive');
        });
    }

    //send email

    const sendFormInvestments = (e) => {
        $.ajax({
            type: 'POST',
            url: '../../inc/send_inwestments.php',
            data: {
                name: $('#name').val(),
                phone: $('#phone').val(),
                message: $('#message').val(),
            },
            success: function (data) {
                console.log(data);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log(XMLHttpRequest + textStatus + errorThrown)
            }
        });
    }

    const sendFormContact = (e) => {
        $.ajax({
            type: 'POST',
            url: '../../inc/send_contact.php',
            data: {
                name: $('#nameContact').val(),
                phone: $('#phoneContact').val(),
                message: $('#messageContact').val(),
            },
            success: function (data) {
                console.log(data);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log(XMLHttpRequest + textStatus + errorThrown)
            }
        });
    }

    const formValidation = (firstBox, lastBox, firstInput, lastInput) => {
        let notChec = 0;
        let notEmpty = 0;

        for (let i = firstBox; i < lastBox; i++) {
            if (checkboxValid[i].checked == false) {
                errorsBox[i].classList.remove('form__error--notActive');
                notChec++;
            }
        }

        for (let i = firstInput; i < lastInput; i++) {
            if (inputForm[i].value.length == 0) {
                errors[i].classList.remove('form__error--notActive');
                notEmpty++;
            }
        }

        if (notChec > 0 || notEmpty > 0) return false;
    }

    form[0].addEventListener('submit', (e) => {
        e.preventDefault();
        if (formValidation(0, 2, 0, 3) == false) return false;
        else sendFormInvestments();
    });

    form[1].addEventListener('submit', (e) => {
        e.preventDefault();
        if (formValidation(2, 4, 3, 6) == false) return false;
        else sendFormContact();
    });

})();