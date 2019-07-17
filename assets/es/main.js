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
                createElement("devWrapper", "div", "devWrapper", null, fragment);
                if (i > 0 && i != resp.length - 1) devWrapper.classList.add('notActiveR');
                if (i == resp.length - 1) devWrapper.classList.add('notActiveL');
                createElement("devInfo", "div", "devInfo", null, devWrapper);
                createElement("devName", "h2", "devName", resp[i].nazwa, devInfo);
                createElement("columnLine", "figure", "columnLine", null, devInfo);
                createElement("devYardage", "p", "devYardage", `Metraż: ${resp[i].metraz} m2`, devInfo);
                createElement("devPrice", "p", "devPrice", `Cena Netto: ${resp[i].netto.toLocaleString('pl-PL')} zł*`, devInfo);
                createElement("devInfoPrice", "p", "devInfoPrice", `* cena nie zawiera 23% VAT`, devInfo);
                createElement("devfloor", "p", "devfloor", `Piętro: ${resp[i].pietro} `, devInfo);
                createElement("devDestiny", "p", "devDestiny", `Przeznaczenie: ${resp[i].przeznaczenie}`, devInfo);
                createElement("devStatus", "p", "devStatus", `Status: ${resp[i].status}`, devInfo);
                createElement("askButtonLink", "a", "askButtonLink", null, devInfo);
                askButtonLink.href = "#investments";
                createElement("askButton", "button", "buttonSecend", `Zapytaj`, askButtonLink);
                askButton.classList.add('askButton');
                createElement("downloadButtonLink", "a", "downloadButtonLink", null, devInfo);
                downloadButtonLink.href = 'assets/images/plan.pdf';
                downloadButtonLink.target = '_blank';
                createElement("downloadButton", "button", "buttonSecend", `Pobierz plan`, downloadButtonLink);
                downloadButton.classList.add('downButton');
                createElement("drop", "img", "drop", null, devWrapper);
                createElement("imgWrapper", "div", "imgWrapper", null, devWrapper);
                createElement("compass", "img", "compass", null, imgWrapper);
                compass.style.transform = `rotate(${rotateCompass(resp[i].ekspozycja)}deg)`;
                createElement("floor", "img", "floor", null, imgWrapper);

                if (resp[i].pietro == 0) devfloor.textContent += '- Parter';
                else devfloor.textContent += '- Piętro';

                drop.src = resp[i].obrazki.rzut;
                compass.src = "assets/images/SVG/polnoc.svg";
                floor.src = resp[i].obrazki.pietro;

                createElement("dot", "figure", "dot", null, fragmentTwo);
                if (i === 0) dot.classList.add('active');
            }

            const searchWrapper = document.querySelector('.searchWrapper');
            searchWrapper.appendChild(fragment);

            const dotsWrapper = document.querySelector('.dotsWrapper');
            dotsWrapper.appendChild(fragmentTwo);
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
            const dot = document.querySelectorAll('.dot');
            const devWrapper = document.querySelectorAll('.devWrapper');
            let position = 0;
            let prev;
            let next;

            const rightMove = () => {
                const devWrapper = document.querySelectorAll('.devWrapper');
                const dot = document.querySelectorAll('.dot');

                position++;
                prev = position - 1;
                next = position + 1;
                if (position == devWrapper.length) {
                    position = 0;
                    prev = devWrapper.length - 1;
                    next = position + 1;
                }
                if (position == devWrapper.length - 1) next = 0;

                devWrapper[prev].classList.add('notActiveL');
                devWrapper[next].classList.add('notActiveR');
                devWrapper[position].classList.remove('notActiveR');
                devWrapper[position].classList.remove('notActiveL');
                dot[position].classList.add('active')
                dot[prev].classList.remove('active')
            }

            const leftMove = () => {
                position--;
                prev = position + 1;
                next = position - 1;
                if (position < 0) {
                    position = devWrapper.length - 1;
                    prev = 0;
                    next = position - 1;
                }
                if (position == 0) next = devWrapper.length - 1;

                devWrapper[prev].classList.add('notActiveR');
                devWrapper[next].classList.remove('notActiveR');
                devWrapper[next].classList.add('notActiveL');
                devWrapper[position].classList.remove('notActiveL');
                dot[prev].classList.remove('active')
                dot[position].classList.add('active')
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
                if (position == devWrapper.length - 1) next = 0;
                if (position == 0) prev = devWrapper.length - 1;

                for (let i = 0; i < devWrapper.length; i++) {
                    if (i > position) devWrapper[i].classList.add('notActiveR');
                    if (i < position) devWrapper[i].classList.add('notActiveL');
                }

                devWrapper[prev].classList.add('notActiveL');
                devWrapper[prev].classList.remove('notActiveR');
                devWrapper[next].classList.add('notActiveR');
                devWrapper[position].classList.remove('notActiveR');
                devWrapper[position].classList.remove('notActiveL');

                for (let i = 0; i < dot.length; i++) {
                    dot[i].classList.remove('active');
                }
                dot[position].classList.add('active')

            }

            for (let i = 0; i < dot.length; i++) {
                dot[i].addEventListener('click', (e) => {
                    dotClick(i);
                })
                dot[i].addEventListener('touch', (e) => {
                    dotClick(i);
                })
            }
        })
        .catch(error => {
            console.log('Błąd API: ', error)
            const errortext = 'Przepraszamy. Brak połączenia z serwerem.'
            createElement(name = "errorApi", type = "h2", clas = "errorApi", txt = errortext, parent = searchWrapper);
        });

    //hide hamburger
    const hamburger = document.querySelector('.hamburger');
    const hmaburgerLines = document.querySelector('.hamburgerLines');
    const navList = document.querySelector('.navList');

    hamburger.addEventListener("click", (e) => {
        hmaburgerLines.classList.toggle('active');
        hamburger.classList.toggle('active');
        navList.classList.toggle('active');
    }, false);
    hamburger.addEventListener("touch", (e) => {
        hmaburgerLines.classList.toggle('active');
        hamburger.classList.toggle('active');
        navList.classList.toggle('active');
    }, false);

    //nav links animation and hide hamburger when click on link
    const navLink = document.querySelectorAll('.navLink');

    for (let i = 0; i < navLink.length; i++) {
        navLink[i].addEventListener('mouseover', (e) => {
            navLink[i].classList.add('active');
        });
        navLink[i].addEventListener('mouseout', (e) => {
            navLink[i].classList.remove('active');
        });
        navLink[i].addEventListener("click", (e) => {
            hmaburgerLines.classList.remove('active');
            hamburger.classList.remove('active');
            navList.classList.add('active');
        }, false);
        navLink[i].addEventListener("touch", (e) => {
            hmaburgerLines.classList.remove('active');
            hamburger.classList.remove('active');
            navList.classList.add('active');
        }, false);
    }

    //animaton statistics
    const FragmentThree = document.createDocumentFragment();
    const figureNumberWrapper = document.querySelectorAll('.figureNumberWrapper');
    let stats = [6, 3, 3, 4, 9, 5, 1, 5];
    for (let o = 0; o < stats.length; o++) {
        for (let i = 0; i <= stats[o]; i++) {
            createElement("figureNumber", "p", "figureNumber", i, FragmentThree);
        }
        figureNumberWrapper[o].appendChild(FragmentThree);
    }

    //on scroll animations
    let prevScrollpos = window.pageYOffset;
    const nav = document.querySelector('nav');

    window.onscroll = () => {
        //nav animation
        let currentScrollPos = window.pageYOffset;
        if (prevScrollpos > currentScrollPos) nav.classList.remove('hide');
        else nav.classList.add('hide');


        if (currentScrollPos > figureNumberWrapper[0].offsetTop - window.innerHeight) {
            //animaton statistics
            figureNumberWrapper[0].classList.add('startAnimation');
            figureNumberWrapper[1].classList.add('startAnimation');
            figureNumberWrapper[2].classList.add('startAnimation');

            figureNumberWrapper[2].addEventListener('animationend', (e) => {
                figureNumberWrapper[3].classList.add('startAnimation');
                figureNumberWrapper[4].classList.add('startAnimation');
                figureNumberWrapper[5].classList.add('startAnimation');
            });

            figureNumberWrapper[5].addEventListener('animationend', (e) => {
                figureNumberWrapper[6].classList.add('startAnimation');
                figureNumberWrapper[7].classList.add('startAnimation');
            });

        } else {
            for (let i = 0; i < figureNumberWrapper.length; i++) {
                figureNumberWrapper[i].classList.remove('startAnimation');
            }
        }
        prevScrollpos = currentScrollPos;
    }


})();