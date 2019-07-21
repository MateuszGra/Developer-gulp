(() => {
    //checkbox
    const form__checkboxInfo = document.querySelectorAll('.form__checkboxInfo');
    const form__checkbox = document.querySelectorAll('.form__checkbox');
    for (let i = 0; i < form__checkboxInfo.length; i++) {
        form__checkboxInfo[i].addEventListener('click', (e) => {
            if (form__checkbox[i].checked == true) form__checkboxInfo[i].classList.remove('form__checkboxInfo--chec');
            if (form__checkbox[i].checked == false) form__checkboxInfo[i].classList.add('form__checkboxInfo--chec');
        });
        form__checkboxInfo[i].addEventListener('touch', (e) => {
            if (form__checkbox[i].checked == true) form__checkboxInfo[i].classList.remove('form__checkboxInfo--chec');
            if (form__checkbox[i].checked == false) form__checkboxInfo[i].classList.add('form__checkboxInfo--chec');
        });
    }
    //form animations
    const form__input = document.querySelectorAll('.form__input');
    const form__label = document.querySelectorAll('.form__label');

    for (let i = 0; i < form__input.length; i++) {
        form__input[i].addEventListener('focus', (e) => {
            form__label[i].classList.add('form__label--active');
        });
        form__input[i].addEventListener('focusout', (e) => {
            if (form__input[i].value == '') form__label[i].classList.remove('form__label--active');
        });
    }
    //form validation
    const form = document.querySelectorAll('#form');
    const form__errorCheckBox = document.querySelectorAll('.form__error--checkbox');
    const errors = document.querySelectorAll('#error');
    const form__status = document.querySelectorAll('.form__status')

    for (let i = 0; i < form__input.length; i++) {
        form__input[i].addEventListener('focus', (e) => {
            errors[i].classList.add('form__error--notActive')
        });
    }

    for (let i = 0; i < form__checkboxInfo.length; i++) {
        form__checkboxInfo[i].addEventListener('click', (e) => {
            form__errorCheckBox[i].classList.add('form__error--notActive');
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
            if (form__checkbox[i].checked == false) {
                form__errorCheckBox[i].classList.remove('form__error--notActive');
                notChec++;
            }
        }

        for (let i = firstInput; i < lastInput; i++) {
            if (form__input[i].value.length == 0) {
                errors[i].classList.remove('form__error--notActive');
                notEmpty++;
            }
        }

        if (notChec > 0 || notEmpty > 0) return false;
    }

    form[0].addEventListener('submit', (e) => {
        e.preventDefault();
        if (formValidation(0, 2, 0, 3) == false) return false;
        else {
            sendFormInvestments();
            for (let i = 0; i < 2; i++) {
                form__checkboxInfo[i].classList.remove('form__checkboxInfo--chec');
            }
            for (let i = 0; i < 3; i++) {
                form__input[i].value = '';
                form__label[i].classList.remove('form__label--active');
            }
            form__status[0].classList.add('form__status--active');
        }
    });

    form[1].addEventListener('submit', (e) => {
        e.preventDefault();
        if (formValidation(2, 4, 3, 6) == false) return false;
        else {
            sendFormContact();
            for (let i = 2; i < form__checkboxInfo.length; i++) {
                form__checkboxInfo[i].classList.remove('form__checkboxInfo--chec');
            }
            for (let i = 3; i < form__input.length; i++) {
                form__input[i].value = '';
                form__label[i].classList.remove('form__label--active');
            }
            form__status[1].classList.add('form__status--active');
        }
    });

    //remove form status
    for (let i = 0; i < form__status.length; i++) {
        form[i].addEventListener('click', () => {
            form__status[i].classList.remove('form__status--active');
        });
        form[i].addEventListener('touch', () => {
            form__status[i].classList.remove('form__status--active');
        });
    }

})();