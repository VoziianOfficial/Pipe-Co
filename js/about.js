"use strict";

/*
  Pipe & Co — about page logic
*/

document.addEventListener("DOMContentLoaded", () => {
    initAboutImageParallax();
});

function initAboutImageParallax() {
    const visual = document.querySelector(".about-hero-visual");
    const image = visual ? visual.querySelector("img") : null;

    if (!visual || !image || !window.gsap) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) return;

    visual.addEventListener("pointermove", (event) => {
        const rect = visual.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;

        window.gsap.to(image, {
            x: x * 16,
            y: y * 16,
            scale: 1.04,
            duration: 0.45,
            ease: "power2.out",
        });
    });

    visual.addEventListener("pointerleave", () => {
        window.gsap.to(image, {
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "power2.out",
        });
    });
}