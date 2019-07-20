(() => {

    //additional functions
    const createElement = (name, type, clas, txt, parent) => {
        window[name] = document.createElement(type);
        window[name].classList.add(clas);
        window[name].innerText = txt;
        parent.appendChild(window[name]);
    };

    const rotateCompass = (n) => {
        const direction = ['Północ', 'Północny-Wschód', 'Wschód', 'Południowy-Wschód', 'Południe', 'Południowy-Zachód', 'Zachód', 'Północny-Zachód']

        for (let i = 1; i < direction.length; i++) {
            if (n == direction[i]) return i * 45;
        }
    }

    //API
    const fragment = document.createDocumentFragment();
    const fragmentTwo = document.createDocumentFragment();

    fetch('https://api.adcookie.usermd.net/deweloper/')
        //create elements API
        .then(resp => resp.json())
        .then(resp => {
            for (let i = 0; i < resp.length; i++) {
                createElement("slider__slide", "div", "slider__slide", null, fragment);
                if (i > 0 && i != resp.length - 1) slider__slide.classList.add('slider__slide--right');
                if (i == resp.length - 1) slider__slide.classList.add('slider__slide--left');
                createElement("slider__infoWrapper", "div", "slider__infoWrapper", null, slider__slide);
                createElement("slider__localName", "h2", "slider__localName", resp[i].nazwa, slider__infoWrapper);
                createElement("figureLine", "figure", "figureLine", null, slider__infoWrapper);
                createElement("slider__localYardage", "p", "slider__localYardage", `Metraż: ${resp[i].metraz} m2`, slider__infoWrapper);
                createElement("slider__localPrice", "p", "slider__localPrice", `Cena Netto: ${resp[i].netto.toLocaleString('pl-PL')} zł*`, slider__infoWrapper);
                createElement("slider__localInfoPrice", "p", "slider__localInfoPrice", `* cena nie zawiera 23% VAT`, slider__infoWrapper);
                createElement("slider__localFloor", "p", "slider__localFloor", `Piętro: ${resp[i].pietro} `, slider__infoWrapper);
                createElement("slider__localDestyny", "p", "slider__localDestyny", `Przeznaczenie: ${resp[i].przeznaczenie}`, slider__infoWrapper);
                createElement("slider__loacalStatus", "p", "slider__loacalStatus", `Status: ${resp[i].status}`, slider__infoWrapper);
                createElement("buttonLink", "a", "button--link", null, slider__infoWrapper);
                buttonLink.href = "#investments";
                createElement("askButton", "button", "button--black", `Zapytaj`, buttonLink);
                askButton.classList.add('button--ask');
                askButton.classList.add('button');
                createElement("downloadButtonLink", "a", "button--link", null, slider__infoWrapper);
                downloadButtonLink.href = 'assets/images/plan.pdf';
                downloadButtonLink.target = '_blank';
                createElement("downloadButton", "button", "button--black", `Pobierz plan`, downloadButtonLink);
                downloadButton.classList.add('button--download');
                downloadButton.classList.add('button');
                createElement("slider__blueprint", "img", "slider__blueprint", null, slider__slide);
                createElement("slider__mapWrapper", "div", "slider__mapWrapper", null, slider__slide);
                createElement("slider__compass", "img", "slider__compass", null, slider__mapWrapper);
                slider__compass.style.transform = `rotate(${rotateCompass(resp[i].ekspozycja)}deg)`;
                createElement("slider__map", "img", "slider__map", null, slider__mapWrapper);

                if (resp[i].pietro == 0) slider__localFloor.textContent += '- Parter';
                else slider__localFloor.textContent += '- Piętro';

                slider__blueprint.src = resp[i].obrazki.rzut;
                slider__compass.src = "assets/images/SVG/polnoc.svg";
                slider__map.src = resp[i].obrazki.pietro;

                createElement("slider__dot", "figure", "slider__dot", null, fragmentTwo);
                if (i === 0) slider__dot.classList.add('slider__dot--active');
            }

            const slider = document.querySelector('.slider');
            slider.appendChild(fragment);

            const slider__dotsWrapper = document.querySelector('.slider__dotsWrapper');
            slider__dotsWrapper.appendChild(fragmentTwo);
        })
        //scroll_animation
        .then(resp => {
            $(document).ready(function () {
                $('a[href^="#"]').on('click touch', function (event) {

                    let target = $($(this).attr('href'));

                    if (target.length) {
                        event.preventDefault();
                        $('html, body').animate({
                            scrollTop: (target.offset().top - 60)
                        }, 500);
                    }
                });
            });
        })
        .then(resp => {
            //animate serch menu
            const arrow = document.querySelectorAll('#arrow');
            const slider__dot = document.querySelectorAll('.slider__dot');
            const slider__slide = document.querySelectorAll('.slider__slide');
            let position = 0;
            let prev;
            let next;

            const rightMove = () => {

                position++;
                prev = position - 1;
                next = position + 1;
                if (position == slider__slide.length) {
                    position = 0;
                    prev = slider__slide.length - 1;
                    next = position + 1;
                }
                if (position == slider__slide.length - 1) next = 0;

                slider__slide[prev].classList.add('slider__slide--left');
                slider__slide[next].classList.add('slider__slide--right');
                slider__slide[position].classList.remove('slider__slide--right');
                slider__slide[position].classList.remove('slider__slide--left');
                slider__dot[position].classList.add('slider__dot--active')
                slider__dot[prev].classList.remove('slider__dot--active')
            }

            const leftMove = () => {
                position--;
                prev = position + 1;
                next = position - 1;
                if (position < 0) {
                    position = slider__slide.length - 1;
                    prev = 0;
                    next = position - 1;
                }
                if (position == 0) next = slider__slide.length - 1;

                slider__slide[prev].classList.add('slider__slide--right');
                slider__slide[next].classList.remove('slider__slide--right');
                slider__slide[next].classList.add('slider__slide--left');
                slider__slide[position].classList.remove('slider__slide--left');
                slider__dot[prev].classList.remove('slider__dot--active')
                slider__dot[position].classList.add('slider__dot--active')
            }

            arrow[1].addEventListener("click", rightMove);
            arrow[1].addEventListener("touch", rightMove);
            arrow[0].addEventListener("click", leftMove);
            arrow[0].addEventListener("touch", leftMove);

            document.addEventListener("keydown", event => { //keybord (left and right arrows)
                if (event.keyCode == 37) leftMove();
                if (event.keyCode == 39) rightMove();
            });

            const dotClick = (click) => {
                position = click;
                prev = position - 1;
                next = position + 1;
                if (position == slider__slide.length - 1) next = 0;
                if (position == 0) prev = slider__slide.length - 1;

                for (let i = 0; i < slider__slide.length; i++) {
                    if (i > position) slider__slide[i].classList.add('slider__slide--right');
                    if (i < position) slider__slide[i].classList.add('slider__slide--left');
                }

                slider__slide[prev].classList.add('slider__slide--left');
                slider__slide[prev].classList.remove('slider__slide--right');
                slider__slide[next].classList.add('slider__slide--right');
                slider__slide[position].classList.remove('slider__slide--right');
                slider__slide[position].classList.remove('slider__slide--left');

                for (let i = 0; i < slider__dot.length; i++) {
                    slider__dot[i].classList.remove('slider__dot--active');
                }
                slider__dot[position].classList.add('slider__dot--active')

            }

            for (let i = 0; i < slider__dot.length; i++) {
                slider__dot[i].addEventListener('click', (e) => {
                    dotClick(i);
                })
                slider__dot[i].addEventListener('touch', (e) => {
                    dotClick(i);
                })
            }
        })
        .catch(error => {
            console.log('Błąd API: ', error)
            const errortext = 'Przepraszamy. Brak połączenia z serwerem.'
            createElement("slider__errorApi", "h2", "slider__errorApi", errortext, slider);
        });

    //hide hamburger
    const nav__hamburger = document.querySelector('.nav__hamburger');
    const nav__hamburgerLine = document.querySelector('.nav__hamburgerLine');
    const nav__ul = document.querySelector('.nav__ul');

    nav__hamburger.addEventListener("click", (e) => {
        nav__hamburgerLine.classList.toggle('nav__hamburgerLine--active');
        nav__hamburger.classList.toggle('nav__hamburger--active');
        nav__ul.classList.toggle('nav__ul--active');
    }, false);
    nav__hamburger.addEventListener("touch", (e) => {
        nav__hamburgerLine.classList.toggle('nav__hamburgerLine--active');
        nav__hamburger.classList.toggle('nav__hamburger--active');
        nav__ul.classList.toggle('nav__ul--active');
    }, false);

    //hide menu when click on link
    const nav__a = document.querySelectorAll('.nav__a');

    for (let i = 0; i < nav__a.length; i++) {
        nav__a[i].addEventListener("click", (e) => {
            nav__hamburgerLine.classList.remove('nav__hamburgerLine--active');
            nav__hamburger.classList.remove('nav__hamburger--active');
            nav__ul.classList.add('nav__ul--active');
        }, false);
        nav__a[i].addEventListener("touch", (e) => {
            nav__hamburgerLine.classList.remove('nav__hamburgerLine--active');
            nav__hamburger.classList.remove('nav__hamburger--active');
            nav__ul.classList.add('nav__ul--active');
        }, false);
    }

    //animaton statistics
    const FragmentThree = document.createDocumentFragment();
    const statistics__digitWrapper = document.querySelectorAll('.statistics__digitWrapper');
    let stats = [6, 3, 3, 4, 9, 5, 1, 5];
    for (let o = 0; o < stats.length; o++) {
        for (let i = 0; i <= stats[o]; i++) {
            createElement("statistics__digit", "p", "statistics__digit", i, FragmentThree);
        }
        statistics__digitWrapper[o].appendChild(FragmentThree);
    }

    //on scroll animations
    let prevScrollpos = window.pageYOffset;
    const nav = document.querySelector('.nav');

    window.onscroll = () => {
        //nav animation
        let currentScrollPos = window.pageYOffset;
        if (prevScrollpos > currentScrollPos) nav.classList.remove('nav--hide');
        else nav.classList.add('nav--hide');


        if (currentScrollPos > statistics__digitWrapper[0].offsetTop - window.innerHeight) {
            //animaton statistics
            statistics__digitWrapper[0].classList.add('statistics__digitWrapper--animate');
            statistics__digitWrapper[1].classList.add('statistics__digitWrapper--animate');
            statistics__digitWrapper[2].classList.add('statistics__digitWrapper--animate');

            statistics__digitWrapper[2].addEventListener('animationend', (e) => {
                statistics__digitWrapper[3].classList.add('statistics__digitWrapper--animate');
                statistics__digitWrapper[4].classList.add('statistics__digitWrapper--animate');
                statistics__digitWrapper[5].classList.add('statistics__digitWrapper--animate');
            });

            statistics__digitWrapper[5].addEventListener('animationend', (e) => {
                statistics__digitWrapper[6].classList.add('statistics__digitWrapper--animate');
                statistics__digitWrapper[7].classList.add('statistics__digitWrapper--animate');
            });

        } else {
            for (let i = 0; i < statistics__digitWrapper.length; i++) {
                statistics__digitWrapper[i].classList.remove('statistics__digitWrapper--animate');
            }
        }
        prevScrollpos = currentScrollPos;
    }
})();