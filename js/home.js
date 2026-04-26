"use strict";

/*
  Pipe & Co — home page logic
*/

document.addEventListener("DOMContentLoaded", () => {
    initReviewsSlider();
    initHeroPointerGlow();
    initMapMicroInteraction();
});

/* ================================
   REVIEWS SLIDER
================================ */

function initReviewsSlider() {
    const sliderElement = document.querySelector(".reviews-slider");

    if (!sliderElement || typeof Swiper === "undefined") return;

    new Swiper(".reviews-slider", {
        slidesPerView: 1,
        spaceBetween: 16,
        speed: 750,
        loop: true,
        grabCursor: true,
        autoplay: {
            delay: 4200,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".reviews-slider .swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            640: {
                slidesPerView: 1.08,
                spaceBetween: 16,
            },
            768: {
                slidesPerView: 1.65,
                spaceBetween: 18,
            },
            1100: {
                slidesPerView: 2.35,
                spaceBetween: 20,
            },
            1320: {
                slidesPerView: 3,
                spaceBetween: 22,
            },
        },
    });
}

/* ================================
   HERO POINTER GLOW
================================ */

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

/* ================================
   MAP MICRO INTERACTION
================================ */

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