(() => {
    //checkbox
    const checkbox = document.querySelectorAll('#checbox');

    for (let i = 0; i < checkbox.length; i++) {
        checkbox[i].addEventListener('click', (e) => {
            checkbox[i].classList.toggle('chec');
        });
        checkbox[i].addEventListener('touch', (e) => {
            checkbox[i].classList.toggle('chec');
        });
    }
    //form animations
    const inputForm = document.querySelectorAll('.input');
    const labelForm = document.querySelectorAll('#label');

    for (let i = 0; i < inputForm.length; i++) {
        inputForm[i].addEventListener('focus', (e) => {
            labelForm[i].classList.add('active');
        });
        inputForm[i].addEventListener('focusout', (e) => {
            if (inputForm[i].value == '') labelForm[i].classList.remove('active');
        });
    }
    //form validation
    const contact_form = document.querySelectorAll('#contact_form');
    const checkboxValid = document.querySelectorAll('.form__checkbox');
    const errorsBox = document.querySelectorAll('#errorChec');
    const errors = document.querySelectorAll('#error');


    for (let i = 0; i < inputForm.length; i++) {
        inputForm[i].addEventListener('focus', (e) => {
            errors[i].classList.add('notActive')
        });
    }

    for (let i = 0; i < checkbox.length; i++) {
        checkbox[i].addEventListener('click', (e) => {
            errorsBox[i].classList.add('notActive');
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
                errorsBox[i].classList.remove('notActive');
                notChec++;
            }
        }

        for (let i = firstInput; i < lastInput; i++) {
            if (inputForm[i].value.length == 0) {
                errors[i].classList.remove('notActive');
                notEmpty++;
            }
        }

        if (notChec > 0 || notEmpty > 0) return false;
    }
    contact_form[0].onsubmit = (e) => {
        e.preventDefault();
        if (formValidation(0, 2, 0, 3) == false) return false;
        else sendFormInvestments();
    };

    contact_form[1].onsubmit = (e) => {
        e.preventDefault();
        if (formValidation(2, 4, 3, 6) == false) return false;
        else sendFormContact();
    };

})();