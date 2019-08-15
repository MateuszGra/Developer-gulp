var mySwiper = new Swiper('.swiper-container', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    initialSlide: 1,
    speed: 800,

    // Navigation arrows
    navigation: {
        nextEl: '.swiper__next',
        prevEl: '.swiper__prev',
    },
})