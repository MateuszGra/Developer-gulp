(() => {
    //API
    const slider = document.querySelector('.slider');

    fetch('https://api.adcookie.usermd.net/deweloper/')
        //create elements API 
        .then(resp => resp.json())
        .then(resp => {
            const slider__dotsWrapper = document.querySelector('.slider__dots-wrapper');

            const rotateCompass = (n) => {
                const direction = ['Północ', 'Północny-Wschód', 'Wschód', 'Południowy-Wschód', 'Południe', 'Południowy-Zachód', 'Zachód', 'Północny-Zachód']

                for (let i = 1; i < direction.length; i++) {
                    if (n == direction[i]) return i * 45;
                }
            }

            for (let i = 0; i < resp.length; i++) {
                let floor;
                if (resp[i].pietro == 0) floor = '- Parter';
                else floor = '- Piętro';

                createElement("slider__slide" + i, "div", ["slider__slide"], null, slider);
                if (i > 0 && i != resp.length - 1) createElements['slider__slide' + i].classList.add('slider__slide--right');
                if (i == resp.length - 1) createElements['slider__slide' + i].classList.add('slider__slide--left');
                createElements['slider__slide' + i].innerHTML = `
                <div class="slider__info-wrapper">
                    <h2 class="slider__local-name">${resp[i].nazwa}</h2>
                    <figure class="figure-line"></figure>
                    <p class="slider__local-yardage">Metraż: ${resp[i].metraz} m2</p>
                    <p class="slider__local-price">Cena Netto: ${resp[i].netto.toLocaleString('pl-PL')} zł*</p>
                    <p class="slider__local-info-price">* cena nie zawiera 23% VAT</p>
                    <p class="slider__local-floor">Piętro: ${resp[i].pietro + floor} </p>
                    <p class="slider__local-destyny">Przeznaczenie: ${resp[i].przeznaczenie}</p>
                    <p class="slider__loacal-status">Status: ${resp[i].status}</p>
                    <button class="button--black button--ask button"><a id="button-scroll" class="button__link" href="#investments"></a>Zapytaj</button><button class="button--black button--download button"><a class="button__link" href="assets/images/plan.pdf" target="_blank"></a>Pobierz plan</button>
                </div>
                <img class="slider__blueprint" src="${resp[i].obrazki.rzut}">
                <div class="slider__map-wrapper">
                    <img class="slider__compass" src="assets/images/SVG/polnoc.svg" style="transform: rotate(${rotateCompass(resp[i].ekspozycja)}deg)">
                    <img class="slider__map" src="${resp[i].obrazki.pietro}">
                </div>
                `
                createElement("slider__dot" + i, "figure", ["slider__dot"], null, slider__dotsWrapper);
                if (i === 0) createElements['slider__dot' + i].classList.add('slider__dot--active');
            }
        })
        //scroll_animation 
        .then(resp => {
            const link = document.querySelectorAll('.nav__menu-link');
            const button = document.querySelectorAll('#button-scroll');

            for (let i = 0; i < button.length; i++) {
                button[i].addEventListener("click", smoothScroll);
                button[i].addEventListener("touch", smoothScroll);
            }
            for (let i = 0; i < link.length; i++) {
                link[i].addEventListener("click", smoothScroll);
                link[i].addEventListener("touch", smoothScroll);
            }

            function smoothScroll(event) {
                event.preventDefault();
                const targetId = event.currentTarget.getAttribute("href") === "#" ? "header" : event.currentTarget.getAttribute("href");
                const targetPosition = (document.querySelector(targetId).offsetTop - 60);
                const startPosition = window.pageYOffset;
                const distance = targetPosition - startPosition;
                const duration = 700;
                let start = null;

                window.requestAnimationFrame(step);
                if (history.replaceState) history.replaceState(null, null, targetId);
                else location.hash = targetId;


                function step(timestamp) {
                    if (!start) start = timestamp;
                    const progress = timestamp - start;
                    window.scrollTo(0, easeInOutCubic(progress, startPosition, distance, duration));
                    if (progress < duration) window.requestAnimationFrame(step);
                }
            }

            const easeInOutCubic = (t, b, c, d) => {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t * t + b;
                t -= 2;
                return c / 2 * (t * t * t + 2) + b;
            };
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
            createElement("slider__errorApi", "h2", ["slider__error-api"], errortext, slider);
        });

    //hide hamburger
    const nav__hamburger = document.querySelector('.nav__hamburger');
    const nav__hamburgerLine = document.querySelector('.nav__hamburger-line');
    const nav__menu = document.querySelector('.nav__menu');

    nav__hamburger.addEventListener("click", (e) => {
        nav__hamburgerLine.classList.toggle('nav__hamburger-line--active');
        nav__hamburger.classList.toggle('nav__hamburger--active');
        nav__menu.classList.toggle('nav__menu--active');
    }, false);
    nav__hamburger.addEventListener("touch", (e) => {
        nav__hamburgerLine.classList.toggle('nav__hamburger-line--active');
        nav__hamburger.classList.toggle('nav__hamburger--active');
        nav__menu.classList.toggle('nav__menu--active');
    }, false);

    //hide menu when click on link
    const nav__menuLink = document.querySelectorAll('.nav__menu-link');

    for (let i = 0; i < nav__menuLink.length; i++) {
        nav__menuLink[i].addEventListener("click", (e) => {
            nav__hamburgerLine.classList.remove('nav__hamburger-line--active');
            nav__hamburger.classList.remove('nav__hamburger--active');
            nav__menu.classList.add('nav__menu--active');
        }, false);
        nav__menuLink[i].addEventListener("touch", (e) => {
            nav__hamburgerLine.classList.remove('nav__hamburger-line--active');
            nav__hamburger.classList.remove('nav__hamburger--active');
            nav__menu.classList.add('nav__menu--active');
        }, false);
    }

    //animaton statistics
    const fragment = document.createDocumentFragment();
    const statistics__digitWrapper = document.querySelectorAll('.statistics__digit-wrapper');
    let stats = [6, 3, 3, 4, 9, 5, 1, 5];
    for (let o = 0; o < stats.length; o++) {
        for (let i = 0; i <= stats[o]; i++) {
            createElement("statistics__digit", "p", ["statistics__digit"], i, fragment);
        }
        statistics__digitWrapper[o].appendChild(fragment);
    }

    //on scroll animations
    let prevScrollpos = window.pageYOffset + 60;
    const nav = document.querySelector('.nav');

    window.onscroll = () => {
        //nav animation
        let currentScrollPos = window.pageYOffset;
        if (prevScrollpos > currentScrollPos) nav.classList.remove('nav--hide');
        else nav.classList.add('nav--hide');

        if (currentScrollPos > statistics__digitWrapper[0].offsetTop - window.innerHeight) {
            //animaton statistics
            statistics__digitWrapper[0].classList.add('statistics__digit-wrapper--animate');
            statistics__digitWrapper[1].classList.add('statistics__digit-wrapper--animate');
            statistics__digitWrapper[2].classList.add('statistics__digit-wrapper--animate');

            statistics__digitWrapper[2].addEventListener('animationend', (e) => {
                statistics__digitWrapper[3].classList.add('statistics__digit-wrapper--animate');
                statistics__digitWrapper[4].classList.add('statistics__digit-wrapper--animate');
                statistics__digitWrapper[5].classList.add('statistics__digit-wrapper--animate');
            });

            statistics__digitWrapper[5].addEventListener('animationend', (e) => {
                statistics__digitWrapper[6].classList.add('statistics__digit-wrapper--animate');
                statistics__digitWrapper[7].classList.add('statistics__digit-wrapper--animate');
            });

        } else {
            for (let i = 0; i < statistics__digitWrapper.length; i++) {
                statistics__digitWrapper[i].classList.remove('statistics__digit-wrapper--animate');
            }
        }
        prevScrollpos = currentScrollPos;
    }
})();