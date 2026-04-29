"use strict";

document.addEventListener("DOMContentLoaded", () => {
    initReviewsSlider();
    initHeroPointerGlow();
    initMapMicroInteraction();
});

function initReviewsSlider() {
    const sliderElement = document.querySelector(".reviews-slider");

    if (!sliderElement || typeof Swiper === "undefined") return;

    const currentEl = document.querySelector(".reviews-progress-current");
    const totalEl = document.querySelector(".reviews-progress-total");

    const formatNumber = (number) => String(number).padStart(2, "0");

    const slider = new Swiper(sliderElement, {
        slidesPerView: 1,
        spaceBetween: 14,
        speed: 700,
        loop: true,
        loopAdditionalSlides: 3,
        grabCursor: true,
        watchOverflow: true,
        centeredSlides: false,
        navigation: {
            nextEl: ".reviews-nav-next",
            prevEl: ".reviews-nav-prev",
        },
        pagination: {
            el: ".reviews-slider .swiper-pagination",
            type: "progressbar",
        },
        breakpoints: {
            640: {
                slidesPerView: 1.12,
                spaceBetween: 16,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 18,
            },
            1180: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
        },
        on: {
            init(swiper) {
                updateReviewsCounter(swiper, currentEl, totalEl, formatNumber);
            },
            realIndexChange(swiper) {
                updateReviewsCounter(swiper, currentEl, totalEl, formatNumber);
            },
        },
    });

    updateReviewsCounter(slider, currentEl, totalEl, formatNumber);
}

function updateReviewsCounter(swiper, currentEl, totalEl, formatNumber) {
    if (!currentEl || !totalEl) return;

    const total = swiper.slides.filter(
        (slide) => !slide.classList.contains("swiper-slide-duplicate")
    ).length;

    const current = swiper.realIndex + 1;

    currentEl.textContent = formatNumber(current);
    totalEl.textContent = formatNumber(total);
}

function updateReviewsCounter(swiper, currentEl, totalEl, formatNumber) {
    if (!currentEl || !totalEl) return;

    const total = swiper.slides.length;
    const current = swiper.realIndex + 1;

    currentEl.textContent = formatNumber(current);
    totalEl.textContent = formatNumber(total);
}

function initHeroPointerGlow() {
    const hero = document.querySelector(".home-hero");

    if (!hero) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) return;

    hero.addEventListener("pointermove", (event) => {
        const rect = hero.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;

        hero.style.setProperty("--hero-x", `${x}%`);
        hero.style.setProperty("--hero-y", `${y}%`);
    });
}

function initMapMicroInteraction() {
    const map = document.querySelector(".area-map");
    const pin = document.querySelector(".map-pin--main");

    if (!map || !pin) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) return;

    map.addEventListener("pointermove", (event) => {
        const rect = map.getBoundingClientRect();
        const moveX = ((event.clientX - rect.left) / rect.width - 0.5) * 12;
        const moveY = ((event.clientY - rect.top) / rect.height - 0.5) * 12;

        pin.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px))`;
    });

    map.addEventListener("pointerleave", () => {
        pin.style.transform = "translate(-50%, -50%)";
    });
}