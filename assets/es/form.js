(() => {
    //checkbox
    const form__checkboxInfo = document.querySelectorAll('.form__checkbox-info');
    const form__checkbox = document.querySelectorAll('.form__checkbox');
    for (let i = 0; i < form__checkboxInfo.length; i++) {
        form__checkboxInfo[i].addEventListener('click', (e) => {
            if (form__checkbox[i].checked == true) form__checkboxInfo[i].classList.remove('form__checkbox-info--chec');
            if (form__checkbox[i].checked == false) form__checkboxInfo[i].classList.add('form__checkbox-info--chec');
        });
        form__checkboxInfo[i].addEventListener('touch', (e) => {
            if (form__checkbox[i].checked == true) form__checkboxInfo[i].classList.remove('form__checkbox-info--chec');
            if (form__checkbox[i].checked == false) form__checkboxInfo[i].classList.add('form__checkbox-info--chec');
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
    const loader = document.querySelectorAll('.loader');

    for (let i = 0; i < form__input.length; i++) {
        form__input[i].addEventListener('focus', (e) => {
            errors[i].classList.add('form__error--not-active')
        });
    }

    for (let i = 0; i < form__checkboxInfo.length; i++) {
        form__checkboxInfo[i].addEventListener('click', (e) => {
            form__errorCheckBox[i].classList.add('form__error--not-active');
        });
    }

    //send email
    const sendFormToPHP = (adress, n) => {
        const data = new FormData();
        data.append('name', document.querySelectorAll('#name')[n].value);
        data.append('phone', document.querySelectorAll('#phone')[n].value);
        data.append('message', document.querySelectorAll('#message')[n].value);

        fetch(adress, {
                method: 'POST',
                body: data,
            })
            .then(resp => {
                loader[n].classList.add('loader--hidden')
                form__status[n].textContent = "Wiadomość została wysłana";
                form__status[n].classList.add('form__status--active');
            })
            .catch(error => {
                console.log(error)
                loader[n].classList.add('loader--hidden')
                form__status[n].textContent = "Błąd systemu";
                form__status[n].classList.add('form__status--active');
            });
    }


    const formValidation = (firstBox, lastBox, firstInput, lastInput) => {
        let notChec = 0;
        let notEmpty = 0;

        for (let i = firstBox; i < lastBox; i++) {
            if (form__checkbox[i].checked == false) {
                form__errorCheckBox[i].classList.remove('form__error--not-active');
                notChec++;
            }
        }

        for (let i = firstInput; i < lastInput; i++) {
            if (form__input[i].value.length == 0) {
                errors[i].classList.remove('form__error--not-active');
                notEmpty++;
            }
        }

        if (notChec > 0 || notEmpty > 0) return false;
    }

    form[0].addEventListener('submit', (e) => {
        e.preventDefault();
        if (formValidation(0, 2, 0, 3) == false) return false;
        else {
            sendFormToPHP('../../inc/send_inwestments.php', 0);
            for (let i = 0; i < 2; i++) {
                form__checkboxInfo[i].classList.remove('form__checkbox-info--chec');
                form__checkbox[i].checked = false
            }
            for (let i = 0; i < 3; i++) {
                form__input[i].value = '';
                form__label[i].classList.remove('form__label--active');
            }
            loader[0].classList.remove('loader--hidden')
        }
    });

    form[1].addEventListener('submit', (e) => {
        e.preventDefault();
        if (formValidation(2, 4, 3, 6) == false) return false;
        else {
            sendFormToPHP('../../inc/send_contact.php', 1);
            for (let i = 2; i < form__checkboxInfo.length; i++) {
                form__checkboxInfo[i].classList.remove('form__checkbox-info--chec');
                form__checkbox[i].checked = false
            }
            for (let i = 3; i < form__input.length; i++) {
                form__input[i].value = '';
                form__label[i].classList.remove('form__label--active');
            }
            loader[1].classList.remove('loader--hidden')
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