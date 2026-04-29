"use strict";

document.addEventListener("DOMContentLoaded", () => {
    initContactVisualMotion();
    initContactMapMotion();
});

function initContactVisualMotion() {
    const visual = document.querySelector(".contact-hero-visual");
    const image = visual ? visual.querySelector("img") : null;

    if (!visual || !image || !window.gsap) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) return;

    visual.addEventListener("pointermove", (event) => {
        const rect = visual.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;

        window.gsap.to(image, {
            x: x * 14,
            y: y * 14,
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

function initContactMapMotion() {
    const map = document.querySelector(".contact-map-visual");
    const core = document.querySelector(".contact-map-core");

    if (!map || !core || !window.gsap) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) return;

    map.addEventListener("pointermove", (event) => {
        const rect = map.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;

        window.gsap.to(core, {
            x: x * 18,
            y: y * 18,
            duration: 0.35,
            ease: "power2.out",
        });
    });

    map.addEventListener("pointerleave", () => {
        window.gsap.to(core, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
        });
    });
}