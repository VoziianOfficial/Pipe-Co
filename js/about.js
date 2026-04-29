"use strict";

document.addEventListener("DOMContentLoaded", () => {
    initAboutImageParallax();
    initAboutCounters();
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

function initAboutCounters() {
    const counters = document.querySelectorAll("[data-counter]");

    if (!counters.length) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const animateCounter = (counter) => {
        const target = Number(counter.dataset.counter || 0);

        if (reduceMotion) {
            counter.textContent = target;
            return;
        }

        const duration = 900;
        const startTime = performance.now();

        const update = (currentTime) => {
            const progress = Math.min((currentTime - startTime) / duration, 1);
            const easedProgress = 1 - Math.pow(1 - progress, 3);
            const value = Math.round(target * easedProgress);

            counter.textContent = value;

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        };

        requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver(
        (entries, currentObserver) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                animateCounter(entry.target);
                currentObserver.unobserve(entry.target);
            });
        },
        {
            threshold: 0.35,
        }
    );

    counters.forEach((counter) => observer.observe(counter));
}